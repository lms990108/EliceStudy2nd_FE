import React, { useEffect, useState } from "react";
import FreeBoardPost from "../../components/board-free/FreeBoardPost";
import "./FreeBoardDetailPage.scss";
import { BoardSecondHeader, BoardNav, CommentForm, CommentsList } from "../../components/board";
import { useNavigate, useParams } from "react-router-dom";
import { addComment, getComments } from "../../apis/comments/comments";
import { postUrl } from "../../apis/apiURLs";

export function FreeBoardDetailPage() {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const nav = useNavigate();
  const params = useParams();

  const getPost = async () => {
    const postId = params.postId;
    const res = await fetch(`${postUrl}/${postId}`);
    const data = await res.json();
    setPost(data);
    const data_comments = getComments();
    setComments([...data_comments]);
  };

  const createComment = (comment) => {
    addComment(comment);
    getPost();
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="free-board-detail page-margin-bottom">
      <BoardSecondHeader header="자유게시판" onclick={() => nav("/community")} />
      <div className="body">
        {post && <FreeBoardPost data={post} />}
        <BoardNav point={comments?.length || 0} text="의 댓글" onclick={getPost} />
        <CommentForm create={createComment} />
        <CommentsList comments={comments} path="/community" />
      </div>
    </div>
  );
}
