import React from "react";
import "./MainChild.scss";
import MainPlayBox from "./MainPlayBox";

function MainChild() {
  return (
    <div>
      <div>
        <h1>아이👶와 함께 즐기는 문화생활</h1>
      </div>
      <div className="main-child-container">
        <MainPlayBox
          playInfo={{
            imgSrc:
              "https://timeticket.co.kr/wys2/file_attach_thumb/2023/08/09/1691560992-58-3_wonbon_N_7_255x357_70_2.jpg",
            title: "아기돼지 삼형제",
            place: "JTN아트홀 1관",
            period: "2023.06.07 ~ 2023.12.07",
            price: "13,800",
          }}
        />
        <MainPlayBox
          playInfo={{
            imgSrc:
              "https://timeticket.co.kr/wys2/file_attach_thumb/2023/11/01/1698807614-36-3_wonbon_N_7_255x357_70_2.jpg",
            title: "산타와 빈양말",
            place: "틴틴홀",
            period: "2019.08.04 ~ 2023.11.30",
            price: "11,000",
          }}
        />
        <MainPlayBox
          playInfo={{
            imgSrc:
              "https://timeticket.co.kr/wys2/file_attach_thumb/2020/04/23/1587607324-70-0_wonbon_N_7_255x357_70_2.jpg",
            title: "반짝반짝 라푼젤",
            place: "우리소극장 (구, 예술공간오르다)",
            period: "2023.09.22 ~ 2023.11.05",
            price: "17,000",
          }}
        />
        <MainPlayBox
          playInfo={{
            imgSrc:
              "https://timeticket.co.kr/wys2/file_attach_thumb/2023/10/23/1698026224-38-3_wonbon_N_7_255x357_70_2.jpg",
            title: "루돌프의 크리스마스 선물",
            place: "대학로 TOM(티오엠) 2관",
            period: "2023.09.25 ~ 2023.11.26",
            price: "39,600",
          }}
        />
        <MainPlayBox
          playInfo={{
            imgSrc:
              "https://timeticket.co.kr/wys2/file_attach_thumb/2023/10/26/1698308060-15-3_wonbon_N_7_255x357_70_2.jpg",
            title: "진짜 나쁜 소녀",
            place: "JTN아트홀 1관",
            period: "2023.06.07 ~ 2023.12.07",
            price: "13,800",
          }}
        />
      </div>
    </div>
  );
}

export default MainChild;