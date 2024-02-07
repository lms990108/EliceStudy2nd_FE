import React, { useState } from "react";
import "./PRBoardList.scss";
import { Link } from "react-router-dom";
import { SmsOutlined, SwapVert, ThumbUpOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom/dist";
import empty_img from "../../assets/img/empty_img.svg";

export default function PRBoardList({ newList }) {
  const [selected, setSelected] = useState("all");
  const [sort, setSort] = useState("최신순");

  const nav = useNavigate();

  const handleClickDivision = (e) => {
    setSelected(e.target.id);
  };

  const handleFormBtn = () => {
    nav("/promotion/write");
  };

  return (
    <div className="pr-board-list-box">
      <div className="header flex-box">
        <div className="division flex-box">
          <div id="all" className={selected === "all" ? "selected" : ""} onClick={handleClickDivision}>
            전체보기
          </div>
          <div id="in-progress" className={selected === "in-progress" ? "selected" : ""} onClick={handleClickDivision}>
            진행중인 연극
          </div>
          <div id="done" className={selected === "done" ? "selected" : ""} onClick={handleClickDivision}>
            종료된 연극
          </div>
        </div>
        <div className="buttons">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select value={sort} onChange={(e) => setSort(e.target.value)} displayEmpty>
              <MenuItem value="최신순">최신순</MenuItem>
              <MenuItem value="추천순">추천순</MenuItem>
              <MenuItem value="조회순">조회순</MenuItem>
              <MenuItem value="오래된순">오래된순</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleFormBtn} variant="contained" size="small" color="secondary" disableElevation>
            작성하기
          </Button>
        </div>
      </div>
      <div className="body">
        {newList.map((post) => (
          <Link className={`post-card pointer`} key={post._id} id={post._id} to={`${post.promotion_number}`}>
            <img src={Array.isArray(post.image_url) ? post.image_url[0] : ""} onError={(e) => (e.target.src = empty_img)} alt="" />
            <div className="post-card-content">
              <div className={`title ${post.tags?.length ? "" : "tl-2"}`}>{post.title}</div>
              <div className="date">
                {post.start_date?.split("T")[0] || "2024-02-01"} ~ {post.end_date?.split("T")[0] || "2024-02-01"}
              </div>
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
