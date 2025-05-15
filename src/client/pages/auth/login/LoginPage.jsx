import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../auth.css";
import * as api from "../../../../api";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = location.state || "";
  const [data, setData] = useState({ email: "", password: "" });

  const onClick = async (e) => {
    e.preventDefault();
    try {
      const response = await api.loginPatient({ ...data, role: role });
      console.log(response.data);
        navigate("/home");
    } catch (err) {
      console.log("register error", err.message);
    }
  };

  const gotoRegisterPage = () => {
    navigate("/register", { state: { role: role } });
  };

  return (
    <div className="page-wrapper">
      <div className="auth-page">
        <form className="auth-container">
          <h1>SIGN UP</h1>
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
            LOGIN
          </button>
        </form>
        <div>
          <p>
            Don't Have An Account
            <span onClick={gotoRegisterPage} className="auth-link">
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
