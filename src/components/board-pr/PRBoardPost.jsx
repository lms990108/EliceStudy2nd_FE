import React, { useEffect, useState } from "react";
import "./PRBoardPost.scss";
import { PostTop } from "../board";
import empty_image from "../../assets/img/empty_img.svg";
import { CalendarMonth, FormatQuote, LocationOn, MovieCreation } from "@mui/icons-material";
import empty_img from "../../assets/img/empty_img.svg";
import TimeFormat from "../common/time/TimeFormat";
import { Link } from "react-router-dom";
import { Backdrop } from "@mui/material";

export default function PRBoardPost({ data, totalCommentCount }) {
  const [openMainImg, setOpenMainImg] = useState(false);
  return (
    <div className="pr-board-post">
      <PostTop user={data.user_id || { nickname: "user" }} type={"promotion"} post={data} totalCommentCount={totalCommentCount} />
      <div className="top-container">
        <img className="main-img" src={data.image_url[0] || empty_image} onError={(e) => (e.target.src = empty_image)} alt="홍보 포스터" onClick={() => setOpenMainImg(true)} />
        <div className="flex-column">
          <div className="box">
            <div className="lable">타이틀</div>
            <div className="value">{data.play_title}</div>
            <FormatQuote className="icon double" />
          </div>
          <div className="box">
            <div className="lable">{data.category === "연극" ? "공연기간" : "행사기간"}</div>
            <div className="value">
              {data.start_date && <TimeFormat time={data.start_date} />} ~ {data.end_date && <TimeFormat time={data.end_date} />}
            </div>
            <CalendarMonth className="icon" />
          </div>
        </div>
        <div className="flex-column">
          <div className="box">
            <div className="lable">장소</div>
            <div className="value">{data.location || <span className="undefined">본문참고</span>}</div>
            <LocationOn className="icon" />
          </div>
          <div className="box add">
            <div className="lable">추가정보</div>
            {data.category === "연극" && (
              <div className="value">
                <span className="sub-lable">러닝타임</span>
                {data.runtime ? `${data.runtime}분` : <span className="undefined">본문참고</span>}
              </div>
            )}
            <div className={`value ${data.category === "연극" && "mg-6"}`}>
              <span className="sub-lable">주최</span>
              {data.host || <span className="undefined">본문참고</span>}
            </div>

            <MovieCreation className="icon" />
          </div>
        </div>
      </div>

      <h2 className="title">{data.title}</h2>
      <div className="content">
        {data.content?.split("\n").map((text) => (
          <p>{text || " "}</p>
        ))}
      </div>
      {data.tags && data.tags.length !== 0 && (
        <div className="tags">
          {data.tags.map((tag, idx) => (
            <div className="tag" key={idx}>
              <Link to={`/search?query=${tag}&category=홍보게시판&type=tag`}># {tag}</Link>
            </div>
          ))}
        </div>
      )}
      {data.image_url.length && (
        <div className="images">
          {data.image_url.map((url) => (
            <img src={url} key={url} onError={(e) => (e.target.src = empty_img)} />
          ))}
        </div>
      )}
      <Backdrop open={openMainImg} onClick={() => setOpenMainImg(false)}>
        <img className="zoom" src={data.image_url[0]} />
      </Backdrop>
    </div>
  );
}
