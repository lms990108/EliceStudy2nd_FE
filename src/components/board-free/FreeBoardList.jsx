import React from "react";
import "./FreeBoardList.scss";
import { Link } from "react-router-dom";
import { SmsOutlined, ThumbUpOutlined, VisibilityOutlined } from "@mui/icons-material";
import LiveTimeDiff from "../common/time/LiveTimeDiff";
import default_user_img from "../../assets/img/default_user_img.svg";
import numberFormat from "../../utils/numberFormat";
import { DELETE_USER_NICKNAME } from "../../utils/const";

export default function FreeBoardList({ boardList }) {
  return (
    <div className="free-board-list-box">
      {boardList.map((post) => (
        <div className="content-box" key={post._id} id={post.post_number}>
          <div className="flex-box top">
            <div className="user">
              <img className="user-img" src={(post.user?.state === "가입" && post.user?.profile_url) || default_user_img} onError={(e) => (e.target.src = default_user_img)} />
              <span>{(post.user?.state === "가입" && post.user?.nickname) || DELETE_USER_NICKNAME}</span>
            </div>
            <div className="time">
              <LiveTimeDiff time={post.createdAt} />
            </div>
          </div>
          <div>
            <Link className="title" to={`/community/${post.post_number}`}>
              {post.title}
            </Link>
          </div>
          <div className="flex-box bottom">
            {post.tags?.length ? (
              <div className="tags">
                {post.tags.map((tag, idx) => (
                  <div className="tag" key={idx}>
                    <Link to={`/search?query=${tag}&category=커뮤니티&type=tag`}># {tag}</Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="content">{post.content}</div>
            )}
            <div className="flex-box post-card-footer">
              <VisibilityOutlined sx={{ fontSize: 16 }} />
              <span>{numberFormat(post.views || 0)}</span>
              <ThumbUpOutlined sx={{ fontSize: 16 }} />
              <span>{numberFormat(post.likes || 0)}</span>
              <SmsOutlined sx={{ fontSize: 16 }} />
              <span>{numberFormat(post.commentsCount || 0)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
