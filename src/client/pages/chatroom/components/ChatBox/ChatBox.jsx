import React, { useEffect } from "react";
import "./chatbox.css";
import { FaSearch, FaVideo } from "react-icons/fa";
import Chats from "../Chats/Chats";

const ChatBox = ({ sender, receiver }) => {
    useEffect(() => {
        console.log(sender);
        console.log(receiver);
    })
  return (
    <div className="chat-box">
      {receiver.user_id ? (
        <div className="chat-box-content">
          <div className="chat-box-head">
            <div className="chat-box-head-div">
              <img
                src={receiver.gender === "M" ? "/boy.png" : "/girl.png"}
                alt="No internet"
                className="chat-box-user-image"
                width={40}
              />
              <h4 className="chat-box-username">{receiver.name}</h4>
            </div>
            <div className="chat-box-options">
              <FaSearch className="chat-box-icon" size={20} />
              <FaVideo className="chat-box-icon" size={20} />
            </div>
          </div>
          <Chats sender={sender} receiver={receiver} />
        </div>
      ) : (
        <div className="empty-chat-box">
          <h4>SELECT SOMEONE TO CHAT</h4>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
