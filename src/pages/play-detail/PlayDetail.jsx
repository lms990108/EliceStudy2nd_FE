import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PlayDetail.scss";
import PlayDetailTop from "../../components/play-detail/PlayDetailTop";
import PlayDetailNav from "../../components/play-detail/PlayDetailNav";
import PlayDetailInfo from "../../components/play-detail/PlayDetailInfo";
import PlayReview from "../../components/play-detail/PlayReview";
import TheaterLocation from "../../components/play-detail/TheaterLocation";

export default function PlayDetail() {
  const { playId } = useParams();
  console.log(playId);
  const [isLoading, setIsLoading] = useState(true);
  const [playInfo, setPlayInfo] = useState({});
  console.log(playInfo);
  const [detailNavMenu, setDetailNavMenu] = useState("상세정보");
  // lat: 위도, lng: 경도
  const [theaterLoaction, setTheaterLocation] = useState({});

  // 현재 연극 하나 데이터 받아오기
  useEffect(() => {
    fetch(`https://dailytopia2.shop/api/show/${playId}`)
      .then((res) => res.json())
      .then((res) => {
        setPlayInfo(res);
        setTheaterLocation({ lat: res.latitude, lng: res.longitude });
        setIsLoading(false);
      })
      .catch((err) => alert(err));
  }, []);

  const handleDetailNavMenuClick = (e) => {
    console.log(e.target.innerText);
    setDetailNavMenu(e.target.innerText);
  };

  return (
    <>
      <div className="play-detail-container">
        {!isLoading ? (
          <>
            <PlayDetailTop
              age={playInfo.age}
              start_date={playInfo.start_date}
              end_date={playInfo.end_date}
              location={playInfo.location}
              poster={playInfo.poster}
              price={playInfo.price}
              runtime={playInfo.runtime}
              state={playInfo.state}
              title={playInfo.title}
              reviews={playInfo.reviews}
            />
            <PlayDetailNav
              selected={detailNavMenu}
              handleClick={handleDetailNavMenuClick}
            />
            <div className="play-detail-main-box">
              {detailNavMenu === "상세정보" && (
                <PlayDetailInfo
                  cast={playInfo.cast}
                  company={playInfo.company}
                  creator={playInfo.creator}
                  description={playInfo.description}
                  detail_images={playInfo.detail_images}
                  schedule={playInfo.schedule}
                />
              )}
              {detailNavMenu === "관람후기" && (
                <PlayReview reviews={playInfo.reviews} />
              )}
              {detailNavMenu === "장소정보" && (
                <TheaterLocation
                  theaterLocation={theaterLoaction}
                  locationName={playInfo.location}
                />
              )}
            </div>
          </>
        ) : (
          <div>로딩중</div>
        )}
      </div>
    </>
  );
}
