import React, { useState, useEffect, useContext } from "react";
import { BoardSecondHeader } from "../../components/board";
import "./PRBoardFormPage.scss";
import { AlertCustom } from "../../components/common/alert/Alerts";
import { useNavigate, useParams } from "react-router-dom";
import { PRBoardEditForm } from "../../components/board-pr/PRBoardEdit";
import { promotionUrl } from "../../apis/apiURLs";
import { AppContext } from "../../App";

export function PRBoardEdit() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(false);
  const [post, setPost] = useState();
  const params = useParams();
  const { userData } = useContext(AppContext);
  const nav = useNavigate();

  const handleCancle = (e) => {
    if (input) setOpen(true);
    else nav("/promotion");
  };

  const getPost = async () => {
    const res = await fetch(`${promotionUrl}/${params.postId}`);
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      nav("/not-found");
      return;
    }
    if (data.user_id.nickname !== userData.user.nickname) {
      nav("/forbidden");
      return;
    }
    setPost(data);
  };

  useEffect(() => {
    if (userData?.user?.nickname) {
      getPost();
    }
  }, [userData]);

  return (
    <div className="pr-board-form-page page-margin">
      <div className="body">{post && <PRBoardEditForm setInput={(boolean) => setInput(boolean)} handleCancle={handleCancle} post={post} />}</div>

      <AlertCustom
        open={open}
        onclose={() => setOpen(false)}
        onclick={() => nav("/promotion")}
        closeBtn={"취소"}
        checkBtn={"확인"}
        checkBtnColor={"#ff9800"}
        severity={"warning"}
        title={"teenybox.com 내용:"}
        content={
          <>
            작성을 취소하시겠습니까?
            <br />
            작성 중인 내용은 저장되지 않습니다.
          </>
        }
      />
    </div>
  );
}
