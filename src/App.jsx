import { useEffect, useState } from "react";
import "./App.css";
import * as api from "./api";
import "./styles/variables.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoleSelectorPage from "./client/pages/auth/RoleSelectorPage";
import HomePage from "./client/pages/home/HomePage";
import LoginPage from "./client/pages/auth/login/LoginPage";
import RegisterPage from "./client/pages/auth/register/RegisterPage";
import PatientHomePage from "./client/pages/home/patient/PatientHomePage";
import DoctorHomePage from "./client/pages/home/doctor/DoctorHomePage";
import HospitalAdminHomePage from "./client/pages/home/hospital_admin/HospitalAdminHomePage";
import SuperAdminHomePage from "./client/pages/home/super_admin/SuperAdminHomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatRoom from "./client/pages/chatroom/ChatRoom";

function App() {
  return (
    <Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<RoleSelectorPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home/patient" element={<PatientHomePage />} />
        <Route path="/home/doctor" element={<DoctorHomePage />} />
        <Route
          path="/home/hospital-admin"
          element={<HospitalAdminHomePage />}
        />
        <Route path="/home/super-admin" element={<SuperAdminHomePage />} />
        <Route path="/home/patient/chat-room" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;

/*
<h1>Heading 1</h1>
      <button
        onClick={async () => {
          const result = await api.registerPatient({
            name: "user2",
            email: "user2@gmail.com",
            password: "abcd",
          });
          console.log(result);
        }}
      >
        Register
      </button>
      <button
        onClick={async () => {
          const result = await api.loginPatient({
            email: "user2@gmail.com",
            password: "abcd",
          });
          console.log(result);
        }}
      >
        Login
      </button>
      {
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>email</th>
              <th>role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.user_id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
*/
