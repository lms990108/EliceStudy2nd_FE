import React from "react";
import "./MainPlayBox.scss"

function MainPlayBox({ playInfo }) {
  const { imgSrc, title, period} = playInfo;
  return (
    <div className="main-play-container">
      <div className="main-play-box">
        <div className="main-play-img-box">
          <img src={imgSrc} />
        </div>
        <div className="main-play-title">{title}</div>
        <div className="main-play-period">{period}</div>
      </div>
    </div>
  );
}

export default MainPlayBox;