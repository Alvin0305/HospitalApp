import React from "react";
import "./message.css";

const Message = ({ message, sent, received }) => {
  if (sent) {
    return (
      <div className="message sent-message">
        <h4 className="message-content">{message.content}</h4>
        <img
          src={"/boy.png"}
          alt="No internet"
          className="chat-box-user-image"
          width={20}
        />
      </div>
    );
  } else if (received) {
    return (
      <div className="message received-message">
        <img
          src={"/boy.png"}
          alt="No internet"
          className="chat-box-user-image"
          width={20}
        />
        <h4 className="message-content">{message.content}</h4>
      </div>
    );
  }
};

export default Message;
