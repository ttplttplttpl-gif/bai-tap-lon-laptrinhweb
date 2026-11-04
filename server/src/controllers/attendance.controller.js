const Attendance = require("../models/Attendance");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.checkIn = catchAsync(async (req, res, next) => {
  const { scheduleId, workDate } = req.body;
  const employeeId = req.user?.id || req.body.employeeId;

  const existingRecord = await Attendance.findOne({ scheduleId, employeeId });
  if (existingRecord && existingRecord.checkInAt) {
    return next(new AppError("Bạn đã check-in ca làm việc này rồi!", 409));
  }

  const attendance = await Attendance.create({
    employeeId,
    scheduleId,
    workDate,
    checkInAt: new Date(),
    status: "on_time",
  });

  res.status(201).json({
    success: true,
    message: "Điểm danh Check-in thành công",
    data: attendance,
  });
});

exports.checkOut = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const attendance = await Attendance.findById(id);

  if (!attendance) {
    return next(new AppError("Không tìm thấy bản ghi chấm công", 404));
  }

  if (!attendance.checkInAt) {
    return next(
      new AppError("Chưa thực hiện Check-in, không thể Check-out!", 400),
    );
  }

  if (attendance.checkOutAt) {
    return next(new AppError("Bản ghi này đã Check-out trước đó rồi!", 409));
  }

  const checkOutAt = new Date();
  attendance.checkOutAt = checkOutAt;

  const breakMinutes = 60;
  const standardShiftMinutes = 480;

  const totalDiffMinutes = Math.round(
    (checkOutAt - attendance.checkInAt) / (1000 * 60),
  );
  const minutesWorked = Math.max(0, totalDiffMinutes - breakMinutes);
  attendance.minutesWorked = minutesWorked;

  const workRatio = minutesWorked / standardShiftMinutes;
  if (workRatio >= 0.75) {
    attendance.workCredit = 1;
  } else if (workRatio >= 0.5) {
    attendance.workCredit = 0.5;
  } else {
    attendance.workCredit = 0;
  }

  await attendance.save();

  res.status(200).json({
    success: true,
    message: "Check-out thành công",
    data: attendance,
  });
});

exports.getMyAttendances = catchAsync(async (req, res, next) => {
  const employeeId = req.user?.id || req.query.employeeId;
  const { month } = req.query;

  const filter = { employeeId };
  if (month) {
    filter.workDate = { $regex: `^${month}` };
  }

  const records = await Attendance.find(filter).sort({ workDate: -1 });

  res.status(200).json({
    success: true,
    count: records.length,
    data: records,
  });
});
