import React, { useContext, useEffect, useState } from "react";
import "./Comment.scss";
import { AppContext } from "../../App";
import { Backdrop, Button } from "@mui/material";
import { commentUrl } from "../../apis/apiURLs";
import { AlertCustom } from "../common/alert/Alerts";

export function Comment({ commentData, deleteComment }) {
  const [comment, setComment] = useState(commentData);
  const [seeMoreOpen, setSeeMoreOpen] = useState(false);
  const [disable, setDisable] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [inputComment, setInputComment] = useState(comment.content);
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const { userData } = useContext(AppContext);

  const handleSeeMore = (e) => {
    const textBox = e.target.closest(".text");
    textBox.classList.toggle("close");
    setSeeMoreOpen((cur) => !cur);
    console.log(textBox.clientHeight);
  };

  const handleClickUpdateBtn = async () => {
    const res = await fetch(`${commentUrl}/${comment._id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: inputComment }),
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setComment(data);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (!isEditing) {
      const textBox = document.querySelector(`#comment${comment._id} .text`);
      if (parseInt(textBox.clientHeight) > 72) {
        console.log("?");
        setDisable(false);
      }
    }
  }, [isEditing]);

  return (
    <>
      <div className="comment-box" id={`comment${comment._id}`}>
        <div className="top">
          <img className="user-profile-img" src={comment.user_profile || "https://elice-5th.s3.amazonaws.com/promotions/1706717302540_KakaoTalk_20240131_164754169_05.jpg"} />
          <div className="flex-box">
            <div className="user-id">{comment.user_nickname}</div>
            <div className="time">{comment.createdAt}</div>
          </div>
          {userData?.user?.nickname === comment.user_nickname && (
            <>
              {isEditing ? (
                <div className="buttons editing">
                  <Button onClick={handleClickUpdateBtn} variant="contained" color="silver" size="small" disableElevation>
                    완료
                  </Button>
                  <Button onClick={() => setIsEditing(false)} variant="outlined" color="darkGray" size="small" disableElevation>
                    취소
                  </Button>
                </div>
              ) : (
                <div className="buttons default">
                  <button onClick={() => setIsEditing(true)}>수정</button>
                  <button onClick={() => setOpenAlertDelete(true)}>삭제</button>
                </div>
              )}
            </>
          )}
        </div>
        {isEditing ? (
          <div className="content edit">
            <textarea id="comment" value={inputComment} onChange={(e) => setInputComment(e.target.value)} placeholder="댓글을 작성하세요."></textarea>
          </div>
        ) : (
          <div className="content pre-wrap">
            <span className={`text ${disable || "close"}`}>
              {comment.content}
              <span className="see-more-btn pointer" onClick={handleSeeMore}>
                {disable || (seeMoreOpen ? "▴접기" : "▾더보기")}
              </span>
            </span>
          </div>
        )}
      </div>
      <Backdrop open={openAlertDelete} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <AlertCustom
          open={openAlertDelete}
          onclose={() => setOpenAlertDelete(false)}
          title={"teenybox.com 내용:"}
          content={"댓글을 삭제하시겠습니까?"}
          onclick={() => deleteComment(comment._id)}
          checkBtn={"삭제"}
          closeBtn={"취소"}
          severity={"error"}
          checkBtnColor={"#ef5350"}
        />
      </Backdrop>
    </>
  );
}
