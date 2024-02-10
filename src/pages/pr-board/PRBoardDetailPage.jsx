import React, { useContext, useEffect, useState } from "react";
import PRBoardPost from "../../components/board-pr/PRBoardPost";
import { BoardSecondHeader, BoardNav, CommentForm, CommentsList } from "../../components/board";
import "./PRBoardDetailPage.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { commentUrl, promotionUrl, userUrl } from "../../apis/apiURLs";
import { Button, CircularProgress } from "@mui/material";
import { BoardRightContainer } from "../../components/board/BoardRightContainer";
import setStoreViewList from "../../utils/setStoreRecentViewList";
import { NotFoundPage } from "../errorPage/NotFoundPage";
import { AlertContext, AppContext } from "../../App";

export function PRBoardDetailPage() {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [state, setState] = useState("loading");
  const [commentState, setCommentState] = useState("loading");
  const nav = useNavigate();
  const params = useParams();
  const { userData, setUserData } = useContext(AppContext);
  const { setOpenLoginAlertBack } = useContext(AlertContext);

  const getPromotion = async () => {
    setState("loading");
    const postId = params.postId;
    const res = await fetch(`${promotionUrl}/${postId}`);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setPost(data);
      setState("hasValue");
    } else {
      setPost();
      setState("hasError");
    }
  };

  const getComments = async () => {
    if (totalCount !== 0 && totalCount <= comments.length) return;
    setCommentState("loading");

    const res = await fetch(`${commentUrl}/promotions/${post._id}?page=${page}&limit=20`);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setComments([...comments, ...data.comments]);
      setTotalCount(data.totalComments);
      setPage(page + 1);
      setCommentState("hasValue");
    } else {
      setCommentState("hasError");
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
        setUserData({ isLoggedIn: false });
        setOpenLoginAlertBack(true);
      }
    }
  };

  useEffect(() => {
    if (post?._id) {
      getComments();
    }
  }, [post]);

  useEffect(() => {
    getPromotion();
  }, [params]);

  return (
    <div className="pr-board-detail-page page-margin">
      {state === "hasError" ? (
        <NotFoundPage prev={true} />
      ) : (
        <>
          <div className="board-left-container">
            <BoardSecondHeader header={"홍보게시판"} onclick={() => nav(-1)} />
            {state === "loading" ? (
              <div className="progress-box">
                <CircularProgress color="secondary" className="progress" />
              </div>
            ) : (
              <div className="body">
                {post._id && <PRBoardPost data={post} totalCommentCount={totalCount} />}
                <BoardNav point={totalCount.toLocaleString("ko-KR")} text="개의 댓글" onclick={getPromotion} />
                <CommentForm createComment={createComment} postId={post?._id} />
                {!comments.length || <CommentsList comments={comments} totalCount={totalCount} getComments={getComments} setComments={setComments} setTotalCount={setTotalCount} />}
                {commentState === "loading" && (
                  <div className="progress-box">
                    <CircularProgress color="secondary" className="progress-100" />
                  </div>
                )}
                <Button className="back-btn" color="inherit" variant="contained" onClick={() => nav(`/promotion`)}>
                  목록보기
                </Button>
              </div>
            )}
          </div>
          <BoardRightContainer post={post} />
        </>
      )}
    </div>
  );
}
