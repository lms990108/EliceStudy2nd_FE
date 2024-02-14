import React, { useContext, useEffect, useState } from "react";
import FreeBoardPost from "../../components/board-free/FreeBoardPost";
import "./FreeBoardDetailPage.scss";
import { BoardSecondHeader, BoardNav, CommentForm, CommentsList } from "../../components/board";
import { useNavigate, useParams } from "react-router-dom";
import { commentUrl, postUrl, userUrl } from "../../apis/apiURLs";
import { Button, CircularProgress } from "@mui/material";
import { BoardRightContainer } from "../../components/board/BoardRightContainer";
import setStoreViewList from "../../utils/setStoreRecentViewList";
import { NotFoundPage } from "../errorPage/NotFoundPage";
import { AlertContext, AppContext } from "../../App";
import { COMMENTS_LIMIT } from "../../utils/const";

export function FreeBoardDetailPage() {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [state, setState] = useState("loading");
  const [commentState, setCommentState] = useState("loading");
  const nav = useNavigate();
  const params = useParams();
  const { userData, setUserData } = useContext(AppContext);
  const { setOpenLoginAlertBack, setOpenFetchErrorAlert } = useContext(AlertContext);

  const getPost = async () => {
    setState("loading");
    try {
      const postId = params.postId;
      const res = await fetch(`${postUrl}/${postId}`);
      const data = await res.json();

      if (res.ok) {
        setPost(data);
        setState("hasValue");
      } else {
        setPost();
        setState("hasError");
        console.error(data);
      }
    } catch (err) {
      setState("hasError");
    }
  };

  const getComments = async () => {
    if (totalCount !== 0 && totalCount <= comments.length) return;
    setCommentState("loading");

    try {
      const res = await fetch(`${commentUrl}/posts/${post._id}?page=${page}&limit=${COMMENTS_LIMIT}`);
      const data = await res.json();

      if (res.ok) {
        setComments([...comments, ...data.comments]);
        setTotalCount(data.totalComments);
        setPage(page + 1);
        setCommentState("hasValue");
      } else {
        setCommentState("hasError");
        console.error(data);
      }
    } catch (err) {
      setCommentState("hasError");
    }
  };

  const createComment = async (inputText) => {
    try {
      const res = await fetch(`${commentUrl}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: inputText,
          post: post._id,
        }),
      });
      const data = await res.json();
      const newComment = { ...data, user: { nickname: userData.user.nickname, profile_url: userData.user.profile_url, state: "가입", _id: userData.user._id } };

      if (res.ok) {
        setComments([newComment, ...comments]);
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
      } else {
        console.error(data);
      }
    } catch (e) {
      setOpenFetchErrorAlert(true);
    }
  };

  const handleRefreshComments = async () => {
    setCommentState("loading");
    setComments([]);

    try {
      const res = await fetch(`${commentUrl}/posts/${post._id}?page=1&limit=${COMMENTS_LIMIT}`);
      const data = await res.json();

      if (res.ok) {
        setComments(data.comments);
        setTotalCount(data.totalComments);
        setPage(2);
        setCommentState("hasValue");
      } else {
        setCommentState("hasError");
        console.error(data);
      }
    } catch (err) {
      setCommentState("hasError");
    }
  };

  useEffect(() => {
    if (post?._id) {
      getComments();
      setStoreViewList(post);
    }
  }, [post]);

  useEffect(() => {
    getPost();
    setTotalCount(0);
    setPage(1);
    setComments([]);
  }, [params]);

  return (
    <div className="free-board-detail page-margin">
      {state === "hasError" ? (
        <NotFoundPage prev={true} />
      ) : (
        <>
          <div className="free-board-left-container">
            <BoardSecondHeader header="커뮤니티" onclick={() => nav("/community")} />
            {state === "loading" ? (
              <div className="progress-box">
                <CircularProgress color="secondary" className="progress" />
              </div>
            ) : (
              <div className="body">
                {post._id && <FreeBoardPost data={post} totalCommentCount={totalCount} />}
                <BoardNav point={totalCount.toLocaleString("ko-KR")} text="개의 댓글" onclick={handleRefreshComments} />
                <CommentForm createComment={createComment} postId={post?._id} />
                {!comments.length || <CommentsList comments={comments} setComments={setComments} totalCount={totalCount} getComments={getComments} setTotalCount={setTotalCount} />}
                {commentState === "loading" && (
                  <div className="progress-box">
                    <CircularProgress color="secondary" className="progress-100" />
                  </div>
                )}
                <Button className="back-btn" color="inherit" variant="contained" onClick={() => nav(`/community`)}>
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
