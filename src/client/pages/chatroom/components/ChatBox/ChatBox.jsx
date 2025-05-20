import React, { useEffect, useState } from "react";
import "./chatbox.css";
import { FaPhone, FaPlus, FaVideo } from "react-icons/fa";
import Chats from "../Chats/Chats";
import { FiSend } from "react-icons/fi";
import {
  fetchConversationsBetween,
  sendMessage,
  startConversation,
} from "../../../../../api";
import Conversation from "../Conversation/Conversation";

const ChatBox = ({ sender, receiver }) => {
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const ids = {
          patientId: sender.user_id,
          doctorId: receiver.user_id,
        };
        const response = await fetchConversationsBetween(ids);
        setConversations(response.data);
        if (response.data && response.data.length != 0) {
          setCurrentConversation(response.data[response.data.length - 1]);
        }
      } catch (err) {
        console.log(`failed to fetch conversations due to ${err}`);
      }
    };
    fetchConversations();
  }, [sender, receiver]);

  const createNewConversation = async () => {
    try {
      const response = await startConversation({ title: message });
      console.log(response.data);
      setConversations([...conversations, response.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const send = async () => {
    try {
      const messageData = {
        senderId: sender.user_id,
        receiverId: receiver.user_id,
        content: message,
        conversationId: currentConversation.conversation_id,
      };
      const response = await sendMessage(messageData);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-box">
      {receiver.user_id ? (
        <div className="chat-box-content">
          <div className="chat-box-head">
            <div className="chat-box-head-div">
              <img
                src={receiver.image}
                alt="No internet"
                className="chat-box-user-image"
                width={40}
              />
              <h4 className="chat-box-username">{receiver.name}</h4>
            </div>
            <div className="chat-box-options">
              <FaPhone className="chat-box-icon" size={20} />
              <FaVideo className="chat-box-icon" size={20} />
            </div>
          </div>
          <Chats
            sender={sender}
            receiver={receiver}
            conversations={conversations}
            setConversations={setConversations}
          />
          <form className="message-input-form">
            <input
              type="text"
              placeholder="Enter Message / Title..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="message-field"
            />
            <FiSend
              className="chat-box-button message-send-button"
              size={42}
              onClick={send}
            />
            <FaPlus
              className="chat-box-button create-conversation-button"
              size={42}
              onClick={createNewConversation}
            />
          </form>
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
