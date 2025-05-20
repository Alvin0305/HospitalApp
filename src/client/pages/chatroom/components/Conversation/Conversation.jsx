import React, { useState } from "react";
import * as api from "../../../../../api";
import Message from "../Message/Message";
import "./conversation.css";
import { FaAngleDown } from "react-icons/fa";

const Conversation = ({ user, conversation }) => {
  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleClick = () => {
    const fetchMessages = async () => {
      try {
        const response = await api.fetchMessagesInConversation(
          conversation.conversation_id
        );
        setMessages(response.data);
        console.log(user);
        console.log(user.user_id);
        console.log("response", response.data);
        setShowMessages(!showMessages);
      } catch (err) {
        console.log("fetch message error:", err);
      }
    };
    if (showMessages) {
      setShowMessages(false);
      return;
    }
    fetchMessages();
  };

  return (
    <div onClick={handleClick} className="conversation">
      <div className="conversation-title-div">
        <h4 className="conversation-title">{conversation.title}</h4>
        <FaAngleDown className="conversation-icon" />
      </div>
      {showMessages ? (
        <div>
          {messages.map((message, index) =>
            user.user_id === message.sender_id ||
            user.id === message.sender_id ? (
              <Message message={message} key={index} sent />
            ) : (
              <Message message={message} key={index} received />
            )
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Conversation;
