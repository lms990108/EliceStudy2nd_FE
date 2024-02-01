import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MainTheater.scss";

function MainTheater() {
  const [selectedTheater, setSelectedTheater] = useState("국립극장");
  const [shows, setShows] = useState([]); // 선택된 극장에 따른 공연 목록을 저장
  const navigate = useNavigate();

  // 연극을 클릭하면 해당연극 상세페이지로 이동
  const handleShowClick = (showId) => {
    navigate(`/play/${showId}`);
  };

  // 극장 클릭 핸들러
  const handleTheaterClick = (theater) => {
    setSelectedTheater(theater);
  };

  useEffect(() => {
    fetch(`https://dailytopia2.shop/api/shows?limit=1000`)
      .then((res) => res.json())
      .then((data) => {
        const today = new Date();

        const filteredAndSortedShows = data.shows
          .filter((show) => show.location.includes(selectedTheater)) // 선택된 극장에 따라 필터링
          .map((show) => {
            const showDate = new Date(show.start_date);
            const diffTime = Math.abs(showDate - today); // 오늘 날짜와의 차이(밀리초)
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 일 단위로 변환
            return { ...show, diffDays };
          })
          .sort((a, b) => a.diffDays - b.diffDays) // 날짜 차이에 따라 정렬
          .slice(0, 4); // 상위 4개 공연 선택

        setShows(filteredAndSortedShows);
      })
      .catch((err) => console.error(err));
  }, [selectedTheater]);

  const theaterArray = [
    "국립극장",
    "아르코예술극장",
    "대학로예술극장",
    "명동예술극장",
  ];

  const getTheaterInfo = (theaterName) => {
    switch (theaterName) {
      case "국립극장":
        return {
          image: process.env.PUBLIC_URL + "/theater1.png",
          text1: "우리 시대의 예술가,",
          text2: "그리고 관객과 함께",
          text3: "역사를 써 내려가는 공간",
        };
      case "아르코예술극장":
        return {
          image: process.env.PUBLIC_URL + "/theater2.png",
          text1: "예술인들이",
          text2: "한자리에 모이는",
          text3: "공연예술 전문 극장",
        };
      case "대학로예술극장":
        return {
          image: process.env.PUBLIC_URL + "/theater3.png",
          text1: "예술가와",
          text2: "관객들 무두에게",
          text3: "최고의 공간이 되는 곳",
        };
      case "명동예술극장":
        return {
          image: process.env.PUBLIC_URL + "/theater4.png",
          text1: "오늘의",
          text2: "이야기를 발견하고",
          text3: "감동을 선사하는 공간",
        };
    }
  };

  const theaterInfo = getTheaterInfo(selectedTheater);

  const formatTitle = (title) => {
    return title.length > 12 ? title.slice(0, 12) + "・・・" : title;
  };

  return (
    <div className="main-theater-container">
      <div className="main-theater-header">
        <h1>티니박스 추천 극장 🏛️</h1>
        <div className="theater-list-container">
          <ul className="theater-list-box">
            {theaterArray.map((theater) => (
              <li key={theater}>
                <div
                  className={`theater-list ${
                    selectedTheater === theater ? "selected" : ""
                  }`}
                  onClick={() => handleTheaterClick(theater)}
                >
                  {theater}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="main-theater-body">
        <div className="theater-info">
          <img
            className="theater-img"
            src={theaterInfo.image}
            alt="theater-image"
          />
          <div>
            <p>{theaterInfo.text1}</p>
            <p>{theaterInfo.text2}</p>
            <p>{theaterInfo.text3}</p>
          </div>
          <span></span>
        </div>
        <div className="theater-play">
          {shows.map((show, index) => (
            <div key={index} className="theater-play-list">
              <div
                className="theater-play-img-box"
                onClick={() => handleShowClick(show.showId)}
              >
                <img src={show.poster} alt={show.title} />
              </div>
              <div onClick={() => handleShowClick(show.showId)}>
                <p className="theater-play-list-title">
                  {formatTitle(show.title)}
                </p>
                <p className="theater-play-list-info">
                  {show.location}
                  <br />
                  {`${new Date(
                    show.start_date
                  ).toLocaleDateString()} ~ ${new Date(
                    show.end_date
                  ).toLocaleDateString()}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainTheater;
