import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./chatroom.css";
import UsersList from "./components/UsersList/UsersList";
import ChatBox from "./components/ChatBox/ChatBox";

const ChatRoom = () => {
  const location = useLocation();
  const { patient } = location.state || {};

  const [selectedUser, setSelectedUser] = useState({});

  return (
    <div className="chat-room-wrapper">
      <div className="chat-room">
        <UsersList
          patient={patient}
          setSelectedUser={setSelectedUser}
          selectedUser={selectedUser}
        />
        <ChatBox sender={patient} receiver={selectedUser} />
      </div>
    </div>
  );
};

export default ChatRoom;
