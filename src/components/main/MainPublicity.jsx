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
    fetch("https://dailytopia2.shop/api/promotion")
      .then((res) => res.json())
      .then((data) => {
        setPromotions(data);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <>
      <div className="main-publicit-header">
        <h1 className="main-publicity-title">
          숨소리까지 들리는 생생함! 소규모 연극
        </h1>
        <Link to="/promotion">
          <div className="publicity-btn">
            <p>모두 보기</p>
          </div>
        </Link>
      </div>
      <div className="publicit-wrapper">
        <div className="publicit-slide-container">
          <ul className="publicit-slide-wrapper">
            <div className={"slide original".concat(animate ? "" : " stop")}>
              {promotions.map((promotion, i) => (
                <li key={i}>
                  <img
                    src={promotion.poster_url}
                    onMouseEnter={onStop} // 슬라이드 멈춤
                    onMouseLeave={onRun} // 슬라이드 재개
                    onClick={() => handlePromotionClick(promotion.promotion_number)}
                  />
                </li>
              ))}
            </div>
            <div className={"slide clone".concat(animate ? "" : " stop")}>
              {promotions.map((promotion, i) => (
                <li key={i}>
                  <img
                    src={promotion.poster_url}
                    onMouseEnter={onStop} // 슬라이드 멈춤
                    onMouseLeave={onRun} // 슬라이드 재개
                    onClick={() => handlePromotionClick(promotion.promotion_number)}
                  />
                </li>
              ))}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}

export default MainPublicity;
