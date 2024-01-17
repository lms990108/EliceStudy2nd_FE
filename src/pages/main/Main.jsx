import React from "react";
import "./Main.scss";
import MainBanner from "../../components/main/MainBanner";
import MainBest from "../../components/main/MainBest";
import MainPreferredRegion from "../../components/main/MainPreferredRegion";
import MainRating from "../../components/main/MainRating";
import MainChild from "../../components/main/MainChild";
import MainPublicity from "../../components/main/MainPublicity";
import MainReview from "../../components/main/MainReview";
import MainTheater from "../../components/main/MainTheater";
import { UpButton } from "../../components/common/button/UpButton";
import useCheckLogin from "../../hooks/authoriaztionHooks/useCheckLogin";

//Main
const Main = () => {
  useCheckLogin();
  return (
    <div className="main-container">
      <div
        className="banner-container"
        style={{
          backgroundImage: `url('/block.jpeg'`,
        }}
      >
        <MainBanner />
      </div>
      <div className="best-container">
        <MainBest />
      </div>
      <div className="publicity-container">
        <MainPublicity />
      </div>
      <div className="preferred-region-container">
        <MainPreferredRegion />
      </div>
      <div className="review-container">
        <MainReview />
      </div>
      <div className="rating-container">
        <MainRating />
      </div>
      <div className="theater-container">
        <MainTheater />
      </div>
      <div className="child-container">
        <MainChild />
      </div>
      <UpButton />
    </div>
  );
};

export default Main;
