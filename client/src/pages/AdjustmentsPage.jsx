import React from "react";

const AdjustmentsPage = () => {
  return (
    <div
      style={{
        maxWidth: "850px",
        margin: "30px auto",
        fontFamily: "sans-serif",
        padding: "0 16px",
      }}
    >
      <h2>Danh sách Đơn Giải trình / Khiếu nại</h2>
      <p style={{ color: "#64748b" }}>
        Trang quản lý các yêu cầu điều chỉnh công chờ phê duyệt (Admin/HR
        Review).
      </p>
      <div
        style={{
          padding: "20px",
          background: "#f8fafc",
          borderRadius: "8px",
          border: "1px dashed #cbd5e1",
          textAlign: "center",
          color: "#94a3b8",
        }}
      >
        Hiện chưa có đơn khiếu nại nào cần duyệt.
      </div>
    </div>
  );
};

export default AdjustmentsPage;
