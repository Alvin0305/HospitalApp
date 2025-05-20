import React, { useEffect, useState } from "react";
import "./message.css";
import { FaCheck } from "react-icons/fa";
import { fetchUserById } from "../../../../../api";

const Message = ({ message, sent, received }) => {
  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);

    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const [receiver, setReceiver] = useState(null);
  const [sender, setSender] = useState(null);

  useEffect(() => {
    const fetchReceiver = async () => {
      try {
        const [receiverResponse, senderResponse] = await Promise.all([
          fetchUserById(message.receiver_id),
          fetchUserById(message.sender_id),
        ]);
        setReceiver(receiverResponse.data);
        console.log(receiverResponse.data);
        setSender(senderResponse.data);
        console.log(senderResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReceiver();
  }, []);

  if (sent) {
    return (
      <div className="message sent-message">
        <div className="message-content-div">
          <h4 className="message-content">{message.content}</h4>
          <div className="message-details">
            <p className="message-time">{formatDate(message.timestamp)}</p>
            {message.is_read ? (
              <FaCheck className="message-status message-viewed" size={16} />
            ) : (
              <FaCheck
                className="message-status message-not-viewed"
                size={16}
              />
            )}
          </div>
        </div>
        <img
          src={sender ? sender.image : null}
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
          src={receiver ? receiver.image : null}
          alt="No internet"
          className="chat-box-user-image"
          width={20}
        />
        <div className="message-content-div">
          <h4 className="message-content">{message.content}</h4>
          <p className="message-time">{formatDate(message.timestamp)}</p>
        </div>
      </div>
    );
  }
};

export default Message;
