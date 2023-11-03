import React from "react";
import "./PlayListCalendar.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import MouseIcon from "@mui/icons-material/Mouse";
import CalendarRegionBar from "./CalendarRegionBar";

export default function PlayListCalendar({
  regionAtCalendar,
  changeRegionAtCalendar,
}) {
  return (
    <div className="play-list-calendar-container">
      <div className="calendar-guide-text">
        <MouseIcon fontSize="large" />
        <h2>연극을 보고 싶은 날짜를 클릭해 보세요!</h2>
      </div>
      <div className="play-list-calendar-box">
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={[
            { title: "5개의 연극", date: "2023-11-03" },
            { title: "10개의 연극", date: "2023-11-04" },
          ]}
        />
        <CalendarRegionBar
          regionAtCalendar={regionAtCalendar}
          changeRegionAtCalendar={changeRegionAtCalendar}
        />
      </div>
    </div>
  );
}
