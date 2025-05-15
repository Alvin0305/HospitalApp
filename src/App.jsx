import { useEffect, useState } from "react";
import "./App.css";
import * as api from "./api";
import "./styles/variables.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoleSelectorPage from "./client/pages/auth/RoleSelectorPage";
import HomePage from "./client/pages/home/HomePage";
import LoginPage from "./client/pages/auth/login/LoginPage";
import RegisterPage from "./client/pages/auth/register/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelectorPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
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