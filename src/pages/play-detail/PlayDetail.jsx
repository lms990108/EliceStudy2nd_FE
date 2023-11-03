import React, { useState } from "react";
import "./PlayDetail.scss";
import PlayDetailTop from "../../components/play-detail/PlayDetailTop";
import PlayDetailNav from "../../components/play-detail/PlayDetailNav";
import PlayDetailInfo from "../../components/play-detail/PlayDetailInfo";
import PlayReview from "../../components/play-detail/PlayReview";
import TheaterLocation from "../../components/play-detail/TheaterLocation";

export default function PlayDetail() {
  const [detailNavMenu, setDetailNavMenu] = useState("상세정보");
  // lat: 위도, lng: 경도
  const [theaterLoaction, setTheaterLocation] = useState({
    lat: 37.572595,
    lng: 126.975914,
  });

  const handleDetailNavMenuClick = (e) => {
    console.log(e.target.innerText);
    setDetailNavMenu(e.target.innerText);
  };

  return (
    <>
      <div className="play-detail-container">
        <PlayDetailTop />
        <PlayDetailNav
          selected={detailNavMenu}
          handleClick={handleDetailNavMenuClick}
        />
        <div className="play-detail-main-box">
          {detailNavMenu === "상세정보" && <PlayDetailInfo />}
          {detailNavMenu === "관람후기" && <PlayReview />}
          {detailNavMenu === "장소정보" && (
            <TheaterLocation theaterLocation={theaterLoaction} />
          )}
        </div>
      </div>
    </>
  );
}
