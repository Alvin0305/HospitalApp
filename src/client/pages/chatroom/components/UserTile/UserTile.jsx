import React, { useEffect, useState } from "react";
import "./usertile.css";
import * as api from "../../../../../api";
import { FaCheck } from "react-icons/fa";

const UserTile = ({ user, selectedUser, setSelectedUser }) => {
  const size = 50;
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const fetchActiveStatus = async () => {
      try {
        console.log(user);
        console.log(selectedUser.id);
        const response = await api.fetchLoginLogOfUser(user.user_id);
        console.log(response.data);
        setIsActive(response.data.status === "active");
        console.log(response.data.status === "active");
      } catch (err) {
        console.log(`fetch active status failed due to ${err}`);
      }
    };
    fetchActiveStatus();
  }, []);

  const select = () => {
    setSelectedUser(user);
    selectedUser = user;
    console.log(user);
    console.log(selectedUser);
  };

  return (
    <div
      className={
        !selectedUser.user_id
          ? "chat-user-tile"
          : selectedUser.user_id === user.user_id
          ? "chat-user-tile selected-chat-user-tile"
          : "chat-user-tile"
      }
      onClick={select}
    >
      <img
        src={user.gender.trim() === "M" ? "/boy.png" : "/girl.png"}
        alt="No internet"
        width={size}
        className="chat-user-tile-image"
      />
      <h3 className="chat-user-tile-name">{user.name}</h3>
      {isActive ? <FaCheck className="chat-user-tile-active-status" /> : ""}
    </div>
  );
};

export default UserTile;
