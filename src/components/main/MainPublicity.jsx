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

  return (
    <div className="main-layout-container">
      <div className="main-title-box">
        <p className="main-title">숨소리까지 들리는 생생함! 소규모 연극</p>
      </div>
      <div className="main-publicity-container">
        <div className="publicity-box1">
          {promotions.length > 0 && (
            <div className="publicity-product1">
              <img src={promotions[0]?.image_url[0]} alt={promotions[0]?.title} />
              <p>{promotions[0]?.title}</p>
              <p>{formatDate(promotions[0]?.start_date)} ~ {formatDate(promotions[0]?.end_date)}</p>
              <p>조회수: {promotions[0]?.views}</p>
              <p>좋아요: {promotions[0]?.likes}</p>
              <p>댓글 수: {promotions[0]?.commentsCount}</p>
            </div>
          )}
        </div>
        <div className="publicity-box2">
          {promotions.length > 1 &&
            promotions.slice(1, 4).map((promotion, index) => (
              <div key={index} className="publicity-product">
                <img src={promotion.image_url[0]} alt={promotion.title} />
                <p>{promotion.title}</p>
                <p>{formatDate(promotions[0]?.start_date)} ~ {formatDate(promotions[0]?.end_date)}</p>
                <p>조회수: {promotion.views}</p>
                <p>좋아요: {promotion.likes}</p>
                <p>댓글 수: {promotion.commentsCount}</p>
              </div>
            ))}
        </div>
        <div className="publicity-box3">
          {promotions.slice(4, 7).map((promotion, index) => (
            <div key={index} className="publicity-product">
              <img src={promotion.image_url[0]} alt={promotion.title} />
              <p>{promotion.title}</p>
              <p>{formatDate(promotions[0]?.start_date)} ~ {formatDate(promotions[0]?.end_date)}</p>
              <p>조회수: {promotion.views}</p>
              <p>좋아요: {promotion.likes}</p>
              <p>댓글 수: {promotion.commentsCount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPublicity;