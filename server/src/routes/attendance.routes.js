const express = require("express");
const attendanceController = require("../controllers/attendance.controller");

const router = express.Router();

router.post("/check-in", attendanceController.checkIn);
router.post("/:id/check-out", attendanceController.checkOut);
router.get("/", attendanceController.getMyAttendances);

module.exports = router;
