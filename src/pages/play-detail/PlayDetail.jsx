import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./PlayDetail.scss";
import PlayDetailTop from "../../components/play-detail/PlayDetailTop";
import PlayDetailNav from "../../components/play-detail/PlayDetailNav";
import PlayDetailInfo from "../../components/play-detail/PlayDetailInfo";
import PlayReview from "../../components/play-detail/PlayReview";
import TheaterLocation from "../../components/play-detail/TheaterLocation";
import { UpButton } from "../../components/common/button/UpButton";
import { AlertCustom } from "../../components/common/alert/Alerts";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Loading from "../../components/common/loading/Loading";
import { AppContext } from "../../App";

export function PlayDetail() {
  // 유저 로그인 여부 + 정보 확인
  const { userData } = useContext(AppContext);
  console.log(userData);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const detailNavMenu = queryParams.get("tab") || "detail-info";
  // 현재 연극의 id
  const { playId } = useParams();
  // 데이터 가져올 때 로딩을 띄우기 (데이터가 다 가져와지기 전 파싱 작업이 이루어지지 않도록)
  const [isLoading, setIsLoading] = useState(true);
  // 연극 상세 정보
  const [playInfo, setPlayInfo] = useState({});
  // 에러 메시지 상태
  const [error, setError] = useState(null);

  // 현재 연극 하나 데이터 받아오기
  useEffect(() => {
    fetch(`https://dailytopia2.shop/api/shows/${playId}`)
      .then((res) => res.json())
      .then((data) => {
        setPlayInfo(data.show);
        setTimeout(() => setIsLoading(false), 300);
      })
      .catch(() => {
        setIsLoading(false);
        setPlayInfo(null);
      });
  }, []);

  const handleDetailNavMenuClick = (e) => {
    const queryParams = new URLSearchParams(location.search);
    if (e.target.innerText === "상세정보") {
      queryParams.set("tab", "detail-info");
    } else if (e.target.innerText === "관람후기") {
      queryParams.set("tab", "reviews");
    } else if (e.target.innerText === "장소정보") {
      queryParams.set("tab", "location-info");
    }
    navigate(`?${queryParams.toString()}`);
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
        {!isLoading && playInfo && userData && (
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
              isLoggedIn={userData.isLoggedIn}
              averageRate={playInfo.avg_rating}
            />
            <PlayDetailNav
              selected={detailNavMenu}
              handleClick={handleDetailNavMenuClick}
            />
            <div className="play-detail-main-box">
              {detailNavMenu === "detail-info" && (
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
              {detailNavMenu === "reviews" && (
                <PlayReview
                  showId={playInfo.showId}
                  isLoggedIn={userData.isLoggedIn}
                  author={userData.user?.nickname}
                  averageRate={playInfo.avg_rating}
                  state={playInfo.state}
                  userId={userData.user?.user_id}
                />
              )}
              {detailNavMenu === "location-info" && (
                <TheaterLocation
                  theaterLocation={{
                    lat: playInfo.latitude,
                    lng: playInfo.longitude,
                  }}
                  locationName={playInfo.location}
                />
              )}
            </div>
          </>
        )}
        {!isLoading && !playInfo && (
          <div className="get-playInfo-error">
            <ErrorOutlineIcon fontSize="large" />
            <h2>연극 정보 가져오기에 실패하였거나 존재하지 않는 연극입니다.</h2>
          </div>
        )}
        {!error && isLoading && <Loading />}
      </div>
    </>
  );
}
