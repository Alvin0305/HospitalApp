import React from "react";
import "../../utils/utils.css";
import RoleTile from "./components/RoleTile";
import "./role.css";
import { FaHospitalUser, FaUserInjured, FaUserMd } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RoleSelectorPage = () => {
  const roles = ["PATIENT", "DOCTOR", "HOSPITAL"];
  const size = 100;
  const icons = [
    <FaUserInjured size={size} key={1} className="role-icon" />,
    <FaUserMd size={size} key={2} className="role-icon" />,
    <FaHospitalUser size={size} key={3} className="role-icon" />,
  ];
  const texts = [
    "Book appointments, access your medical records, and donate to help others in need.",
    "Manage appointments, view patient reports, and communicate with hospital staff.",
    "Oversee hospital operations, manage staff, and maintain system data and records.",
  ];
  const navigate = useNavigate();
  const onClick = [
    () => navigate("/login", { state: { role: "user" } }),
    () => navigate("/login", { state: { role: "doctor" } }),
    () => navigate("/login", { state: { role: "hospital_admin" } }),
  ];

  return (
    <div className="page-wrapper">
      <img
        src="hospital2.jpg"
        alt="No internet"
        className="role-page-background-image"
      />
      <div className="role-selector-page">
        <div className="role-selector-page-content">
          {roles.map((role, index) => (
            <RoleTile
              role={role}
              key={index}
              icon={icons[index]}
              text={texts[index]}
              onClick={onClick[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelectorPage;
