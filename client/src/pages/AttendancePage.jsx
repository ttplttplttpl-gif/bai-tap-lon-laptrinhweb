import React, { useState, useEffect } from "react";
import LiveClock from "../components/attendance/LiveClock";
import AdjustmentModal from "../components/attendance/AdjustmentModal";
import { attendanceService } from "../services/attendance.service";

const AttendancePage = () => {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentEmployeeId = "65f1a2b3c4d5e6f7a8b9c0d1";
  const todayScheduleId = "65f1a2b3c4d5e6f7a8b9c0d2";
  const todayStr = new Date().toISOString().split("T")[0];

  const fetchAttendances = async () => {
    try {
      const res = await attendanceService.getMyAttendances(currentEmployeeId);
      if (res.success) setRecords(res.data);
    } catch (err) {
      console.error("Lỗi nạp dữ liệu:", err);
    }
  };

  useEffect(() => {
    fetchAttendances();
  }, []);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const res = await attendanceService.checkIn({
        employeeId: currentEmployeeId,
        scheduleId: todayScheduleId,
        workDate: todayStr,
      });
      alert(res.message);
      fetchAttendances();
    } catch (err) {
      alert("Lỗi Check-in: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async (recordId) => {
    setLoading(true);
    try {
      const res = await attendanceService.checkOut(recordId);
      alert(res.message);
      fetchAttendances();
    } catch (err) {
      alert("Lỗi Check-out: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdjustmentSubmit = (payload) => {
    alert("Đơn giải trình đã gửi thành công!");
    console.log("Payload giải trình:", payload);
  };

  const todayRecord = records.find((r) => r.workDate === todayStr);

  return (
    <div
      style={{
        maxWidth: "850px",
        margin: "30px auto",
        fontFamily: "sans-serif",
        padding: "0 16px",
      }}
    >
      <h2 style={{ color: "#0f172a" }}>Hệ Thống Chấm Công (TV3 - HRM)</h2>

      <LiveClock />

      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <button
          onClick={handleCheckIn}
          disabled={loading || Boolean(todayRecord?.checkInAt)}
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "6px",
            border: "none",
            background: todayRecord?.checkInAt ? "#94a3b8" : "#16a34a",
            color: "#fff",
            fontWeight: "bold",
            cursor: todayRecord?.checkInAt ? "not-allowed" : "pointer",
          }}
        >
          {todayRecord?.checkInAt ? "Đã Check-in hôm nay" : "Check-in (Vào ca)"}
        </button>

        <button
          onClick={() => handleCheckOut(todayRecord?._id)}
          disabled={
            loading ||
            !todayRecord?.checkInAt ||
            Boolean(todayRecord?.checkOutAt)
          }
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "6px",
            border: "none",
            background:
              !todayRecord?.checkInAt || todayRecord?.checkOutAt
                ? "#94a3b8"
                : "#dc2626",
            color: "#fff",
            fontWeight: "bold",
            cursor:
              !todayRecord?.checkInAt || todayRecord?.checkOutAt
                ? "not-allowed"
                : "pointer",
          }}
        >
          {todayRecord?.checkOutAt ? "Đã Check-out" : "Check-out (Tan ca)"}
        </button>
      </div>

      <h3 style={{ color: "#334155", marginTop: "30px" }}>
        Lịch sử chấm công gần đây
      </h3>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}
      >
        <thead>
          <tr
            style={{
              background: "#f8fafc",
              borderBottom: "2px solid #e2e8f0",
              textAlign: "left",
            }}
          >
            <th style={{ padding: "10px" }}>Ngày</th>
            <th style={{ padding: "10px" }}>Vào</th>
            <th style={{ padding: "10px" }}>Ra</th>
            <th style={{ padding: "10px" }}>Phút làm</th>
            <th style={{ padding: "10px" }}>Công</th>
            <th style={{ padding: "10px" }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                style={{
                  padding: "16px",
                  textAlign: "center",
                  color: "#94a3b8",
                }}
              >
                Chưa có bản ghi nào
              </td>
            </tr>
          ) : (
            records.map((r) => (
              <tr key={r._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "10px" }}>{r.workDate}</td>
                <td style={{ padding: "10px" }}>
                  {r.checkInAt
                    ? new Date(r.checkInAt).toLocaleTimeString("vi-VN")
                    : "--:--"}
                </td>
                <td style={{ padding: "10px" }}>
                  {r.checkOutAt
                    ? new Date(r.checkOutAt).toLocaleTimeString("vi-VN")
                    : "--:--"}
                </td>
                <td style={{ padding: "10px" }}>{r.minutesWorked || 0} p</td>
                <td style={{ padding: "10px", fontWeight: "bold" }}>
                  {r.workCredit ?? 0}
                </td>
                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => {
                      setSelectedRecord(r);
                      setIsModalOpen(true);
                    }}
                    style={{
                      padding: "4px 8px",
                      fontSize: "12px",
                      background: "#f59e0b",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Khiếu nại
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <AdjustmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        attendanceRecord={selectedRecord}
        onSubmit={handleAdjustmentSubmit}
      />
    </div>
  );
};

export default AttendancePage;
