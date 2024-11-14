import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Header from "./Header";
import Sidebar from "./Sidebar";

const localizer = momentLocalizer(moment);

const getTodayEvent = () => {
  const today = new Date();
  return [
    {
      title: "Present",  // Event title
      start: today,      // Start time as the current date
      end: today,        // End time as the current date
      allDay: true,      // Event is all day
    }
  ];
};

function AttendanceCalendar() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const eventPropGetter = (event) => {
    let backgroundColor = "gray";

    switch (event.color) {
      case "green":
        backgroundColor = "green";
        break;
      case "red":
        backgroundColor = "red";
        break;
      case "blue":
        backgroundColor = "blue";
        break;
      default:
        break;
    }

    return { style: { backgroundColor } };
  };

  return (
    <div className="grid-container" style={{ backgroundColor: "#1d2634", minHeight: "100vh" }}>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div style={{ padding: "20px", width: "100%" }}>
        <Calendar
          localizer={localizer}
          events={getTodayEvent()}  // Dynamically get today's event
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventPropGetter}
          style={{ height: 500, backgroundColor: "white", color: "black" }}
        />
      </div>
    </div>
  );
}

export default AttendanceCalendar;
