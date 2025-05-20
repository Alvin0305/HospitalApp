import React, { useEffect, useState } from "react";
import * as api from "../../../../../api";
import Conversation from "../Conversation/Conversation";
import "./chats.css";

const Chats = ({ sender, receiver }) => {
  const [conversations, setConversations] = useState([]);
  const [messagesInConversation, setMessagesInConversation] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const ids = { patientId: sender.user_id || sender.id, doctorId: receiver.user_id };
        console.log(ids);
        console.log(sender, receiver);
        console.log(sender.user_id, receiver.user_id);
        const response = await api.fetchConversations(ids);
        console.log("response:", response.data);
        setConversations(response.data);
      } catch (err) {
        console.log(`failed to fetch conversations due to ${err}`);
      }
    };
    fetchConversations();
  }, [sender, receiver]);

  return (
    <div className="chats">
      {conversations.map((conversation, index) => (
        <Conversation conversation={conversation} key={index} sender={sender}/>
      ))}
    </div>
  );
};

export default Chats;
