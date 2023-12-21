import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import "./FreeBoardList.scss";
import { Link, useNavigate } from "react-router-dom";

export default function FreeBoardList({ boardList }) {
  const [posts, setPosts] = useState([]);
  const nav = useNavigate();

  const handleClick = (e) => {
    const postId = e.currentTarget.id;
    console.log(postId);
    nav(postId);
  };

  useEffect(() => {
    setPosts(boardList);
  });

  return (
    <div className="free-board-list-box">
      {boardList.map((post) => (
        <Link className="content-box pointer" key={post._id} id={post.post_number} to={`${post.post_number}`}>
          <div className="flex-box top">
            <div className="user">
              {post.user_id ? <img className="user-img" src={post.user_id.profile_url} /> : <AccountCircleIcon sx={{ fontSize: 24 }} />}
              <span>{post.user_id?.nickname || "test nickname"}</span>
            </div>
            <div className="time">{post.createdAt}</div>
          </div>
          <div>
            <div className="title">{post.title}</div>
          </div>
          <div className="flex-box bottom">
            <div className="content">{post.content}</div>
            <div className="comments">
              <SmsOutlinedIcon sx={{ fontSize: 16 }} />
              <span>{post.comments.length}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
