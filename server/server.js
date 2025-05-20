import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./db.js";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import patientRoutes from "./routes/patient.js";
import doctorRoutes from "./routes/doctor.js";
import userContactRoutes from "./routes/userContact.js";
import feedbackRoutes from "./routes/feedback.js";
import appointmentRoutes from "./routes/appointment.js";
import hospitalRoutes from "./routes/hospital.js";
import hospitalAdminRoutes from "./routes/hospitalAdmin.js";
import recipientRoutes from "./routes/recipients.js";
import departmentRoutes from "./routes/department.js";
import doctorAvailabilityRoutes from "./routes/doctorAvailability.js";
import doctorLeaveRoutes from "./routes/doctorLeave.js";
import hospitalBranchRoutes from "./routes/hospitalBranch.js";
import hospitalContactRoutes from "./routes/hospitalContact.js";
import notificationRoutes from "./routes/notification.js";
import messageRoutes from "./routes/message.js";
import conversationRoutes from "./routes/conversation.js";
import loginLogRoutes from "./routes/loginLog.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/user-contact", userContactRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/hospitaladmin", hospitalAdminRoutes);
app.use("/api/recipient", recipientRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/doctor-availability", doctorAvailabilityRoutes);
app.use("/api/doctor-leave", doctorLeaveRoutes);
app.use("/api/hospital-branch", hospitalBranchRoutes);
app.use("/api/hospital-contact", hospitalContactRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/loginlog", loginLogRoutes);

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("join_conversation", (conversationId) => {
    socket.join(`conversation_${conversationId}`);
  });

  socket.on("send_message", async (data) => {
    const { conversationId, senderId, content } = data;

    try {
      const result = await pool.query(
        `INSERT INTO messages (conversation_id, sender_id, content)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [conversationId, senderId, content]
      );

      await pool.query(
        `UPDATE conversations SET last_updated = NOW() WHERE conversation_id = $2`,
        [conversationId]
      );

      io.to(`conversation_${conversationId}`).emit(
        "receive_message",
        result.rows[0]
      );
    } catch (err) {
      console.log("error sending message", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

// 885922865792694
// NgIJe0MOfCJKTBAImf5Btlu2_cQ
// duki8udfb
// CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@duki8udfb
