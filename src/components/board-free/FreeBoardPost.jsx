import React from "react";
import "./FreeBoardPost.scss";
import { PostTop } from "../board";

export default function FreeBoardPost({ data, totalCommentCount }) {
  return (
    <div className="free-board-post">
      <PostTop user={data.user_id || { nickname: "test nick" }} type={"community"} createdAt={data.createdAt} commentsCnt={totalCommentCount || 0} postNumber={data.post_number} />
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
