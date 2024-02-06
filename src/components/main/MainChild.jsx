import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MainChild.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function MainChild() {
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
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 오늘 날짜만 고려 (시간은 무시)

    fetch("https://dailytopia2.shop/api/shows/children")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        let sortedShows = data.shows;
        // 상위 18개 공연만 선택
        sortedShows = sortedShows.slice(0, 18);

        // 순서대로 재배열
        const reorderedShows = [
          ...sortedShows.slice(12), // 13번부터 18번까지
          ...sortedShows, // 1번부터 18번까지
          ...sortedShows.slice(0, 6), // 1번부터 6번까지
        ];
        setShows(reorderedShows);
      })
      .catch((err) => console.error(err));
  }, []);

  const formatTitle = (title) => {
    return title.length > 13 ? title.slice(0, 13) : title;
  };

  return (
    <div className="main-layout-container">
      <div className="main-title-box">
        <p className="main-title">아이와 같이 즐기는 문화생활</p>
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
          style={{ fontSize: 32 }}
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
                  <img src={show.poster} alt={show.title} />
                </div>
                <p className="main-play-title">{formatTitle(show.title)}</p>
                <p className="main-child-play-period">
                  {formatTitle(show.age)}
                </p>
              </div>
            ))}
          </div>
        </div>
        <ArrowForwardIosIcon
          onClick={handleRightClick}
          className="slide-right-icon"
          style={{ fontSize: 32 }}
        />
      </div>
    </div>
  );
}

export default MainChild;
