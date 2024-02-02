import React, { useEffect, useState, useRef } from "react";
import { eachDayOfInterval, format } from "date-fns";
import "./PlayListCalendar.scss";
import "../../../pages/play-list/PlayList.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import MouseIcon from "@mui/icons-material/Mouse";

export default function PlayListCalendar({
  innerWidth,
  setClickedDate,
  selectedRegion,
}) {
  // 배경색 제어를 위한 클릭한 부분 정보 저장
  const selectedDate = useRef(null);

  // 지역이 바뀌면 selectedDate의 배경색 초기화
  useEffect(() => {
    if (selectedDate.current) {
      selectedDate.current.style.backgroundColor = "";
    }
  }, [selectedRegion]);

  // 날짜 박스 클릭 시
  const handleDateClick = (info) => {
    // 이미 선택된 날짜가 있다면 배경색 초기화
    if (selectedDate.current) {
      selectedDate.current.style.backgroundColor = "";
    }

    selectedDate.current = info.dayEl;
    info.dayEl.style.backgroundColor = "#e5edff"; // 배경색 설정
    setClickedDate(info.dateStr);
  };

  // 이벤트 띠를 클릭 시
  const handleEventClick = (info) => {
    // 이미 선택된 날짜가 있다면 배경색 초기화
    if (selectedDate.current) {
      selectedDate.current.style.backgroundColor = "";
    }

    const eventDate = info.event.start;
    // YYYY-MM-DD 형태로 포맷
    const year = eventDate.getFullYear();
    const month = String(eventDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1, 두 자리로 맞춤
    const day = String(eventDate.getDate()).padStart(2, "0"); // 두 자리로 맞춤
    const date = `${year}-${month}-${day}`;

    const targetDateElement = document.querySelector(`[data-date="${date}"]`);
    selectedDate.current = targetDateElement;
    targetDateElement.style.backgroundColor = "#e5edff"; // 배경색 설정

    setClickedDate(date);
  };

  return (
    <div className="play-list-calendar-container">
      <div className="calendar-guide-text">
        <MouseIcon fontSize={innerWidth >= 481 ? "large" : "medium"} />
        <h2>연극을 보고 싶은 날짜를 클릭해 보세요!</h2>
      </div>
      <div className="play-list-calendar-box">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={(info) => {
            handleDateClick(info);
          }}
          eventClick={(info) => {
            handleEventClick(info);
          }}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          locale={"kr"}
          contentHeight="700px"
        />
      </div>
    </div>
  );
}
