import React from "react";
import "./MainTheater.scss";

function MainTheater() {
  return (
    <div className="main-theater-container">
      <div className="main-theater-header">
        <h1>공연장</h1>
        <div className="theater-list-container">
          <ul className="theater-list-box">
            <li className="theater-list"><div>국립극장</div></li>
            <li className="theater-list"><div>아르코예술극장</div></li>
            <li className="theater-list"><div>대학로예술극장</div></li>
            <li className="theater-list"><div>명동예술극장</div></li>
          </ul>
        </div>
      </div>
      <div className="main-theater-body">

      </div>
    </div>
  );
}

export default MainTheater;
