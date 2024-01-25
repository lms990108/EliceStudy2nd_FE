import React, { useEffect, useState } from "react";
import { eachDayOfInterval, format } from "date-fns";
import "./PlayListCalendar.scss";
import "../../../pages/play-list/PlayList.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import MouseIcon from "@mui/icons-material/Mouse";

export default function PlayListCalendar({
  innerWidth,
  filteredPlays,
  datePlays,
  setDatePlays,
  setClickedDate,
  setConditionPlays,
  sortStandard,
}) {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const calendarPlays = {};

    filteredPlays.forEach((play) => {
      const startDate = play.start_date.split("T")[0];
      const endDate = play.end_date.split("T")[0];
      const schedule = play.schedule;

      // 주어진 요일 배열
      const targetWeekdays = extractDays(schedule);

      const days = eachDayOfInterval({
        start: new Date(startDate),
        end: new Date(endDate),
      });

      const filteredDates = days.filter((day) => {
        const weekday = format(day, "EEEE"); // 날짜의 요일을 가져옴

        // 주어진 요일 배열에 해당하는 경우 필터링
        return targetWeekdays.includes(weekday);
      });

      const dateToString = filteredDates.map((date) =>
        format(date, "yyyy-MM-dd")
      );

      for (let date of dateToString) {
        if (!calendarPlays[date]) {
          calendarPlays[date] = [play];
        } else {
          calendarPlays[date].push(play);
        }
      }
    });
    setDatePlays(calendarPlays);

    // full calendar에 넣을 이벤트들
    const events = [];
    for (let date in calendarPlays) {
      events.push({
        title: `${calendarPlays[date].length}개의 연극`,
        date: date,
      });
    }
    setEvent(events);
  }, [filteredPlays]);

  const extractDays = (inputString) => {
    // 요일 정보 추출을 위한 정규표현식
    const pattern =
      /([월화수목금토일]+)요일(?:\s*~\s*([월화수목금토일]+)요일)?/g;

    // 모든 매칭된 패턴을 가져옴
    const matches = [...inputString.matchAll(pattern)];

    // 생략된 요일까지 포함해서 결과를 보여주기 위한 처리
    const expandedDays = matches.reduce((acc, match) => {
      const startDay = match[1];
      const endDay = match[2] || startDay; // 범위가 없으면 시작 요일과 동일하게 설정

      const startIndex = ["월", "화", "수", "목", "금", "토", "일"].indexOf(
        startDay
      );
      const endIndex = ["월", "화", "수", "목", "금", "토", "일"].indexOf(
        endDay
      );

      // 시작 인덱스부터 끝 인덱스까지 순환하면서 요일을 추가
      for (let i = startIndex; i <= endIndex; i++) {
        acc.push(
          [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ][i]
        );
      }

      return acc;
      // reduce를 사용하였으므로 초기값 배열인 []를 적어줌.
    }, []);

    // 중복된 요일 제거 및 정렬
    const uniqueDays = [...new Set(expandedDays)].sort(
      (a, b) =>
        [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].indexOf(a[0]) -
        [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].indexOf(b[0])
    );

    return uniqueDays;
  };

  const handleDateClick = (info) => {
    setClickedDate(info.dateStr);
    if (datePlays[info.dateStr]) {
      setConditionPlays(datePlays[info.dateStr]);
      useSortPlays(sortStandard, setConditionPlays);
    }
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
          events={event}
          dateClick={(info) => {
            handleDateClick(info);
          }}
        />
      </div>
    </div>
  );
}
