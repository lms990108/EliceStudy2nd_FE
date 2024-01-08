import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MainBest.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function MainBest() {
  const [sliderIndex, setSliderIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);
  const [shows, setShows] = useState([]); // API로부터 가져온 공연 데이터를 저장할 상태
  const navigate = useNavigate();

  const handleShowClick = (showId) => {
    navigate(`/play/${showId}`);
  };

  useEffect(() => {
    if (sliderIndex === 4) {
      setTimeout(() => {
        setSliderIndex(1);
        setIsAnimating(false);
      }, 400);
    } else if (sliderIndex === 0) {
      setTimeout(() => {
        setSliderIndex(3);
        setIsAnimating(false);
      }, 400);
    }
  }, [sliderIndex]);

  function getTopLocations(data) {
    const locationCounts = {};
  
    // 빈도 계산
    data.forEach(show => {
      const location = show.location;
      if (location) {
        locationCounts[location] = (locationCounts[location] || 0) + 1;
      }
    });
  
    // 객체를 배열로 변환하고 빈도에 따라 정렬
    const sortedLocations = Object.entries(locationCounts)
                                  .sort((a, b) => b[1] - a[1]);
  
    // 상위 10개 위치 추출
    return sortedLocations.slice(0, 10).map(item => item[0]);
  }
  
  // 예시 데이터 사용 (shows 변수에 저장된 데이터)
  const topLocations = getTopLocations(shows);
  console.log(topLocations);

  const handleLeftClick = () => {
    setIsAnimating(true);
    setSliderIndex((prevIndex) => prevIndex - 1);
  };

  const handleRightClick = () => {
    setIsAnimating(true);
    setSliderIndex((prevIndex) => prevIndex + 1);
  };

  // 스타일 결정: isAnimating 상태에 따라 다른 스타일을 적용
  const wrapperStyles = isAnimating
    ? {
        display: "flex",
        gap: "20px",
        transform: `translateX(-${sliderIndex * 1205}px)`,
        transition: "transform 0.4s ease",
      }
    : {
        display: "flex",
        gap: "20px",
        transform: `translateX(-${sliderIndex * 1205}px)`,
      };

  useEffect(() => {
    fetch("https://dailytopia2.shop/api/show?limit=1000")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // rank 키가 있고 값이 1~18인 항목들만 필터링
        const rankedShows = data.shows.filter(
          (show) => show.rank && show.rank >= 1 && show.rank <= 18
        );
        console.log(rankedShows);
        // 원하는 순서대로 정렬
        rankedShows.sort((a, b) => a.rank - b.rank);

        // 순서대로 재배열
        const reorderedShows = [
          ...rankedShows.slice(12), // 13번부터 18번까지
          ...rankedShows, // 1번부터 18번까지
          ...rankedShows.slice(0, 6), // 1번부터 6번까지
        ];

        setShows(reorderedShows);
      })
      .catch((err) => alert(err));
  }, []);

  const formatTitle = (title) => {
    return title.length > 10 ? title.slice(0, 10) + "・・・" : title;
  };

  return (
    <div className="main-layout-container">
      <div className="main-title-box">
        <h1 className="main-title">보도 또 봐도 좋은 베스트 👑 작품</h1>
        <div className="slide-info-box">
          <p
            className={`slide-info1 ${
              sliderIndex === 4 || sliderIndex === 1 ? "active" : ""
            }`}
          >
            ㅡ
          </p>
          <p className={`slide-info2 ${sliderIndex === 2 ? "active" : ""}`}>
            ㅡ
          </p>
          <p
            className={`slide-info3 ${
              sliderIndex === 3 || sliderIndex === 0 ? "active" : ""
            }`}
          >
            ㅡ
          </p>
        </div>
      </div>
      <div className="main-slide-container">
        <ArrowBackIosIcon
          onClick={handleLeftClick}
          className="slide-left-icon"
          style={{ fontSize: 48 }}
        />
        <div className="main-play-container">
          <div style={wrapperStyles}>
            {shows.map((show, index) => (
              <div key={index} className="main-play-box" onClick={() => handleShowClick(show.showId)}>
                <div className="main-play-img-box">
                  <img src={show.poster} alt={show.title} style={{ opacity: 0.9 }} />
                  <p className="best-overlay-rank">{show.rank}</p>
                </div>
                <p className="main-play-title">{formatTitle(show.title)}</p>
                <p className="main-play-period">{`${new Date(
                  show.start_date
                ).toLocaleDateString()} ~ ${new Date(
                  show.end_date
                ).toLocaleDateString()}`}</p>
              </div>
            ))}
          </div>
        </div>
        <ArrowForwardIosIcon
          onClick={handleRightClick}
          className="slide-right-icon"
          style={{ fontSize: 48 }}
        />
      </div>
    </div>
  );
}

export default MainBest;
