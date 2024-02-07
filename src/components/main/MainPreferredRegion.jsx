import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPreferredRegion.scss";
import { AppContext } from "../../App";

function MainPreferredRegion() {
  const { userData } = useContext(AppContext);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [shows, setShows] = useState([]); // API로부터 가져온 공연 데이터를 저장할 상태
  const navigate = useNavigate();

  useEffect(() => {
    // userData가 있고 interested_area가 존재할 때 해당 지역으로 선택
    if (userData && userData.user.interested_area) {
      setSelectedRegion(userData.user.interested_area);
    } else {
      setSelectedRegion("서울"); // 로그인을 안했을 시 "서울" 설정
    }
  }, [userData]);

  const handleShowClick = (showId) => {
    navigate(`/play/${showId}`);
  };

  // 지역 버튼 클릭 핸들러
  const handleRegionClick = (region) => {
    setSelectedRegion(region);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();
        
        let queryString;
        if (selectedRegion === "경기/인천") {
          queryString = `region=${encodeURIComponent(selectedRegion)}`;
        } else {
          let encodedRegions = selectedRegion.split("/").map(region => encodeURIComponent(region)); // 지역 값을 배열로 변환하고 URL 인코딩합니다.
          queryString = encodedRegions.map(region => `region=${region}`).join("&");
        }

        const response = await fetch(`https://dailytopia2.shop/api/shows?${queryString}`);
        if (!response.ok) {
          throw new Error('데이터를 가져오는데 문제가 발생했습니다.');
        }
        const data = await response.json();
        if (data.shows) {
          // 시작일 기준으로 가장 가까운 공연부터 정렬
          const sortedShows = data.shows.sort((a, b) => Math.abs(new Date(a.start_date) - today) - Math.abs(new Date(b.start_date) - today));
          setShows(sortedShows.slice(0, 5));
          console.log(data);
        } else {
          console.error('API에서 shows 데이터를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [selectedRegion]);

  const formatTitle = (title) => {
    return title.length > 11 ? title.slice(0, 11) : title;
  };

  const regionArray = [
    "서울",
    "경기/인천",
    "강원",
    "대전/충청",
    "광주/전라",
    "대구/경상",
    "부산/울산",
    "제주",
  ];

  return (
    <div className="main-layout-container">
      <div className="main-title-box">
        <p className="main-title">지역별 신작</p>
      </div>
      <div className="region-list-container">
        <ul className="region-list-box">
          {regionArray.map((region) => (
            <li key={region}>
              <div
                className={`region-list ${
                  selectedRegion === region ? "selected" : ""
                }`}
                onClick={() => handleRegionClick(region)}
              >
                {region}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="main-region-play-container">
        <div className="main-region-container">
          {shows.map((show, index) => (
            <div
              key={index}
              className="main-play-box"
              onClick={() => handleShowClick(show.showId)}
            >
              <div className="main-region-play-img-box">
                <img src={show.poster} alt={show.title} />
              </div>
              <p className="main-region-play-title">{formatTitle(show.title)}</p>
              <p className="main-region-play-period">{`${new Date(
                show.start_date
              ).toLocaleDateString()} Open`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPreferredRegion;