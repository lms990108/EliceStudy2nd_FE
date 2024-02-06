import React, { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import "./PRBoardPost.scss";
import { PostTop } from "../board";
import { CalendarMonth, FormatQuote, LocationOn, MovieCreation } from "@mui/icons-material";

export default function PRBoardPost({ data, totalCommentCount }) {
  return (
    <div className="pr-board-post">
      <div className="top-container">
        <img className="main-img" src={data.image_url} alt="홍보 포스터" />
        <div className="flex-column">
          <div className="box">
            <div className="lable">타이틀</div>
            <div className="value">{data.title}</div>
            <FormatQuote className="icon double" />
          </div>
          <div className="box">
            <div className="lable">공연기간</div>
            <div className="value">{data.createdAt}</div>
            <CalendarMonth className="icon" />
          </div>
        </div>
        <div className="flex-column">
          <div className="box">
            <div className="lable">장소</div>
            <div className="value">뜻밖의 극장</div>
            <LocationOn className="icon" />
          </div>
          <div className="box">
            <div className="lable">주최</div>
            <div className="value">Yoonhogirl's Club</div>
            <MovieCreation className="icon" />
          </div>
        </div>
      </div>

      <PostTop user={data.user_id || { nickname: "asd" }} type={"promotion"} createdAt={data.createdAt} commentsCnt={totalCommentCount || 0} postNumber={data.promotion_number} />
      <h2 className="title">{data.title}</h2>
      <div className="content">
        {data.content?.split("\n").map((text) => (
          <p>{text || " "}</p>
        ))}
      </div>
      {data.tags && data.tags.length !== 0 && (
        <div className="tags">
          {data.tags.map((tag, idx) => (
            <div key={idx}># {tag}</div>
          ))}
        </div>
      )}
    </div>
  );
}
