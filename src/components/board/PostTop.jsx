import React, { useEffect, useState } from "react";
import "./PostTop.scss";
import { AlertCustom } from "../common/alert/Alerts";
import copyUrl from "../../utils/copyUrl";
import { AccountCircle, DeleteOutline, EditOutlined, ShareOutlined, SmsOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { postUrl, promotionUrl } from "../../apis/apiURLs";

export function PostTop({ user, time, commentsCnt, type, postNumber }) {
  const [openURLCopyAlert, setOpenURLCopyAlert] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [isWriter, setIsWriter] = useState(true); // false로 바꾸기
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
    nav(`/${type}/edit/${postId}`);
  };

  const handleDeleteButtonClick = () => {
    setOpenDeleteAlert(true);
  };

  const deletePost = async () => {
    const url = type === "community" ? `${postUrl}/${postNumber}` : `${promotionUrl}/${postNumber}`;
    const res = await fetch(url, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    // 로그인 한 사용자가 글쓴이인지 확인 후
    //setIsWriter(true);
  }, []);

  return (
    <div className="board-post-top">
      {user.profile_url ? <img className="user-img" src={user.profile_url} /> : <AccountCircle sx={{ fontSize: 50 }} />}
      <div className="flex-box">
        <div className="user-id">{user.nickname}</div>
        <div className="date">{time}</div>
      </div>
      <div className="icons">
        <ShareOutlined className="share-icon" onClick={handleCopyButtonClick} />
        <div className="comments-icon" onClick={handleCommentsButtonClick}>
          <SmsOutlined />
          <span>{commentsCnt}</span>
        </div>
        {isWriter && (
          <>
            <EditOutlined onClick={handleEditButtonClick} />
            <DeleteOutline onClick={handleDeleteButtonClick} />
          </>
        )}
      </div>

      <AlertCustom open={openURLCopyAlert} onclose={() => setOpenURLCopyAlert(false)} title={"URL이 복사되었습니다!"} content={window.location.href} time={1500} />
      <AlertCustom
        open={openDeleteAlert}
        onclose={() => setOpenDeleteAlert(false)}
        severity={"error"}
        title={"정말 삭제하시겠습니까?"}
        onclick={deletePost}
        checkBtn={"확인"}
        checkBtnColor={"red"}
        closeBtn={"취소"}
      />
    </div>
  );
}
