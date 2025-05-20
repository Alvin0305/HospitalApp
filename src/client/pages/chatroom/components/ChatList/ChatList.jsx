import React, { useState } from "react";
import { useEffect } from "react";
import * as api from "../../../../../api";
import UserTile from "../UserTile/UserTile";
import "./chatlist.css";
import { FaSearch } from "react-icons/fa";

const ChatList = ({ user, setSelectedUser, selectedUser }) => {
  const [contactedUsers, setContactedUsers] = useState([]);
  const [allContactedUsers, setAllContactedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    console.log(user);
    console.log(user.user_id);
    const fetchInitialValues = async () => {
      try {
        const [contactedUserResponse, allUserResponse] = await Promise.all([
          api.fetchContactedUsers(user.user_id),
          api.fetchAllUsers(),
        ]);
        const filteredAllUsers = allUserResponse.data.filter((u) => user.user_id != u.user_id);
        console.log(filteredAllUsers);
        setAllUsers(filteredAllUsers);
        console.log(contactedUserResponse.data);
        setContactedUsers(contactedUserResponse.data);
        setAllContactedUsers(contactedUserResponse.data);
      } catch (err) {
        console.log("fetch conversations error", err);
      }
    };
    fetchInitialValues();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value === "") {
      setContactedUsers(allContactedUsers);
    } else {
      const filteredContacts = allContactedUsers.filter((contact) =>
        contact.name.includes(value)
      );
      setContactedUsers(filteredContacts);
    }
  };

  return (
    <div className="users-list">
      <h2>CHAT ROOM</h2>
      <form action="">
        <div className="user-list-search-bar">
          <input
            type="text"
            className="user-list-search-field"
            placeholder="search..."
            onChange={(e) => handleSearch(e)}
          />
          <FaSearch className="users-list-search-button" />
        </div>
      </form>
      <div>
        {contactedUsers.map((user, index) => (
          <UserTile
            user={user}
            key={index}
            setSelectedUser={setSelectedUser}
            selectedUser={selectedUser}
          />
        ))}
      </div>
      <h4>OTHERS</h4>
      <div>
        {allUsers.map((user, index) => (
          <UserTile
            user={user}
            key={index}
            setSelectedUser={setSelectedUser}
            selectedUser={selectedUser}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
