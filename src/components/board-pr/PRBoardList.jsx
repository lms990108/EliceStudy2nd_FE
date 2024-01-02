import React, { useContext, useEffect, useState } from "react";
import "./PRBoardList.scss";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import { Link, useNavigate } from "react-router-dom";
import { PRContext } from "../../pages";

export default function PRBoardList({ newList }) {
  const [boardListLeft, setBoardListLeft] = useState([]);
  const [boardListRight, setBoardListRight] = useState([]);
  const boardList = useContext(PRContext);
  const nav = useNavigate();
  console.log(boardList);

  const handleClick = (e) => {
    const postEl = e.target.closest(".content-box");
    const post = boardList.filter((post) => parseInt(post._id) === parseInt(postEl.id));
    console.log(post);
    nav(postEl.id, { state: { post: post[0] } });
  };

  useEffect(() => {
    const left = document.querySelectorAll(".left > *");
    const right = document.querySelectorAll(".right > *");

    let suml = 0;
    let sumr = 0;
    let lastl = "";
    let lastr = "";

    left.forEach((cur, idx) => {
      suml += cur.clientHeight;
      if (idx === left.length - 1) lastl = cur.clientHeight;
    });

    right.forEach((cur, idx) => {
      sumr += cur.clientHeight;
      if (idx === right.length - 1) lastr = cur.clientHeight;
    });

    if (suml > sumr && suml - lastl > sumr) {
      setBoardListRight((cur) => [...cur, boardListLeft[boardListLeft.length - 1]]);
      setBoardListLeft((cur) => [...cur.slice(0, cur.length - 1)]);
    } else if (sumr - lastl > suml) {
      setBoardListLeft((cur) => [...cur, boardListRight[boardListRight.length - 1]]);
      setBoardListRight((cur) => [...cur.slice(0, cur.length - 1)]);
    }
  }, [boardListLeft, boardListRight]);

  useEffect(() => {
    console.log("newlist update");
    setBoardListLeft((cur) => [...cur, ...newList.filter((b, idx) => idx % 2 == 0)]);
    setBoardListRight((cur) => [...cur, ...newList.filter((b, idx) => idx % 2 == 1)]);
  }, [boardList, newList]);

  const content = (post) => (
    <Link className={`content-box pointer`} key={post._id} id={post._id} to={`${post.promotion_number}`}>
      <img src={post.poster_url} alt="" />
      <div className="post-content-box">
        <div className="flex-box">
          <div className="title">{post.title}</div>
          <div className="flex-box comments">
            <SmsOutlinedIcon sx={{ fontSize: 20 }} />
            <span>{post.comments?.length || 0}</span>
          </div>
        </div>
        {post.tags && post.tags.length !== 0 && (
          <div className="tags">
            {post.tags.map((tag) => (
              <div># {tag}</div>
            ))}
          </div>
        )}
        <div className="content">{post.content}</div>
      </div>
    </Link>
  );

  return (
    <div className="pr-board-list-box">
      <div className="left">{boardListLeft.map((post, idx) => content(post, idx))}</div>
      <div className="right">{boardListRight.map((post, idx) => content(post, idx))}</div>
    </div>
  );
}
