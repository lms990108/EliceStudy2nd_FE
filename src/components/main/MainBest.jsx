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

  // 메인페이지에서 연극을 클릭하면 해당연극 상세페이지로 이동
  const handleShowClick = (showId) => {
    navigate(`/play/${showId}`);
  };

  // 무한루프 슬라이드 구현을 위해 isAnimating 상태에 따라 다른 스타일을 적용
  const wrapperStyles = isAnimating
    ? {
        display: "flex",
        gap: "20px",
        paddingLeft: "10px",
        paddingRight: "10px",
        transform: `translateX(-${sliderIndex * 1200}px)`,
        transition: "transform 0.4s ease",
      }
    : {
        display: "flex",
        gap: "20px",
        paddingLeft: "10px",
        paddingRight: "10px",
        transform: `translateX(-${sliderIndex * 1200}px)`,
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

  // 슬라이드 좌 우 이동 헨들러
  const handleLeftClick = () => {
    setIsAnimating(true);
    setSliderIndex((prevIndex) => prevIndex - 1);
  };

  const handleRightClick = () => {
    setIsAnimating(true);
    setSliderIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    fetch("https://dailytopia2.shop/api/shows?limit=1000")
      .then((res) => res.json())
      .then((data) => {
        const rankedShows = data.shows.filter(
          (show) => show.rank && show.rank >= 1 && show.rank <= 30
        );
        // 연극을 rank에 따라 정렬
        rankedShows.sort((a, b) => a.rank - b.rank);

        // 상위 18개 항목 선택
        const top18Shows = rankedShows.slice(0, 18);

        // 각 연극에 인덱스 기반 순위 부여
        top18Shows.forEach((show, index) => {
          show.newRank = index + 1;
        });

        // 순서대로 재배열
        const reorderedShows = [
          ...top18Shows.slice(12), // 13번부터 18번까지
          ...top18Shows, // 1번부터 18번까지
          ...top18Shows.slice(0, 6), // 1번부터 6번까지
        ];

        setShows(reorderedShows);
      })
      .catch((err) => console.error(err));
  }, []);

  const formatTitle = (title) => {
    return title.length > 10 ? title.slice(0, 10) + "・・・" : title;
  };

  return (
    <div className="main-layout-container">
      <div className="main-title-box">
        <h1 className="main-title">보도 또 봐도 좋은 실시간 베스트 👑 연극</h1>
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
              <div
                key={index}
                className="main-play-box"
                onClick={() => handleShowClick(show.showId)}
              >
                <div className="main-play-img-box">
                  <img
                    src={show.poster}
                    alt={show.title}
                    style={{ opacity: 0.9 }}
                  />
                  <p className="best-overlay-rank">{show.newRank}</p>
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
