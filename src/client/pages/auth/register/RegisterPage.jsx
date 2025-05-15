import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../auth.css";
import * as api from "../../../../api";

const RegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = location.state || "";
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const onClick = async (e) => {
    e.preventDefault();
    try {
      const response = await api.registerPatient(data);
      console.log(response.data);
      navigate("/home");
    } catch (err) {
      console.log("register error", err.message);
    }
  };

  const gotoLoginPage = () => {
    navigate("/login", { state: { role: role } });
  };

  return (
    <div className="page-wrapper">
      <div className="auth-page">
        <form className="auth-container">
          <h1>SIGN IN</h1>
          <input
            type="text"
            value={data.name}
            placeholder="Name..."
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="auth-field"
          />
          <input
            type="text"
            value={data.email}
            placeholder="Email..."
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="auth-field"
          />
          <input
            type="password"
            value={data.password}
            placeholder="Password..."
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="auth-field"
          />
          <button onClick={(e) => onClick(e)} className="auth-button">
            REGISTER
          </button>
        </form>
        <div>
          <p>
            Already Have An Account
            <span onClick={gotoLoginPage} className="auth-link">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
