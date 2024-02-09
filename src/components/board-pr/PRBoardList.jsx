import "./PRBoardList.scss";
import { Link } from "react-router-dom";
import { SmsOutlined, ThumbUpOutlined, VisibilityOutlined } from "@mui/icons-material";
import empty_img from "../../assets/img/empty_img.svg";

export default function PRBoardList({ newList }) {
  return (
    <div className="pr-board-list-box">
      {newList.map((post) => (
        <Link className={`post-card pointer`} key={post._id} id={post._id} to={`${post.promotion_number}`}>
          <img src={Array.isArray(post.image_url) ? post.image_url[0] : ""} onError={(e) => (e.target.src = empty_img)} alt="" />
          <div className="post-card-content">
            <div className={`title ${post.tags?.length ? "" : "tl-2"}`}>{post.play_title}</div>
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
  );
}
