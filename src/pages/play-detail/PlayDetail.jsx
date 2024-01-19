import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PlayDetail.scss";
import PlayDetailTop from "../../components/play-detail/PlayDetailTop";
import PlayDetailNav from "../../components/play-detail/PlayDetailNav";
import PlayDetailInfo from "../../components/play-detail/PlayDetailInfo";
import PlayReview from "../../components/play-detail/PlayReview";
import TheaterLocation from "../../components/play-detail/TheaterLocation";
import { UpButton } from "../../components/common/button/UpButton";
import { AlertCustom } from "../../components/common/alert/Alerts";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import useCheckLogin from "../../hooks/authoriaztionHooks/useCheckLogin";

export default function PlayDetail() {
  useCheckLogin();
  // 현재 연극의 id
  const { playId } = useParams();
  // 데이터 가져올 때 로딩을 띄우기 (데이터가 다 가져와지기 전 파싱 작업이 이루어지지 않도록)
  const [isLoading, setIsLoading] = useState(true);
  // 연극 상세 정보
  const [playInfo, setPlayInfo] = useState({});
  console.log(playInfo);
  // 현재 선택한 메뉴 (상세정보 / 관람후기 / 장소정보)
  const [detailNavMenu, setDetailNavMenu] = useState("상세정보");
  // lat: 위도, lng: 경도
  const [theaterLoaction, setTheaterLocation] = useState({});
  // 현재 유저가 로그인되어 있는지 여부 (로그인 되어있을 시 회원정보가 들어가고, 그렇지 않을 시 false가 들어감)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 로그인이 되어 있을 시 채워지게 되는 유저 정보
  const [userInfo, setUserInfo] = useState(null);
  // 에러를 띄우기 위한 상태 정의
  const [error, setError] = useState(null);

  // 현재 연극 하나 데이터 받아오기
  useEffect(() => {
    fetch(`https://dailytopia2.shop/api/show/${playId}`)
      .then((res) => res.json())
      .then((data) => {
        setPlayInfo(data.show);
        setTheaterLocation({ lat: data.latitude, lng: data.longitude });
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setPlayInfo(null);
      });
  }, []);

  const handleDetailNavMenuClick = (e) => {
    console.log(e.target.innerText);
    setDetailNavMenu(e.target.innerText);
  };

  return (
    <>
      <div className="play-detail-container">
        {error && (
          <AlertCustom
            title={"Error"}
            content={error}
            open={true}
            onclose={
              // 에러 상태에서 현재 에러를 제외한 나머지 에러들을 유지
              () => setError(null)
            }
            severity={"error"}
          />
        )}
        {!isLoading && playInfo && (
          <>
            <UpButton />
            <PlayDetailTop
              showId={playInfo.showId}
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
              isLoggedIn={isLoggedIn}
              userInfo={userInfo}
            />
            <PlayDetailNav
              selected={detailNavMenu}
              handleClick={handleDetailNavMenuClick}
            />
            <div className="play-detail-main-box">
              {detailNavMenu === "상세정보" && (
                <PlayDetailInfo
                  title={playInfo.title}
                  cast={playInfo.cast}
                  company={playInfo.company}
                  creator={playInfo.creator}
                  description={playInfo.description}
                  detail_images={playInfo.detail_images}
                  schedule={playInfo.schedule}
                  seat_cnt={playInfo.seat_cnt}
                />
              )}
              {detailNavMenu === "관람후기" && (
                <PlayReview
                  reviews={playInfo.reviews}
                  isLoggedIn={isLoggedIn}
                />
              )}
              {detailNavMenu === "장소정보" && (
                <TheaterLocation
                  theaterLocation={theaterLoaction}
                  locationName={playInfo.location}
                />
              )}
            </div>
          </>
        )}
        {!isLoading && !playInfo && (
          <div className="get-playInfo-error">
            <ErrorOutlineIcon fontSize="large" />
            <h2>연극 정보 가져오기에 실패했습니다.</h2>
          </div>
        )}
        {!error && isLoading && <div>로딩중</div>}
      </div>
    </>
  );
}
