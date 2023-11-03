import React from "react";
import "./PlayList.scss";
import ConditionSearch from "../../components/play-list/ConditionSearch";
import PlayListHeader from "../../components/play-list/PlayListHeader";
import PlayBox from "../../components/play-list/PlayBox";
import PaginationBox from "../../components/play-list/PaginationBox";
import RegionSelectBar from "../../components/play-list/RegionSelectBar";
import PlayListCalendar from "../../components/play-list/calendar-metrial/PlayListCalendar";
import { useState, useEffect } from "react";

export default function ListMain() {
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [regionAtCalendar, setRegionAtCalendar] = useState("전체");

  const changeSelectedRegion = (e) => {
    setSelectedRegion(e.target.innerText);
  };

  const changeRegionAtCalendar = (e) => {
    setRegionAtCalendar(e.target.innerText);
  };
  // const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);

  // if (isLoading) {
  //   return <div>연극 리스트를 가져오는 중입니다.</div>;
  // }

  return (
    <>
      <div className="play-region-select-big-container">
        <RegionSelectBar
          changeSelectedRegion={changeSelectedRegion}
          selectedRegion={selectedRegion}
        />
      </div>
      <div className="play-list-container">
        {selectedRegion !== "캘린더로 보기" && <ConditionSearch />}
        {selectedRegion === "캘린더로 보기" && (
          <PlayListCalendar
            regionAtCalendar={regionAtCalendar}
            changeRegionAtCalendar={changeRegionAtCalendar}
          />
        )}
        <PlayListHeader count="32" />
        {/* <div className="play-no-exsist">
          <h2>연극이 존재하지 않습니다.</h2>
        </div> */}
        <div className="play-list-main">
          <PlayBox
            playInfo={{
              imgSrc:
                "https://timeticket.co.kr/wys2/file_attach_thumb/2023/03/13/1678681588-23-0_wonbon_N_7_255x357_70_2.jpg",
              title: "진짜 나쁜 소녀",
              place: "JTN아트홀 1관",
              period: "2023.06.07 ~ 2023.12.07",
              price: "13,800",
            }}
          />
          <PlayBox
            playInfo={{
              imgSrc:
                "https://timeticket.co.kr/wys2/file_attach_thumb/2021/05/21/1621549384-67-0_wonbon_N_7_255x357_70_2.jpg",
              title: "옥탑방 고양이",
              place: "틴틴홀",
              period: "2019.08.04 ~ 2023.11.30",
              price: "11,000",
            }}
          />
          <PlayBox
            playInfo={{
              imgSrc:
                "https://timeticket.co.kr/wys2/file_attach_thumb/2023/10/04/1696379359-92-3_wonbon_N_7_255x357_70_2.jpg",
              title: "연애하기 좋은날",
              place: "우리소극장 (구, 예술공간오르다)",
              period: "2023.09.22 ~ 2023.11.05",
              price: "17,000",
            }}
          />
          <PlayBox
            playInfo={{
              imgSrc:
                "https://ticketimage.interpark.com/Play/image/large/23/23010838_p.gif",
              title: "카페 쥬에네스",
              place: "대학로 TOM(티오엠) 2관",
              period: "2023.09.25 ~ 2023.11.26",
              price: "39,600",
            }}
          />
          <PlayBox
            playInfo={{
              imgSrc:
                "https://timeticket.co.kr/wys2/file_attach_thumb/2023/03/13/1678681588-23-0_wonbon_N_7_255x357_70_2.jpg",
              title: "진짜 나쁜 소녀",
              place: "JTN아트홀 1관",
              period: "2023.06.07 ~ 2023.12.07",
              price: "13,800",
            }}
          />
          <PlayBox
            playInfo={{
              imgSrc:
                "https://timeticket.co.kr/wys2/file_attach_thumb/2021/05/21/1621549384-67-0_wonbon_N_7_255x357_70_2.jpg",
              title: "옥탑방 고양이",
              place: "틴틴홀",
              period: "2019.08.04 ~ 2023.11.30",
              price: "11,000",
            }}
          />
          <PlayBox
            playInfo={{
              imgSrc:
                "https://timeticket.co.kr/wys2/file_attach_thumb/2023/10/04/1696379359-92-3_wonbon_N_7_255x357_70_2.jpg",
              title: "연애하기 좋은날",
              place: "우리소극장 (구, 예술공간오르다)",
              period: "2023.09.22 ~ 2023.11.05",
              price: "17,000",
            }}
          />
          {/* <PlayBox
              playInfo={{
                imgSrc:
                  "https://ticketimage.interpark.com/Play/image/large/23/23010838_p.gif",
                title: "카페 쥬에네스",
                place: "대학로 TOM(티오엠) 2관",
                period: "2023.09.25 ~ 2023.11.26",
                price: "39,600",
              }}
            /> */}
          <PlayBox
            playInfo={{
              imgSrc:
                "https://ticketimage.interpark.com/Play/image/large/23/23010838_p.gif",
              title: "카페 쥬에네스",
              place: "대학로 TOM(티오엠) 2관",
              period: "2023.09.25 ~ 2023.11.26",
              price: "39,600",
            }}
          />
        </div>
        <PaginationBox />
      </div>
    </>
  );
}
