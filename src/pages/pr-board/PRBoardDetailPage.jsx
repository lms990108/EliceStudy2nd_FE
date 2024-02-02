import React, { useEffect, useState } from "react";
import PRBoardPost from "../../components/board-pr/PRBoardPost";
import { BoardSecondHeader, BoardNav, CommentForm, CommentsList } from "../../components/board";
import "./PRBoardDetailPage.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { commentUrl, promotionUrl } from "../../apis/apiURLs";
import { Button } from "@mui/material";

export function PRBoardDetailPage() {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const nav = useNavigate();
  const params = useParams();

  const getPromotion = async () => {
    const postId = params.postId;
    const res = await fetch(`${promotionUrl}/${postId}`);
    const data = await res.json();
    console.log(data);

    setPost(data);
  };

  const getComments = async () => {
    if (totalCount !== 0 && totalCount <= comments.length) return;

    const res = await fetch(`${commentUrl}/promotions/${post._id}?page=${page}&limit=2`);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setComments([...comments, ...data.comments]);
      setTotalCount(data.totalComments);
      setPage(page + 1);
    }
  };

  const createComment = async (inputText) => {
    const res = await fetch(`${commentUrl}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: inputText,
        promotion: post._id,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setComments([data, ...comments]);
      setTotalCount(totalCount + 1);
    }
  };

  useEffect(() => {
    if (post._id) {
      getComments();
    }
  }, [post]);

  useEffect(() => {
    getPromotion();
  }, []);

  return (
    <div className="pr-board-detail-page page-margin-bottom">
      <BoardSecondHeader header="홍보게시판" onclick={() => nav("/promotion")} />
      <div className="body">
        {post && <PRBoardPost data={post} totalCommentCount={totalCount} />}
        <BoardNav point={totalCount} text="개의 댓글" onclick={getPromotion} />
        <CommentForm createComment={createComment} postId={post?._id} />
        {comments && <CommentsList comments={comments} totalCount={totalCount} getComments={getComments} setComments={setComments} setTotalCount={setTotalCount} />}
        <Button className="back-btn" color="inherit" variant="contained" onClick={() => nav(`/promotion`)}>
          목록보기
        </Button>
      </div>
    </div>
  );
}
