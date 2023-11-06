import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import "./FreeBoardList.scss";
import { useNavigate } from "react-router-dom";

export default function FreeBoardList({ boardList }) {
  const [posts, setPosts] = useState([]);
  const nav = useNavigate();

  const handleClick = (e) => {
    const postEl = e.target.closest(".content-box");
    const post = posts.filter((post) => parseInt(post._id) === parseInt(postEl.id));
    console.log(post);
    nav(postEl.id, { state: { post: post[0] } });
  };

  useEffect(() => {
    setPosts(boardList);
  });

  return (
    <div className="free-board-list-box">
      {boardList.map((post) => (
        <div className="content-box pointer" key={post._id} id={post._id} onClick={handleClick}>
          <div className="flex-box top">
            <div className="user">
              <AccountCircleIcon sx={{ fontSize: 24 }} />
              <span>{post.user}</span>
            </div>
            <div className="time">{post.time}</div>
          </div>
          <div>
            <div className="title">{post.title}</div>
          </div>
          <div className="flex-box bottom">
            <div className="content">{post.content}</div>
            <div className="comments">
              <SmsOutlinedIcon sx={{ fontSize: 16 }} />
              <span>{post.comments}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
