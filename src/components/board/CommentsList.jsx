import React, { useEffect, useState } from "react";
import { Comment } from "./Comment";
import { Button } from "@mui/material";
import "./CommentsList.scss";
import { commentUrl } from "../../apis/apiURLs";

export function CommentsList({ comments, totalCount, getComments, setComments, setTotalCount }) {
  const [uniqueComments, setUniqueComments] = useState(comments);

  const deleteOneComment = async (_id) => {
    const res = await fetch(`${commentUrl}/${_id}`, { method: "DELETE", credentials: "include" });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      const newComments = uniqueComments.filter((current) => current._id !== _id);
      setComments(newComments);
      setUniqueComments(newComments);
      setTotalCount(totalCount - 1);
    }
  };

  useEffect(() => {
    const newComments = comments.reduce(function (newArr, current) {
      if (newArr.findIndex(({ _id }) => _id === current._id) === -1) {
        newArr.push(current);
      }
      return newArr;
    }, []);
    setUniqueComments(newComments);
  }, [comments]);

  return (
    <div className="comments-list-box">
      {uniqueComments.map((comment) => (
        <Comment commentData={comment} deleteComment={deleteOneComment} key={comment._id} />
      ))}
      {totalCount > comments.length && (
        <Button className="more-btn" onClick={() => getComments()} color="secondary" variant="outlined">
          더보기
        </Button>
      )}
    </div>
  );
}
