import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../auth.css";
import * as api from "../../../../api";
import { toast } from "react-toastify";
import { useUser } from "../../../contexts/UserContext";

const LoginPage = () => {
  const { setUser } = useUser();

  const location = useLocation();
  const navigate = useNavigate();
  const { role } = location.state || "";
  const [data, setData] = useState({ email: "", password: "" });

  const showPasswordsMisMatchError = () => {
    toast.error("Password Mismatch");
  };

  const showInvalidEmailError = () => {
    toast.error("Invalid Email");
  };

  const showInvalidPasswordError = () => {
    toast.error("Invalid Password");
  };

  const onClick = async (e) => {
    e.preventDefault();
    let response;
    try {
      response = await api.loginPatient({ ...data, role: role });
      const loggedInUser = response.data.user;
      setUser(loggedInUser);
      console.log(response.data);
      if (response.data.user.role === "user") {
        navigate("/home/patient");
      } else if (response.data.user.role === "doctor") {
        navigate("/home/doctor", { state: { user: response.data.user } });
      } else if (response.data.user.role === "hospital_admin") {
        navigate("/home/hospital-admin", {
          state: { user: response.data.user },
        });
      } else if (response.data.user.role === "super_admin") {
        navigate("/home/super-admin", { state: { user: response.data.user } });
      } else {
        toast.error("unhandled role");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errorMessage = err.response.data.error;
        if (errorMessage === "Invalid Email") {
          showInvalidEmailError();
        } else if (errorMessage === "Invalid Password") {
          showInvalidPasswordError();
        } else {
          console.log("Unhandled Error:", errorMessage);
        }
      } else {
        console.log("Unexpected Error:", err.message);
      }
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
          <p className="auth-text">
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
