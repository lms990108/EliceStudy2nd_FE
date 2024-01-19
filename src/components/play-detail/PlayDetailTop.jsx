import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./PlayDetailTop.scss";
import kakaoTalkImg from "../../assets/img/SNSIcon/kakaoTalk.png";
import XImg from "../../assets/img/SNSIcon/X.png";
import LinkIcon from "@mui/icons-material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { AlertCustom } from "../common/alert/Alerts";

export default function PlayDetailTop({
  showId,
  age,
  start_date,
  end_date,
  location,
  poster,
  price,
  runtime,
  state,
  title,
  reviews,
  isLoggedIn,
  userInfo,
}) {
  const navigate = useNavigate();
  // 현재 url 정보 객체
  const currentURL = useLocation();
  // 알람
  const [alert, setAlert] = useState(null);
  // 이 연극을 현재 로그인된 유저가 찜했는지 여부
  const [isDibbed, setIsDibbed] = useState(false);
  console.log(isDibbed);
  // 로그인 필요 알람
  const [needLoginAlert, setNeedLoginAlert] = useState(null);
  // 현재 마우스가 올라가 있는 공유 옵션
  const [currentHoverOption, setCurrentHoverOption] = useState(null);

  // 찜한 연극인지를 확인하는 로직 (유저가 로그인 되어 있을시에만 로직 적용)
  useEffect(() => {
    if (isLoggedIn) {
      // 찜 여부 확인
      fetch(`https://dailytopia2.shop/api/users/bookmarks/${showId}`, {
        credentials: "include",
      })
        .then((res) => res.json()) // res.json()을 반환하도록 수정
        .then((data) => {
          setIsDibbed(data.isBookmarked);
        })
        .catch((err) => {});
    }
  }, []);

  // 카카오 공유하기를 위한 로직
  useEffect(() => {
    // 페이지에서 init이 한번만 이루어지도록 설정
    if (!Kakao.isInitialized()) {
      // Kakao.init이 되어 있지 않은 경우에만 초기화 진행
      Kakao.init(process.env.REACT_APP_KAKAO_SHARE_API_KEY);
    }
    // 카카오링크 버튼 생성 (두 번 버튼을 클릭해야 생성되는 것을 막기 위해 useEffect에 작성!)
    Kakao.Link.createDefaultButton({
      container: "#btnKakaoShare", // 카카오공유버튼ID
      objectType: "feed",
      content: {
        title: `[🎫TeenyBox] ${title} 정보 공유`, // 보여질 제목
        description: `${title} 정보 공유입니다 (from TeenyBox)`, // 보여질 설명
        imageUrl: `${process.env.REACT_APP_BASE_URL}${currentURL.pathname}`, // 콘텐츠 URL
        link: {
          mobileWebUrl: `${process.env.REACT_APP_BASE_URL}${currentURL.pathname}`,
          webUrl: `${process.env.REACT_APP_BASE_URL}${currentURL.pathname}`,
        },
      },
    });
  }, []);

  // 링크 복사 버튼 클릭 시
  const handleShareBtnClick = async (currentPath) => {
    try {
      await navigator.clipboard.writeText(currentPath);
      setAlert({
        title: "링크 복사 완료",
        content: "현재 페이지의 링크가 복사되었습니다.",
        open: true,
        onclose: () => setAlert(null),
        severity: "success",
      });
    } catch (err) {
      console.log(err);
      setAlert({
        title: "링크 복사 실패",
        content: "현재 페이지 링크 복사에 실패하였습니다.",
        open: true,
        onclose: () => setAlert(null),
        severity: "error",
      });
    }
  };

  // 페이스북으로 공유하기 버튼 클릭 시
  const shareFacebook = () => {
    var sendUrl = `${process.env.REACT_APP_BASE_URL}${currentURL.pathname}`; // 전달할 URL
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
  };

  // 트위터로 공유하기 버튼 클릭 시
  const shareTwitter = () => {
    var sendText = `[🎫TeenyBox] ${title} 정보 공유`; // 전달할 텍스트
    var sendUrl = `${process.env.REACT_APP_BASE_URL}${currentURL.pathname}`; // 전달할 URL
    window.open(
      "https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl
    );
  };

  // 찜 버튼 클릭 시
  const handleDibBtnClick = () => {
    if (isLoggedIn) {
      // 찜이 되어 있는 경우 찜 취소
      if (isDibbed) {
        fetch(`https://dailytopia2.shop/api/user/cancel/${showId}`, {
          method: "PUT",
          withCredentials: true,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setIsDibbed(false);
          })
          .catch((err) => {
            console.log(err);
            setAlert({
              title: "찜 취소 실패",
              content: "찜 취소에 실패하였습니다.",
              open: true,
              onclose: () => setAlert(null),
              severity: "error",
            });
          });
      } else {
        // 찜이 되어 있지 않은 경우 찜 추가
        fetch(`https://dailytopia2.shop/api/user/save/${showId}`, {
          method: "PUT",
          withCredentials: true,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setIsDibbed(true);
          })
          .catch((err) =>
            setAlert({
              title: "찜 실패",
              content: "찜하기에 실패하였습니다.",
              open: true,
              onclose: () => setAlert(null),
              severity: "error",
            })
          );
      }
    } else {
      // 로그인이 되어 있지 않을 경우의 로직
      setNeedLoginAlert(
        "로그인이 필요한 기능입니다. 로그인 페이지로 이동하시겠습니까?"
      );
    }
  };

  return (
    <div className="play-detail-top-container">
      {alert && (
        <AlertCustom
          title={alert.title}
          content={alert.content}
          open={alert.open}
          onclose={alert.onclose}
          severity={alert.severity}
        />
      )}
      {needLoginAlert && (
        <AlertCustom
          title={"로그인 필요"}
          content={needLoginAlert}
          open={Boolean(needLoginAlert)}
          onclose={() => setNeedLoginAlert(null)}
          onclick={() => navigate("/signup-in")}
          severity={"warning"}
          checkBtn={"확인"}
          closeBtn={"취소"}
        />
      )}
      <div className="play-detail-top">
        <div className="play-poster">
          <div className="poster-box">
            {state === "공연완료" && (
              <div className="end-show-design">
                <img src="/banner.png" alt="공연 완료 이미지" />
                <span className="end-show-text">
                  연극 <br />
                  종료
                </span>
              </div>
            )}
            <img src={poster} alt={`${title} 포스터`} />
          </div>
        </div>
        <div className="play-info">
          <h1>연극 &lt;{title}&gt;</h1>
          <hr />
          <div>
            <h3>상영기간</h3>
            <p>{`${start_date.split("T")[0]} ~ ${end_date.split("T")[0]}`}</p>
          </div>
          <div>
            <h3>공연 상태</h3>
            <p>{state}</p>
          </div>
          <div>
            <h3>상영장소</h3>
            <p>{location}</p>
          </div>
          <div>
            <h3>관람시간</h3>
            <p>{runtime}</p>
          </div>
          <div>
            <h3>관람등급</h3>
            <p>{age}</p>
          </div>
          <div>
            <h3>가격정보</h3>
            <p>{price}</p>
          </div>
          <div>
            <h3>평점</h3>
            <p>
              <Rating value={0} readOnly />
            </p>
          </div>
        </div>
      </div>
      <div className="play-detail-buttons">
        <div className="share-btn">
          <p>공유</p>
          <div className="share-option">
            <LinkIcon
              fontSize="medium"
              onClick={() =>
                handleShareBtnClick(
                  `${process.env.REACT_APP_BASE_URL}${currentURL.pathname}`
                )
              }
              onMouseOver={() => setCurrentHoverOption("링크 복사")}
              onMouseOut={() => setCurrentHoverOption(null)}
              style={{ cursor: "pointer" }}
            />
            <div className="share-option-text">
              <span
                style={
                  currentHoverOption === "링크 복사"
                    ? { visibility: "visible" }
                    : { visibility: "hidden" }
                }
                className="share-tooltip"
              >
                링크 복사
              </span>
            </div>
          </div>
          <div className="share-option">
            <FacebookIcon
              fontSize="large"
              color="facebookBlue"
              onClick={() => shareFacebook()}
              onMouseOver={() => setCurrentHoverOption("페이스북 공유")}
              onMouseOut={() => setCurrentHoverOption(null)}
              style={{ cursor: "pointer" }}
            />
            <div className="share-option-text">
              <span
                style={
                  currentHoverOption === "페이스북 공유"
                    ? { visibility: "visible" }
                    : { visibility: "hidden" }
                }
                className="share-tooltip"
              >
                페이스북
              </span>
            </div>
          </div>
          <div className="share-option">
            <div className="SNS-img-box">
              <img
                src={XImg}
                onMouseOver={() => setCurrentHoverOption("X 공유")}
                onMouseOut={() => setCurrentHoverOption(null)}
                onClick={() => shareTwitter()}
                alt="X-icon"
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="share-option-text">
              <span
                style={
                  currentHoverOption === "X 공유"
                    ? { visibility: "visible" }
                    : { visibility: "hidden" }
                }
                className="share-tooltip"
              >
                X (트위터)
              </span>
            </div>
          </div>
          <div className="share-option">
            <div className="SNS-img-box">
              <img
                id="btnKakaoShare"
                src={kakaoTalkImg}
                onMouseOver={() => setCurrentHoverOption("카카오톡 공유")}
                onMouseOut={() => setCurrentHoverOption(null)}
                alt="kakaoTalk-icon"
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="share-option-text">
              <span
                style={
                  currentHoverOption === "카카오톡 공유"
                    ? { visibility: "visible" }
                    : { visibility: "hidden" }
                }
                className="share-tooltip"
              >
                카카오톡
              </span>
            </div>
          </div>
        </div>
        <div className="another-btn">
          <div className="dibs-btn">
            <Button
              variant={isDibbed ? "contained" : "outlined"}
              color="error"
              size="large"
              onClick={handleDibBtnClick}
            >
              <Typography
                fontFamily="Nanum Gothic, sans-serif"
                className="button-text"
              >
                {isDibbed ? "찜한 연극" : "♥️ 찜하기"}
              </Typography>
            </Button>
          </div>
          <div className="reserve-btn">
            {state !== "공연완료" ? (
              <a
                href={`https://tickets.interpark.com/contents/search?keyword=${title}&start=0&rows=20`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="contained" color="secondary" size="large">
                  <Typography
                    fontFamily="Nanum Gothic, sans-serif"
                    className="button-text"
                  >
                    예매하러 가기
                  </Typography>
                </Button>
              </a>
            ) : (
              <>
                <div
                  onMouseOver={() => setCurrentHoverOption("종료된 연극")}
                  onMouseOut={() => setCurrentHoverOption(null)}
                >
                  <Button variant="contained" disabled>
                    <Typography
                      fontFamily="Nanum Gothic, sans-serif"
                      className="button-text"
                    >
                      예매하러 가기
                    </Typography>
                  </Button>
                </div>
                <span
                  style={
                    currentHoverOption === "종료된 연극"
                      ? { visibility: "visible" }
                      : { visibility: "hidden" }
                  }
                  className="end-show-tooltip"
                >
                  본 연극은 종료되어 예매 링크가 제공되지 않습니다.
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
