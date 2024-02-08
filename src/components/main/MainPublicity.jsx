import React, { useState, useEffect } from "react";
import "./MainPublicity.scss";

function MainPublicity() {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    fetch("https://dailytopia2.shop/api/promotions")
      .then((res) => res.json())
      .then((data) => {
        setPromotions(data.promotions);
        console.log(data);
      })
      .catch((err) => console.error(err));
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

  return (
    <div className="main-layout-container">
      <div className="main-title-box">
        <p className="main-title">소규모 추천 연극</p>
      </div>
      <div className="main-publicity-container">
        <div>
          <div className="publicity-box1">
            {promotions.length > 0 && (
              <div className="publicity-product1">
                <div className="main-publicity1-img-box">
                  {promotions[0]?.image_url && ( // image_url이 존재하는지 확인
                    <img
                      src={promotions[0]?.image_url[0]}
                      alt={promotions[0]?.title}
                    />
                  )}
                </div>
                <p className="promotions-title">
                  {limitTitleLength(promotions[0]?.title, 30)}
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
              <div key={index} className="publicity-product">
                <div className="main-publicity-img-box">
                  {promotion.image_url &&
                    promotion.image_url[0] && ( // image_url이 존재하는지 확인
                      <img src={promotion.image_url[0]} alt={promotion.title} />
                    )}
                </div>
                <p className="promotions-title">
                  {limitTitleLength(promotion.title, 20)}
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
            <div key={index} className="publicity-product">
              <div className="main-publicity-img-box">
                {promotion.image_url &&
                  promotion.image_url[0] && ( // image_url이 존재하는지 확인
                    <img src={promotion.image_url[0]} alt={promotion.title} />
                  )}
              </div>
              <p className="promotions-title">
                {limitTitleLength(promotion.title, 20)}
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
