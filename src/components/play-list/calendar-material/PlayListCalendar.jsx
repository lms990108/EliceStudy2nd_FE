import React from "react";
import "./PlayListCalendar.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import MouseIcon from "@mui/icons-material/Mouse";

export default function PlayListCalendar() {
  return (
    <div className="play-list-calendar-container">
      <div className="calendar-guide-text">
        <MouseIcon fontSize="large" />
        <h2>연극을 보고 싶은 날짜를 클릭해 보세요!</h2>
      </div>
      <div className="play-list-calendar-box">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          events={[
            { title: "5개의 연극", date: "2023-11-03" },
            { title: "10개의 연극", date: "2023-11-04" },
          ]}
          dateClick={(info) => {
            console.log(info.dateStr);
            // console.log("Clicked on: " + info.dateStr);
            // console.log(
            //   "Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY
            // );
            // console.log("Current view: " + info.view.type);

            // 여기에 클릭한 날짜에 대한 추가 동작을 수행할 수 있습니다.
          }}
        />
      </div>
    </div>
  );
}
