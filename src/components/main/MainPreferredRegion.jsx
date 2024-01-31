import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPreferredRegion.scss";

function MainPreferredRegion() {
  const [shows, setShows] = useState([]); // API로부터 가져온 공연 데이터를 저장할 상태
  const [selectedRegion, setSelectedRegion] = useState("서울"); // 선택된 지역 상태
  const navigate = useNavigate();

  const handleShowClick = (showId) => {
    navigate(`/play/${showId}`);
  };

  // 지역 버튼 클릭 핸들러
  const handleRegionClick = (region) => {
    setSelectedRegion(region);
  };

  useEffect(() => {
    fetch("https://dailytopia2.shop/api/shows?limit=1000")
      .then((res) => res.json())
      .then((data) => {
        // 오늘 날짜와 1년 전 날짜 계산
        const today = new Date();
        const oneYearAgo = new Date(today);
        oneYearAgo.setFullYear(today.getFullYear() - 1);

        const regionMapping = {
          서울: ["서울"],
          "경기/인천": ["경기/인천"],
          강원: ["강원"],
          "대전/충청": ["대전", "충청"],
          "광주/전라": ["광주", "전라"],
          "대구/경상": ["대구", "경상"],
          "부산/울산": ["부산", "울산"],
          제주: ["제주"],
        };

        let filteredShows = data.shows.filter(
          (show) =>
            regionMapping[selectedRegion].includes(show.region) &&
            new Date(show.start_date) >= oneYearAgo &&
            new Date(show.start_date) <= today
        );

        // 제목 시작 4글자가 같은 공연 중복 제거
        const uniqueTitles = new Set();
        filteredShows = filteredShows.filter((show) => {
          const titleStart = show.title.slice(0, 4);
          if (!uniqueTitles.has(titleStart)) {
            uniqueTitles.add(titleStart);
            return true;
          }
          return false;
        });

        // 시작 날짜 기준 정렬
        filteredShows.sort(
          (b, a) => new Date(a.start_date) - new Date(b.start_date)
        );

        setShows(filteredShows.slice(0, 6));
      })
      .catch((err) => console.error(err));
  }, [selectedRegion]);

  const formatTitle = (title) => {
    return title.length > 10 ? title.slice(0, 10) + "・・・" : title;
  };

  const regionArray = [
    "서울",
    "경기/인천",
    "강원",
    "대전/충청",
    "광주/전라",
    "대구/경상",
    "부산/울산",
    "제주",
  ];

  return (
    <div className="main-layout-container">
      <div className="main-title-box">
        <h1 className="main-title">지역별 최신 신작들을 한 눈에 👀</h1>
      </div>
      <div className="region-list-container">
        <ul className="region-list-box">
          {regionArray.map((region) => (
            <li key={region}>
              <div
                className={`region-list ${
                  selectedRegion === region ? "selected" : ""
                }`}
                onClick={() => handleRegionClick(region)}
              >
                {region}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="main-region-play-container">
        <div className="main-region-container">
          {shows.map((show, index) => (
            <div
              key={index}
              className="main-play-box"
              onClick={() => handleShowClick(show.showId)}
            >
              <div className="main-region-play-img-box">
                <img src={show.poster} alt={show.title} />
              </div>
              <p className="main-play-title">{formatTitle(show.title)}</p>
              <p className="main-region-play-period">{`${new Date(
                show.start_date
              ).toLocaleDateString()} Open`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPreferredRegion;
