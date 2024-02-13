import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPublicity.scss";

function MainPublicity() {
  const [promotions, setPromotions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        // 소규모 연극 조회순 top 10
        const res_views = await fetch(
          "https://dailytopia2.shop/api/promotions?limit=10&sortBy=views&sortOrder=desc&category=연극"
        );
        const data_views = await res_views.json();
        if (!res_views.ok) {
          throw new Error("Failed to fetch promotions by views");
        }
        let newList = data_views.promotions;

        // 소규모 연극 추천순 top 10
        const res_likes = await fetch(
          "https://dailytopia2.shop/api/promotions?limit=10&sortBy=likes&sortOrder=desc&category=연극"
        );
        const data_likes = await res_likes.json();
        if (!res_likes.ok) {
          throw new Error("Failed to fetch promotions by likes");
        }
        newList = [...newList, ...data_likes.promotions];

        // 중복 제거
        newList = newList.reduce(function (newArr, current) {
          if (newArr.findIndex(({ _id }) => _id === current._id) === -1) {
            newArr.push(current);
          }
          return newArr;
        }, []);

        // (조회수 + 추천수)가 0보다 큰 것만 필터링
        newList = newList.filter(
          (promotion) => promotion.likes + promotion.views > 0
        );

        // 이미지가 있는 프로모션만 필터링
        newList = newList.filter(
          (promotion) => promotion.image_url && promotion.image_url[0]
        );

        // (조회수 + 추천수) 높은 순으로 정렬
        newList.sort((a, b) => b.views + b.likes - (a.views + a.likes));

        setPromotions(newList);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  // 날짜 형식을 조정하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
  };

  // 타이틀을 최대 14글자로 제한하는 함수
  const limitTitleLength = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "...";
    }
    return title;
  };

  // publicity-product 클릭 시 라우팅 처리하는 함수
  const handleProductClick = (promotionNumber) => {
    const route = `/promotion/${promotionNumber}`;
    navigate(route);
  };

  // newList가 5개 이하인 경우에만 MainPublicity 컴포넌트를 숨깁니다.
  if (promotions.length <= 5) {
    return null;
  }

  return (
    <div className="main-layout-container">
      <div className="main-title-box">
        <p className="main-title">소규모 추천 연극</p>
      </div>
      <div className="main-publicity-container">
        <div>
          <div className="publicity-box1">
            {promotions.length > 0 && (
              <div
                className="publicity-product1"
                onClick={() =>
                  handleProductClick(promotions[0].promotion_number)
                }
              >
                <div className="main-publicity1-img-box">
                  {promotions[0]?.image_url && (
                    <img
                      src={promotions[0]?.image_url[0]}
                      alt={promotions[0]?.play_title}
                    />
                  )}
                </div>
                <p className="promotions-title">
                  {limitTitleLength(promotions[0]?.play_title, 20)}
                </p>
                <p className="promotions-period">
                  {formatDate(promotions[0]?.start_date)} ~{" "}
                  {formatDate(promotions[0]?.end_date)}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="publicity-box2">
          {promotions.length > 1 &&
            promotions.slice(1, 4).map((promotion, index) => (
              <div
                key={index}
                className="publicity-product"
                onClick={() => handleProductClick(promotion.promotion_number)}
              >
                <div className="main-publicity-img-box">
                  {promotion.image_url && promotion.image_url[0] && (
                    <img
                      src={promotion.image_url[0]}
                      alt={promotion.play_title}
                    />
                  )}
                </div>
                <p className="promotions-title">
                  {limitTitleLength(promotion.play_title, 14)}
                </p>
                <p className="promotions-period">
                  {formatDate(promotion.start_date)} ~{" "}
                  {formatDate(promotion.end_date)}
                </p>
              </div>
            ))}
        </div>
        <div className="publicity-box3">
          {promotions.slice(4, 7).map((promotion, index) => (
            <div
              key={index}
              className="publicity-product"
              onClick={() => handleProductClick(promotion.promotion_number)}
            >
              <div className="main-publicity-img-box">
                {promotion.image_url && promotion.image_url[0] && (
                  <img
                    src={promotion.image_url[0]}
                    alt={promotion.play_title}
                  />
                )}
              </div>
              <p className="promotions-title">
                {limitTitleLength(promotion.play_title, 14)}
              </p>
              <p className="promotions-period">
                {formatDate(promotion.start_date)} ~{" "}
                {formatDate(promotion.end_date)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPublicity;
