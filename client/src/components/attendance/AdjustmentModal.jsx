import React, { useState } from "react";

const AdjustmentModal = ({ isOpen, onClose, attendanceRecord, onSubmit }) => {
  const [reason, setReason] = useState("");
  const [proposedIn, setProposedIn] = useState("");
  const [proposedOut, setProposedOut] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      attendanceId: attendanceRecord?._id,
      requestReason: reason,
      proposedIn,
      proposedOut,
    });
    setReason("");
    setProposedIn("");
    setProposedOut("");
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "8px",
          width: "420px",
          maxWidth: "90%",
        }}
      >
        <h3 style={{ margin: "0 0 16px 0", color: "#1e293b" }}>
          Đơn khiếu nại / Điều chỉnh công
        </h3>
        <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px 0" }}>
          Ngày làm việc: <strong>{attendanceRecord?.workDate}</strong>
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                marginBottom: "4px",
              }}
            >
              Giờ vào đề xuất:
            </label>
            <input
              type="datetime-local"
              required
              value={proposedIn}
              onChange={(e) => setProposedIn(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #cbd5e1",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                marginBottom: "4px",
              }}
            >
              Giờ ra đề xuất:
            </label>
            <input
              type="datetime-local"
              required
              value={proposedOut}
              onChange={(e) => setProposedOut(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #cbd5e1",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                marginBottom: "4px",
              }}
            >
              Lý do giải trình:
            </label>
            <textarea
              rows={3}
              required
              placeholder="VD: Quên bấm vân tay, đi gặp khách hàng đối tác..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #cbd5e1",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "8px 16px",
                background: "#e2e8f0",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Hủy
            </button>
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Gửi đơn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdjustmentModal;
