import React from "react";
import "./PlayDetailInfo.scss";

export default function PlayInfo() {
  return (
    <div className="play-detail-info">
      <div className="play-time-info">
        <h3>공연 시간 정보</h3>
        <p>
          2023년 08월 26일(토) ~ 2023년 11월 26일(일) 화, 목, 금 19시 30분 / 수
        </p>
        <p>15시, 19시 30분 / 주말 및 공휴일 14시, 18시 30분</p>
      </div>
      <div className="seat-info">
        <h3>좌석 정보</h3>
        <p>R석 - 100석</p>
        <p>S석 - 100석</p>
      </div>
      <div className="summary">
        <h3>줄거리</h3>
        <p>
          전근이 잦은 아버지의 직장 때문에 친구도 없이 전학을 다녀야 했던 정우는
          한적한 시골 마을에 전학을 오게 된다. 정우는 다시 전학을 가게 될
          것이라는 사실을 알게 된 후 관심 없던 아영에게 고백을 하고, 덕원을
          괴롭히던 일진에게도 결투를 신청한다. 집으로 돌아온 정우는 자신의 생일
          선물로 전학을 취소했다는 사실을 듣게 되는데... 앞으로 정우의 학교
          생활은 어떻게 될까?
        </p>
      </div>
      <div className="crew-box">
        <div>
          <li>출연진</li>
          <p>X 블랙 - 김찬호, 조형균, 김준영</p>
          <p>X 화이트 - 정동화, 박규원, 백인태</p>
          <p>에덴 아담스 - 여은, 이지연, 이재림</p>
          <p>세르판 리 - 이효정, 김명지</p>
          <p>가디언 - 김정민, 송상섭, 조은성</p>
        </div>
        <div>
          <li>제작진</li>
          <p>극작 - 이지나, 우찬</p>
          <p>작곡 - WOODY PAK, 신은경</p>
          <p>작사 - 이지나, 우찬, WOODY PAK</p>
          <p>연출 - 오루피나</p>
          <p>음악감독 - 신은경</p>
          <p>안무 - 채현원</p>
          <p>무대디자인 - EMOTIONAL THEATRE</p>
          <p>조명 수퍼바이저 - 원유섭</p>
        </div>
        <div>
          <li>제작사</li>
          <p>(주) 알앤디웍스</p>
        </div>
      </div>
      <div className="detail-poster">
        <h3>소개 포스터</h3>
        <div className="detail-poster-img">
          <img
            src="https://t-img1.wemep.co.kr/wmp-tproduct/02/202310/05/h53v8przsdec.jpg"
            alt="굿닥터 소개 포스터"
          />
          <img
            src="https://t-img1.wemep.co.kr/wmp-tproduct/02/202310/05/qqlw7m6s62zg.jpg"
            alt="굿닥터 소개 포스터"
          />
        </div>
      </div>
    </div>
  );
}
