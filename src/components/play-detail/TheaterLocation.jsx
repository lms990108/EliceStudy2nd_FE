import React, { useEffect } from "react";
import "./TheaterLocation.scss";

export default function TheaterLoction({ theaterLocation, locationName }) {
  const { lat, lng } = theaterLocation;

  useEffect(() => {
    // 지도를 표시할 div
    const container = document.getElementById("map");
    const options = {
      // 지도의 중심좌표
      center: new kakao.maps.LatLng(lat, lng),
      // 지도의 확대 레벨
      level: 3,
    };
    // 지도를 표시할 div와  지도 옵션으로 지도를 생성합니다
    const map = new kakao.maps.Map(container, options);

    // 마커 표시하기
    const markerPosition = new kakao.maps.LatLng(lat, lng);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    const iwContent = `<div style="padding: 5px; display: flex; flex-direction: column; height: 120px;">🚩 ${locationName}<a href="https://map.kakao.com/link/map/${locationName},${lat},${lng}" style="color: blue;" target="_blank">🗺️ 큰지도보기</a><a href="https://map.kakao.com/link/to/${locationName},${lat},${lng}" style="color: blue;" target="_blank">🚕 길찾기</a></div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwPosition = new kakao.maps.LatLng(lat, lng); //인포윈도우 표시 위치입니다

    // 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });

    // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
    infowindow.open(map);
  }, []);

  return (
    <div className="kakao-map-container">
      <h3>극장 위치</h3>
      <div id="map" className="kakao-map"></div>
    </div>
  );
}
