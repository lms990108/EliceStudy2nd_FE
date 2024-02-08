import React, { useContext, useEffect, useState } from "react";
import "./PostTop.scss";
import { AlertCustom } from "../common/alert/Alerts";
import copyUrl from "../../utils/copyUrl";
import { AccountCircle, DeleteOutline, EditOutlined, ShareOutlined, SmsOutlined, ThumbUpAlt, ThumbUpAltOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { postUrl, promotionUrl } from "../../apis/apiURLs";
import { format } from "date-fns";
import { AlertContext, AppContext } from "../../App";
import { Backdrop, Button, Tooltip } from "@mui/material";

export function PostTop({ user, type, post, commentsCnt }) {
  const [openURLCopyAlert, setOpenURLCopyAlert] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [isWriter, setIsWriter] = useState(false); // false로 바꾸기
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const { userData } = useContext(AppContext);
  const { setOpenLoginAlert } = useContext(AlertContext);
  const nav = useNavigate();

  const handleCommentsButtonClick = () => {
    const location = document.querySelector("#commentForm").offsetTop;
    window.scrollTo({ top: location, behavior: "smooth" });
  };

  const handleCopyButtonClick = () => {
    copyUrl();
    setOpenURLCopyAlert(true);
  };

  const handleEditButtonClick = () => {
    nav(`/${type}/edit/${post.post_number || post.promotion_number}`);
  };

  const handleDeleteButtonClick = () => {
    setOpenDeleteAlert(true);
  };

  const handleClickLikes = async () => {
    const url = type === "community" ? `${postUrl}/${post.post_number}/like` : `${promotionUrl}/${post.promotion_number}/like`;
    if (isLiked) {
      const res = await fetch(url, { method: "DELETE", credentials: "include" });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setIsLiked(true);
        setLikes((cur) => cur + 1);
      } else if (res.status === 403) {
        setOpenLoginAlert(true);
      }
    } else {
      const res = await fetch(url, { method: "POST", credentials: "include" });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setIsLiked(true);
        setLikes((cur) => cur + 1);
      } else if (res.status === 403) {
        setOpenLoginAlert(true);
      }
    }
  };

  const deletePost = async () => {
    const url = type === "community" ? `${postUrl}/${post.post_number}` : `${promotionUrl}/${post.promotion_number}`;
    const res = await fetch(url, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    nav(`/${type}`);
  };

  useEffect(() => {
    console.log(userData, user);
    if (userData?.user?.nickname === user?.nickname) {
      setIsWriter(true);
    }

    if (userData?.user?._id) {
      setIsLiked(post.likedUsers.includes(userData?.user?._id));
    }
  }, [userData, user]);

  return (
    <>
      {user && (
        <div className="board-post-top">
          {user.profile_url ? <img className="user-img" src={user.profile_url} /> : <AccountCircle sx={{ fontSize: 50 }} />}
          <div className="flex-box">
            <div className="user-id">{user.nickname}</div>
            <div className="date">
              {post.createdAt?.split("T")[0]}
              <span className="dot">•</span>
              <div className="view-cnt">
                <VisibilityOutlined sx={{ fontSize: 16 }} />
                <span>{post.views || 0}</span>
              </div>
            </div>
          </div>
          <div className="icons">
            <ShareOutlined className="share-icon" onClick={handleCopyButtonClick} />
            {type === "community" && (
              <div className="comments-icon" onClick={handleCommentsButtonClick}>
                <SmsOutlined />
                <span>{commentsCnt}</span>
              </div>
            )}
            {isWriter && (
              <>
                <EditOutlined onClick={handleEditButtonClick} />
                <DeleteOutline onClick={handleDeleteButtonClick} />
              </>
            )}
            <Tooltip title={isLiked ? "추천됨" : "추천하기"} arrow>
              <Button onClick={handleClickLikes} variant={"outlined"} size="small" startIcon={isLiked ? <ThumbUpAlt /> : <ThumbUpAltOutlined />} disableElevation>
                {likes}
              </Button>
            </Tooltip>
          </div>

          <AlertCustom open={openURLCopyAlert} onclose={() => setOpenURLCopyAlert(false)} title={"URL이 복사되었습니다!"} content={window.location.href} time={1500} />
          <Backdrop open={openDeleteAlert} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <AlertCustom
              open={openDeleteAlert}
              onclose={() => setOpenDeleteAlert(false)}
              severity={"error"}
              title={"teenybox.com 내용:"}
              content={"정말 삭제하시겠습니까?"}
              onclick={deletePost}
              checkBtn={"확인"}
              checkBtnColor={"#ef5350"}
              closeBtn={"취소"}
            />
          </Backdrop>
        </div>
      )}
    </>
  );
}
