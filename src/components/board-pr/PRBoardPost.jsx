import React, { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import "./PRBoardPost.scss";
import { PostTop } from "../board";
import empty_image from "../../assets/img/empty_img.svg";
import { CalendarMonth, FormatQuote, LocationOn, MovieCreation } from "@mui/icons-material";
import empty_img from "../../assets/img/empty_img.svg";

export default function PRBoardPost({ data, totalCommentCount }) {
  return (
    <div className="pr-board-post">
      <PostTop user={data.user_id || { nickname: "user" }} type={"promotion"} post={data} totalCommentCount={totalCommentCount} />
      <div className="top-container">
        <img className="main-img" src={data.image_url[0]} onError={(e) => (e.target.src = empty_image)} alt="홍보 포스터" />
        <div className="flex-column">
          <div className="box">
            <div className="lable">타이틀</div>
            <div className="value">{data.play_title}</div>
            <FormatQuote className="icon double" />
          </div>
          <div className="box">
            <div className="lable">공연기간</div>
            <div className="value">{data.start_date}</div>
            <CalendarMonth className="icon" />
          </div>
        </div>
        <div className="flex-column">
          <div className="box">
            <div className="lable">장소</div>
            <div className="value">{data.location}</div>
            <LocationOn className="icon" />
          </div>
          <div className="box">
            <div className="lable">주최</div>
            <div className="value">{data.host}</div>
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
              # {tag}
            </div>
          ))}
        </div>
      )}
      {data.image_url.length > 1 && (
        <div className="images">
          {data.image_url.slice(1).map((url) => (
            <img src={url} key={url} onError={(e) => (e.target.src = empty_img)} />
          ))}
        </div>
      )}
    </div>
  );
}
