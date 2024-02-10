import React, { useContext, useEffect, useState } from "react";
import PRBoardPost from "../../components/board-pr/PRBoardPost";
import { BoardSecondHeader, BoardNav, CommentForm, CommentsList } from "../../components/board";
import "./PRBoardDetailPage.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { commentUrl, promotionUrl, userUrl } from "../../apis/apiURLs";
import { Button } from "@mui/material";
import { BoardRightContainer } from "../../components/board/BoardRightContainer";
import setStoreViewList from "../../utils/setStoreRecentViewList";
import { NotFoundPage } from "../errorPage/NotFoundPage";
import { AlertContext, AppContext } from "../../App";

export function PRBoardDetailPage() {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const nav = useNavigate();
  const params = useParams();
  const { userData, setUserData } = useContext(AppContext);
  const { setOpenLoginAlertBack } = useContext(AlertContext);

  const getPromotion = async () => {
    const postId = params.postId;
    const res = await fetch(`${promotionUrl}/${postId}`);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setPost(data);
    } else {
      setPost();
    }
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
    } else if (res.status === 401 || res.status === 403) {
      const loginRes = await fetch(`${userUrl}`, { credentials: "include" });
      if (loginRes.ok) {
        const data = await loginRes.json();
        setUserData({ isLoggedIn: true, user: data.user });
      } else {
        setOpenLoginAlertBack(true);
      }
    }
  };

  useEffect(() => {
    if (post?._id) {
      getComments();
      setStoreViewList(post);
    }
  }, [post]);

  useEffect(() => {
    getPromotion();
  }, [params]);

  return (
    <div className="pr-board-detail-page page-margin">
      {post ? (
        <>
          <div className="board-left-container">
            <BoardSecondHeader header={"홍보게시판"} onclick={() => nav(-1)} />
            <div className="body">
              {post._id && <PRBoardPost data={post} totalCommentCount={totalCount} />}
              <BoardNav point={totalCount} text="개의 댓글" onclick={getPromotion} />
              <CommentForm createComment={createComment} postId={post?._id} />
              {comments && <CommentsList comments={comments} totalCount={totalCount} getComments={getComments} setComments={setComments} setTotalCount={setTotalCount} />}
              <Button className="back-btn" color="inherit" variant="contained" onClick={() => nav(`/promotion`)}>
                목록보기
              </Button>
            </div>
          </div>
          <BoardRightContainer />
        </>
      ) : (
        <NotFoundPage prev={true} />
      )}
    </div>
  );
}
