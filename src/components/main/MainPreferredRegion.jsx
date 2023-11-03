import React from "react";
import "./MainPreferredRegion.scss";
import MainPlayBox from "./MainPlayBox";

function MainPreferredRegion() {
  return (
    <div>
      <div>
        <h1>지금 제주에서 상영중인 작품</h1>
      </div>
      <div className="main-region-container">
        <MainPlayBox
          playInfo={{
            imgSrc:
              "https://timeticket.co.kr/wys2/file_attach_thumb/2023/09/27/1695775222-54-3_wonbon_N_7_255x357_70_2.jpg",
            title: "썸데이",
            place: "JTN아트홀 1관",
            period: "2023.06.07 ~ 2023.12.07",
            price: "13,800",
          }}
        />
        <MainPlayBox
          playInfo={{
            imgSrc:
              "https://timeticket.co.kr/wys2/file_attach_thumb/2021/05/21/1621549384-67-0_wonbon_N_7_255x357_70_2.jpg",
            title: "옥탑방 고양이",
            place: "틴틴홀",
            period: "2019.08.04 ~ 2023.11.30",
            price: "11,000",
          }}
        />
        <MainPlayBox
          playInfo={{
            imgSrc:
              "https://timeticket.co.kr/wys2/file_attach_thumb/2023/10/04/1696379359-92-3_wonbon_N_7_255x357_70_2.jpg",
            title: "연애하기 좋은날",
            place: "우리소극장 (구, 예술공간오르다)",
            period: "2023.09.22 ~ 2023.11.05",
            price: "17,000",
          }}
        />
        <MainPlayBox
          playInfo={{
            imgSrc:
              "https://ticketimage.interpark.com/Play/image/large/23/23010838_p.gif",
            title: "카페 쥬에네스",
            place: "대학로 TOM(티오엠) 2관",
            period: "2023.09.25 ~ 2023.11.26",
            price: "39,600",
          }}
        />
        <MainPlayBox
          playInfo={{
            imgSrc:
              "https://timeticket.co.kr/wys2/file_attach_thumb/2023/03/13/1678681588-23-0_wonbon_N_7_255x357_70_2.jpg",
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

export default MainPreferredRegion;
