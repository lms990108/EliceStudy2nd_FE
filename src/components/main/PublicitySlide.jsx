import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./PublicitySlide.scss";

import { Autoplay, Navigation, Pagination } from "swiper/modules";

function PublicitySlide() {
  return (
    <>
      <div className="publicity-slide-title-box">
        <h1 className="publicity-slide-title">
          숨소리까지 들리는 생생함! 소규모 작품
        </h1>
      </div>
      <div className="publicity-slide-container">
        <div className="slide-container">
          <div className="publicity-content">
            <h1>콘텐츠 제목</h1>
            <p>날짜 및 기타 정보</p>
          </div>
          <Swiper
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation, Pagination]}
            className="publicity-Swiper"
          >
            <SwiperSlide>
              <img
                className="Publicity-img"
                src="https://image.toast.com/aaaaab/ticketlink/TKL_1/BigBanner_PC_akmu_%ED%8F%AC%EC%8A%A4%ED%84%B0%EB%B3%80%EA%B2%BD.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="Publicity-img"
                src="https://image.toast.com/aaaaab/ticketlink/TKL_6/BigBanner_PC_%EC%97%90%EC%8A%A4%ED%8C%8C.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="Publicity-img"
                src="https://image.toast.com/aaaaab/ticketlink/TKL_5/BigBanner_pc_%EC%BD%94%EC%9A%94%ED%83%9C%EC%8A%A4%ED%8B%B0%EB%B2%8C.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="Publicity-img"
                src="https://image.toast.com/aaaaab/ticketlink/TKL_8/BigBanner_PC_22%EB%85%842%EA%B0%9C%EC%9B%94.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="Publicity-img"
                src="https://image.toast.com/aaaaab/ticketlink/TKL_5/BigBanner_PC_%EB%8D%94%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%98%A4%EB%B8%8C%EB%A7%88%EC%9D%B4%EB%9D%BC%EC%9D%B4%ED%94%84.png"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="Publicity-img"
                src="https://image.toast.com/aaaaab/ticketlink/TKL_2/BigBanner_PC_%ED%81%AC%EB%A6%AC%EC%8A%A4%ED%86%A0%ED%94%84.jpg"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default PublicitySlide;
