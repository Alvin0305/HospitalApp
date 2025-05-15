import express from "express";
import dotenv from "dotenv";
import cors from "cors";

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

dotenv.config();
const app = express();

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

app.listen(5000, () => {
  console.log("server running on http://localhost:5000");
});

// 885922865792694
// NgIJe0MOfCJKTBAImf5Btlu2_cQ
// duki8udfb
// CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@duki8udfb