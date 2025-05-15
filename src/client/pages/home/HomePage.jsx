import React, { useEffect, useState } from "react";
import * as api from "../../../api";
import SortableTable from "../../utils/SortableTable";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const filterData = (data) => {
      data.forEach((item, index) => {
        const { password, user_id, role, image, name, email, dob, ...rest } = item;
        const newItem = {
          no: index + 1,
          user_id: user_id,
          name: name, 
          email: email,
          role: role,
          dob: dob?.split("T")[0],
          ...rest,
        };
        data[index] = newItem;
      });
    };

    const fetchUsers = async () => {
      try {
        const response = await api.fetchUsers();
        console.log(response.data);
        filterData(response.data);
        setUsers(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUsers();
  }, []);

  const heads = [
    "no",
    "user_id",
    "name",
    "email",
    "role",
    "dob",
    "gender",
    "willing_to_donate_blood",
    "height",
    "weight",
    "blood_group",
  ];

  const headNames = [
    "#",
    "ID",
    "Name",
    "Email",
    "Role",
    "DOB",
    "Gender",
    "Willingness To Donate Blood",
    "Height",
    "Weight",
    "Blood Group",
  ];

  return (
    <div>
      <SortableTable headNames={headNames} head={heads} body={users} />
    </div>
  );
};

export default HomePage;
