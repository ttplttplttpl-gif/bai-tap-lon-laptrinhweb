const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const attendanceRoutes = require("./src/routes/attendance.routes");
const errorHandler = require("./src/middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "HRM Server is running!" });
});

app.use("/api/attendances", attendanceRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/hrm_db";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Kết nối MongoDB thành công!");
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Lỗi kết nối MongoDB:", err.message);
  });
