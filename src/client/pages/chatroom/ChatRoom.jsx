import React, { useState } from "react";
import "./chatroom.css";
import ChatList from "./components/ChatList/ChatList";
import ChatBox from "./components/ChatBox/ChatBox";
import { useUser } from "../../contexts/UserContext";

const ChatRoom = () => {
  const { user } = useUser();

  const [selectedUser, setSelectedUser] = useState({});

  if (!user) return <div>Loading...</div>;

  return (
    <div className="chat-room-wrapper">
      <div className="chat-room">
        <ChatList
          user={user}
          setSelectedUser={setSelectedUser}
          selectedUser={selectedUser}
        />
        <ChatBox sender={user} receiver={selectedUser} />
      </div>
    </div>
  );
};

export default ChatRoom;
