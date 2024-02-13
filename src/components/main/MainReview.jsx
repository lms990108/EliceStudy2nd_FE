import React, { useState, useEffect } from "react";
import "./MainReview.scss";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

const MainReview = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("https://dailytopia2.shop/api/reviews");
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      const filteredReviews = data.data.filter(
        (review) => review.rate >= 3 && review.image_urls.length > 0
      ); // 별점이 3점 이상이고 이미지 URL 배열이 비어 있지 않은 리뷰 필터링
      setReviews(filteredReviews.slice(0, 3));
    } catch (error) {
      console.error(error);
    }
  };

  const trimText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength) + "...";
    }
  };

  const handleClickReview = (showId) => {
    // 클릭 이벤트 핸들러 추가
    navigate(`/play/${showId}?tab=reviews`); // 해당 리뷰에 대한 URL로 이동
  };

  return (
    <div className="main-review-container">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="review-box"
          onClick={() => handleClickReview(review.show_id)}
        >
          {" "}
          {/* 클릭 이벤트 추가 */}
          <div>
            <h3>{trimText(review.show_title, 18)}</h3>
            <div className="main-review-img-box">
              <img src={review.image_urls[0]} alt="review-thumbnail" />
            </div>
            <p>{trimText(review.content, 34)}</p>
          </div>
          <div className="stars">
            <Rating value={review.rate} readOnly precision={0.5} />{" "}
            <div className="main-review-nickname">
              {trimText(review.user_nickname, 6)}
            </div>
          </div>
        </div>
      ))}
      <div className="review-title-box">
        <p className="review-h2">따끈따끈 실시간 리뷰</p>
        <p className="review-p">생생한 후기를 들려드릴게요✨</p>
      </div>
    </div>
  );
};

export default MainReview;
