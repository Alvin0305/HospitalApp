import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../../../api";
import { FaFacebookMessenger } from "react-icons/fa";
import { useUser } from "../../../contexts/UserContext";

const PatientHomePage = () => {
  const { user } = useUser();

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

  const navigateToChatRoom = () => {
    navigate("/home/patient/chat-room");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      Welcome {user.name}
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
