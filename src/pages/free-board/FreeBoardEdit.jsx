import React, { useContext, useEffect, useState } from "react";
import "./FreeBoardFormPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { AlertCustom } from "../../components/common/alert/Alerts";
import { FreeBoardEditForm } from "../../components/board-free/FreeBoardEdit";
import { postUrl } from "../../apis/apiURLs";
import { AppContext } from "../../App";
import { Backdrop } from "@mui/material";

export function FreeBoardEdit() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(false);
  const [post, setPost] = useState();
  const params = useParams();
  const { userData } = useContext(AppContext);
  const nav = useNavigate();

  const handleCancle = (e) => {
    if (input) setOpen(true);
    else nav(-1);
  };

  const getPost = async () => {
    const res = await fetch(`${postUrl}/${params.postId}`);
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
    <div className="free-board-form-page page-margin">
      <div className="body">
        <FreeBoardEditForm setInput={(boolean) => setInput(boolean)} handleCancle={handleCancle} post={post} />
      </div>

      <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <AlertCustom
          open={open}
          onclose={() => setOpen(false)}
          onclick={() => nav("/community")}
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
      </Backdrop>
    </div>
  );
}
