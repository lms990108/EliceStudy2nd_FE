import React, { useEffect, useState } from "react";
import PRBoardPost from "../../components/board-pr/PRBoardPost";
import { BoardSecondHeader, BoardNav, CommentForm, CommentsList } from "../../components/board";
import "./PRBoardDetailPage.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getPRBoardList } from "../../apis/board/prBoard";
import { addComment, getComments } from "../../apis/comments/comments";
import { promotionUrl } from "../../apis/apiURLs";

export function PRBoardDetailPage() {
  const { state, pathname } = useLocation();
  const getPost = state?.post;
  const getPath = pathname?.split("/");
  const [post, setPost] = useState(getPost);
  const [comments, setComments] = useState([]);
  const nav = useNavigate();
  const params = useParams();

  const getPromotion = async () => {
    const postId = params.postId;
    const res = await fetch(`${promotionUrl}/number/${postId}`);
    const data = await res.json();
    setPost(data);
    setComments([...data.comments]);
  };

  const createComment = (comment) => {
    addComment(comment);
    getPromotion();
  };

  useEffect(() => {
    getPromotion();
  }, []);

  return (
    <div className="pr-board-detail-page page-margin-bottom">
      <BoardSecondHeader header="홍보게시판" onclick={() => nav("/promotion")} />
      <div className="body">
        {post && <PRBoardPost data={post} />}
        <BoardNav point={`${comments?.length || 0}`} text="의 댓글" onclick={getPromotion} />
        <CommentForm create={createComment} />
        <CommentsList comments={comments} path="/promotion" />
      </div>
    </div>
  );
}
