import React from "react";
import "./Main.scss";
import MainBanner from "../../components/main/MainBanner";
import MainBest from "../../components/main/MainBest";
import MainPreferredRegion from "../../components/main/MainPreferredRegion";
import MainRating from "../../components/main/MainRating";
import MainChild from "../../components/main/MainChild";
import MainPublicity from "../../components/main/MainPublicity";
import MainReview from "../../components/main/MainReview";

//Main
const Main = () => {
  return (
    <div className="main-container">
      <div className="banner-container">
        <MainBanner />
      </div>
      <div className="best-container">
        <MainBest />
      </div>
      <div className="preferred-region-container">
        <MainPreferredRegion />
      </div>
      <div className="publicity-container">
        <MainPublicity />
      </div>
      <div className="rating-container">
        <MainRating />
      </div>
      <div className="review-container">
        <MainReview />
      </div>
      <div className="child-container">
        <MainChild />
      </div>
    </div>
  );
};

export default Main;
