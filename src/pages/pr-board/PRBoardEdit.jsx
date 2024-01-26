import React, { useState, useEffect } from "react";
import { BoardSecondHeader } from "../../components/board";
import "./PRBoardFormPage.scss";
import { AlertCustom } from "../../components/common/alert/Alerts";
import { useNavigate, useParams } from "react-router-dom";
import { PRBoardEditForm } from "../../components/board-pr/PRBoardEdit";
import useGetUser from "../../hooks/authoriaztionHooks/useGetUser";
import { promotionUrl } from "../../apis/apiURLs";

export function PRBoardEdit() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(false);
  const [post, setPost] = useState();
  const params = useParams();
  const user = useGetUser();
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
      console.log("페이지 없음");
      // 404페이지
      return;
    }
    if (data.user_id.nickname !== user.nickname) {
      console.log("접근제한");
      // 403페이지로 리다이랙트
      return;
    }
    setPost(data);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="pr-board-form-page page-margin-bottom">
      <BoardSecondHeader header="홍보게시판" onclick={handleCancle} />
      <div className="body">
        <PRBoardEditForm setInput={(boolean) => setInput(boolean)} handleCancle={handleCancle} post={post} />
      </div>

      <AlertCustom
        open={open}
        onclose={() => setOpen(false)}
        onclick={() => nav("/promotion")}
        closeBtn={"취소"}
        checkBtn={"확인"}
        checkBtnColor={"red"}
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
