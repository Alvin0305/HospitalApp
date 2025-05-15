import React from "react";
import "./role.css";
import { useNavigate } from "react-router-dom";

const RoleTile = ({ role, icon, text, onClick }) => {
  const navigate = useNavigate();
  return (
    <div className="role-tile" onClick={onClick}>
      <div className="role-tile-top">
        <h1>{role}</h1>
        {icon}
      </div>

      <h3>{text}</h3>
    </div>
  );
};

export default RoleTile;
