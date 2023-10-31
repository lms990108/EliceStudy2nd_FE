import React from "react";
import "./PlayDetail.scss";
import Header from "../../components/common/header/Header";
import Footer from "../../components/common/footer/Footer";
import PlayDetailTop from "../../components/play-detail/PlayDetailTop";
import PlayDetailNav from "../../components/play-detail/PlayDetailNav";
import PlayInfo from "../../components/play-detail/PlayInfo";
import PlayReview from "../../components/play-detail/PlayReview";
import PlayLocation from "../../components/play-detail/PlayLocation";

export default function PlayDetail() {
  return (
    <>
      <Header />
      <div className="container">
        {/* <PlayDetailTop />
        <PlayDetailNav />
        <PlayInfo />
        <PlayReview />
        <PlayLocation /> */}
      </div>
      <Footer />
    </>
  );
}
