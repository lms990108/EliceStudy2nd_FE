import React from "react";
import "./MainBest.scss";
import MainPlayBox from "./MainPlayBox";

function MainBest() {
  return (
    <div>
      <div>
        <h1>보도 또 봐도👀 좋은 베스트 작품</h1>
      </div>
      <div className="main-best-container">
        <MainPlayBox
          playInfo={{
            imgSrc:
              "https://timeticket.co.kr/wys2/file_attach_thumb/2021/05/21/1621556311-33-0_wonbon_N_7_255x357_70_2.jpg",
            title: "연극라면",
            place: "JTN아트홀 1관",
            period: "2023.06.07 ~ 2023.12.07",
            price: "13,800",
          }}
        />
        <MainPlayBox
          playInfo={{
            imgSrc:
              "https://timeticket.co.kr/wys2/file_attach_thumb/2023/06/29/1688013809-59-0_wonbon_N_7_255x357_70_2.jpg",
            title: "죽여주는 이야기",
            place: "틴틴홀",
            period: "2019.08.04 ~ 2023.11.30",
            price: "11,000",
          }}
        />
        <MainPlayBox
          playInfo={{
            imgSrc:
              "https://timeticket.co.kr/wys2/file_attach_thumb/2022/11/08/1667872064-93-0_wonbon_N_7_255x357_70_2.jpg",
            title: "김종욱 찾기",
            place: "우리소극장 (구, 예술공간오르다)",
            period: "2023.09.22 ~ 2023.11.05",
            price: "17,000",
          }}
        />
        <MainPlayBox
          playInfo={{
            imgSrc:
              "https://timeticket.co.kr/wys2/file_attach_thumb/2022/08/22/1661128534-1-0_wonbon_N_7_255x357_70_2.jpg",
            title: "운빨로멘스",
            place: "대학로 TOM(티오엠) 2관",
            period: "2023.09.25 ~ 2023.11.26",
            price: "39,600",
          }}
        />
        <MainPlayBox
          playInfo={{
            imgSrc:
              "https://timeticket.co.kr/wys2/file_attach_thumb/2021/05/21/1621557313-62-0_wonbon_N_7_255x357_70_2.jpg",
            title: "오 마이 갓",
            place: "JTN아트홀 1관",
            period: "2023.06.07 ~ 2023.12.07",
            price: "13,800",
          }}
        />
      </div>
    </div>
  );
}

export default MainBest;
