import React, { useState } from "react";
import "./PRBoardList.scss";
import { Link } from "react-router-dom";
import { SmsOutlined, SwapVert, ThumbUpOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function PRBoardList({ newList }) {
  const [selected, setSelected] = useState("all");

  const handleClickDivision = (e) => {
    setSelected(e.target.id);
  };

  return (
    <div className="pr-board-list-box">
      <div className="header flex-box">
        <div className="division flex-box">
          <div id="all" className={selected === "all" && "selected"} onClick={handleClickDivision}>
            전체보기
          </div>
          <div id="in-progress" className={selected === "in-progress" && "selected"} onClick={handleClickDivision}>
            진행중인 연극
          </div>
          <div id="done" className={selected === "done" && "selected"} onClick={handleClickDivision}>
            종료된 연극
          </div>
        </div>
        <div className="buttons">
          <Button variant="outlined" size="small" color="darkGray" startIcon={<SwapVert />}>
            최신순
          </Button>
          <Button variant="contained" size="small" color="secondary" disableElevation>
            작성하기
          </Button>
        </div>
      </div>
      <div className="body">
        {newList.map((post) => (
          <Link className={`post-card pointer`} key={post._id} id={post._id} to={`${post.promotion_number}`}>
            <img src={post.image_url} alt="" />
            <div className="post-card-content">
              <div className="title">{post.title}</div>
              {post.start_date && post.end_date && (
                <div className="date">
                  {post.start_date.split("T")[0]} ~ {post.end_date.split("T")[0]}
                </div>
              )}
              {post.tags && post.tags.length !== 0 && (
                <div className="tags">
                  {post.tags.map((tag, idx) => (
                    <div key={idx}># {tag}</div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-box post-card-footer">
              <VisibilityOutlined sx={{ fontSize: 16 }} />
              <span>{post.views || 0}</span>
              <ThumbUpOutlined sx={{ fontSize: 16 }} />
              <span>{post.likes || 0}</span>
              <SmsOutlined sx={{ fontSize: 16 }} />
              <span>{post.comments || 0}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
