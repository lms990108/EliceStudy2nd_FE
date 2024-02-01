import React, { useEffect, useState } from "react";
import FreeBoardPost from "../../components/board-free/FreeBoardPost";
import "./FreeBoardDetailPage.scss";
import { BoardSecondHeader, BoardNav, CommentForm, CommentsList } from "../../components/board";
import { useNavigate, useParams } from "react-router-dom";
import { commentUrl, postUrl } from "../../apis/apiURLs";
import { Button } from "@mui/material";

export function FreeBoardDetailPage() {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const nav = useNavigate();
  const params = useParams();

  const getPost = async () => {
    const postId = params.postId;
    const res = await fetch(`${postUrl}/${postId}`);
    const data = await res.json();
    console.log(data);

    setPost(data);
  };

  const getComments = async () => {
    if (totalCount !== 0 && totalCount <= comments.length) return;

    const res = await fetch(`${commentUrl}/posts/${post._id}?page=${page}&limit=2`);
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
        post: post._id,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setComments([data, ...comments]);
      setTotalCount(totalCount + 1);
    }
  };

  const handleRefreshComments = async () => {
    const res = await fetch(`${commentUrl}/posts/${post._id}?page=1&limit=2`);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setComments(data.comments);
      setTotalCount(data.totalComments);
      setPage(2);
    }
  };

  useEffect(() => {
    if (post._id) {
      getComments();
    }
  }, [post]);

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="free-board-detail page-margin-bottom">
      <BoardSecondHeader header="커뮤니티" onclick={() => nav("/community")} />
      <div className="body">
        {post && <FreeBoardPost data={post} />}
        <BoardNav point={totalCount} text="개의 댓글" onclick={handleRefreshComments} />
        <CommentForm createComment={createComment} postId={post?._id} />
        {comments && <CommentsList comments={comments} setComments={setComments} totalCount={totalCount} getComments={getComments} setTotalCount={setTotalCount} />}
        <Button className="back-btn" color="inherit" variant="contained" onClick={() => nav(`/community`)}>
          목록보기
        </Button>
      </div>
    </div>
  );
}
