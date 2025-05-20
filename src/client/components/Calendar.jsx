import React, { useState } from "react";

const Calendar = () => {
  const today = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [currentMonth, setCurrentMonth] = useState(new Date());
  return <div>{months[today.getMonth()]}</div>;
};

export default Calendar;
