import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./MainPublicity.scss";

function MainPublicity() {
  const [promotions, setPromotions] = useState([]);
  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onRun = () => setAnimate(true);
  const navigate = useNavigate();

  // 메인페이지에서 포로모션을 클릭하면 해당 프로모션 상세페이지로 이동
  const handlePromotionClick = (promotion_number) => {
    navigate(`/promotion/${promotion_number}`);
  };

  useEffect(() => {
    fetch("https://dailytopia2.shop/api/promotions")
      .then((res) => res.json())
      .then((data) => {
        setPromotions(data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="main-layout-container">
      <div className="main-title-box">
        <p className="main-title">숨소리까지 들리는 생생함! 소규모 연극</p>
      </div>
      <div className="main-publicity-container">
        <div className="publicity-box1">
          <div className="publicity-product1">
            {promotions.length > 0 && (
              <>
                <img src={promotions[0]?.image_url} alt={promotions[0]?.title} />
                <p>{promotions[0]?.title}</p>
              </>
            )}
          </div>
        </div>
        <div className="publicity-box2">
          {promotions.slice(1, 4).map((promotion, index) => (
            <div key={index} className="publicity-product">
              <img src={promotion.image_url} alt={promotion.title} />
              <p>{promotion.title}</p>
            </div>
          ))}
        </div>
        <div className="publicity-box3">
          {promotions.slice(4, 7).map((promotion, index) => (
            <div key={index} className="publicity-product">
              <img src={promotion.image_url} alt={promotion.title} />
              <p>{promotion.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPublicity;