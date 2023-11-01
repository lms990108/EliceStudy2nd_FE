import React from "react";
import "./PRBoardList.scss";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";

export default function PRBoardList({ boardList }) {
  const content = (post) => (
    <div className="content-box">
      <img src={post.img} alt="" />
      <div className="post-content-box">
        <div className="flex-box">
          <div className="title">{post.title}</div>
          <div className="flex-box comments">
            <SmsOutlinedIcon sx={{ fontSize: 20 }} />
            <span>{post.coments}</span>
          </div>
        </div>
        <div className="tags">
          <div># 서울</div>
          <div># 소규모</div>
          <div># 동아리-연극</div>
          <div># 동아리-연극</div>
          <div># 연극</div>
          <div># 동아리-연극</div>
          <div># 동아리-연극</div>
          <div># 동아리-연극</div>
          <div># 동아리-연극</div>
          <div># 동아리-연극</div>
          <div># 동아리-연극</div>
        </div>
        <div className="content">{post.content}</div>
      </div>
    </div>
  );
  return (
    <div className="pr-board-list-box">
      <div className="left">{boardList.slice(0, 5).map((post) => content(post))}</div>
      <div className="right">{boardList.slice(5).map((post) => content(post))}</div>
    </div>
  );
}
