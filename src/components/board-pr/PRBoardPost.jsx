import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import "./PRBoardPost.scss";
import { PostTop } from "../board";

export default function PRBoardPost() {
  return (
    <div className="pr-board-post-box">
      <div className="post-header">
        <span className="dot">
          <CircleIcon sx={{ color: "rgba(255, 255, 255, 1)", fontSize: "30px" }} />
        </span>
        <span className="dot">
          <CircleIcon sx={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "30px" }} />
        </span>
        <span className="dot">
          <CircleIcon sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "30px" }} />
        </span>
      </div>
      <div className="post-content-box">
        <PostTop user="user" time="2023-11-01" commentsCnt="3" />
        <img className="post-image" src="https://t-img1.wemep.co.kr/wmp-tproduct/37/202310/25/ccvkyt9dtqor.png" alt="홍보 포스터" />
        <h2 className="post-title">제목</h2>
        <hr />
        <div className="post-content">
          초연, 재공연 전석 매진의 화제작! 국립창극단 [패왕별희] 초대 이벤트 경극과 창극을 엮어낸 최고의 역작! 국립창극단 [패왕별희]의 기대평을 남겨주세요! 추첨을 통해 14분을
          초대합니다. 기간 : 2023/10/20 ~ 2023/10/26 발표 : 2023/10/27 혜택 : 국립창극단 [패왕별희] 초대 14명(1인 2매, 총 28매) 11/15(수) 7명(1인 2매 / 14매), 11/16(목) 7명(1인 2매
          / 14매) 장소 : 국립극장 달오름 * 본 공연은 초등학생 이상 관람 가능합니다. * 공연 시작 1시간 전부터 매표소 초대 창구에서 휴대폰 번호 뒤 4자리와 본인 확인(실물 신분증) 후
          티켓 수령 가능합니다. * 대리수령 또는 양도는 엄격히 금지하고 있습니다.
        </div>
      </div>
    </div>
  );
}
