import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./FreeBoardList.scss";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { SmsOutlined, ThumbUpOutlined, VisibilityOutlined } from "@mui/icons-material";

export default function FreeBoardList({ boardList }) {
  const [posts, setPosts] = useState([]);
  const nav = useNavigate();

  const handleClick = (e) => {
    const postId = e.currentTarget.id;
    console.log(postId);
    nav(`/community/${postId}`);
  };

  useEffect(() => {
    setPosts(boardList);
  });

  return (
    <div className="free-board-list-box">
      {boardList.map((post) => (
        <Link className="content-box pointer" key={post._id} id={post.post_number} to={`/community/${post.post_number}`}>
          <div className="flex-box top">
            <div className="user">
              {post.user_id ? <img className="user-img" src={post.user_id.profile_url} /> : <AccountCircleIcon sx={{ fontSize: 24 }} />}
              <span>{post.user_id?.nickname || "nickname"}</span>
            </div>
            <div className="time">{format(new Date(post.createdAt), "yyyy-MM-dd")}</div>
          </div>
          <div>
            <div className="title">{post.title}</div>
          </div>
          <div className="flex-box bottom">
            {post.tags?.length ? (
              <div className="tags">
                {post.tags.map((tag, idx) => (
                  <div key={idx}># {tag}</div>
                ))}
              </div>
            ) : (
              <div className="content">{post.content}</div>
            )}
            <div className="flex-box post-card-footer">
              <VisibilityOutlined sx={{ fontSize: 16 }} />
              <span>{post.views || 0}</span>
              <ThumbUpOutlined sx={{ fontSize: 16 }} />
              <span>{post.likes || 0}</span>
              <SmsOutlined sx={{ fontSize: 16 }} />
              <span>{post.commentsCount || 0}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
