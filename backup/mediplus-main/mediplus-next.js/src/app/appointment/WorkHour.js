"use client";

import { useState } from "react";

export default function WorkHour() {
  const [workHour, setworkHour] = useState([
    {
      id: "item1",
      day: "Monday - Fridayp",
      time: "8.00-20.00",
    },
    {
      id: "item2",
      day: "Saturday",
      time: "9.00-18.30",
    },
    {
      id: "item3",
      day: "Monday - Thusday",
      time: "9.00-15.00",
    },
    {
      id: "item4",
      day: "Monday - Fridayp",
      time: "8.00-20.00",
    },
    {
      id: "item5",
      day: "Saturday",
      time: "9.00-18.30",
    },
    {
      id: "item6",
      day: "Monday - Thusday",
      time: "9.00-15.00",
    },
    {
      id: "item7",
      day: " Monday - Fridayp",
      time: "8.00-20.00",
    },
    {
      id: "item8",
      day: "Saturday",
      time: "9.00-18.30",
    },
    {
      id: "item9",
      day: "Monday - Thusday",
      time: "9.00-15.00",
    },
  ]);

  return (
    <>
      <div className="work-hour">
        <h3>Working Hours</h3>
        <ul className="time-sidual">
          {workHour.map((items) => (
            <li className="day" key={items.id}>
              {items.day} <span>{items.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
