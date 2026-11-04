const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Bắt buộc phải có employeeId"],
    },
    scheduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
      required: [true, "Bắt buộc phải có scheduleId"],
    },
    workDate: {
      type: String,
      required: true,
    },
    checkInAt: {
      type: Date,
      default: null,
    },
    checkOutAt: {
      type: Date,
      default: null,
    },
    minutesWorked: {
      type: Number,
      default: 0,
    },
    workCredit: {
      type: Number,
      enum: [0, 0.5, 1],
      default: 0,
    },
    status: {
      type: String,
      enum: ["on_time", "late", "early_leave", "absent"],
      default: "on_time",
    },
  },
  { timestamps: true },
);

attendanceSchema.index({ scheduleId: 1, employeeId: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
