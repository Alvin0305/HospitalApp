import React, { useEffect, useState } from "react";
import ChatRoom from "../../chatroom/ChatRoom";
import { useLocation, useNavigate } from "react-router-dom";
import * as api from "../../../../api";
import Calendar from "../../../components/Calendar";
import { FaFacebookMessenger } from "react-icons/fa";

const PatientHomePage = () => {
  const location = useLocation();
  const { user } = location.state || {};

  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.fetchDoctors();
        console.log(response.data);
        setDoctors(response.data);
      } catch (err) {
        console.log("fetch doctors error", err);
      }
    };
    fetchDoctors();
  }, []);

  const navigateToChatRoom = (doctor) => {
    navigate("/home/patient/chat-room", {
      state: { patient: user },
    });
  };

  return (
    <div>
      {doctors.map((doctor, index) => (
        <h4 key={index}>{doctor.name}</h4>
      ))}
      <button onClick={navigateToChatRoom}>
        <FaFacebookMessenger />
      </button>
    </div>
  );
};

export default PatientHomePage;
