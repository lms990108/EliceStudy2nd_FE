import React, { useEffect, useState } from "react";
import "./FreeBoardPost.scss";
import { Comment, CommentsList, PostTop } from "../board";
import { postUrl } from "../../apis/apiURLs";
import { getComments } from "../../apis/comments/comments";

export default function FreeBoardPost({ data }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    console.log(data);
    setComments(getComments);
  }, []);

  return (
    <div className="free-board-post">
      <PostTop user={data.user_id || { nickname: "test nick" }} time={data.createdAt} commentsCnt={data.comments.length} />
      <h2 className="title">{data.title}</h2>
      <div>{data.content}</div>
    </div>
  );
}
