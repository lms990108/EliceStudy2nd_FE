import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "./FreeBoardForm.scss";
import { AlertCustom } from "../common/alert/Alerts";
import { useNavigate } from "react-router-dom";
import { postUrl } from "../../apis/apiURLs";

export function FreeBoardEditForm({ setInput, handleCancle, post }) {
  const [submit, setSubmit] = useState(false);
  const [openSubmit, setOpenSubmit] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);
  const [inputTitle, setInputTitle] = useState(post?.title || "");
  const [errorTitle, setErrorTitle] = useState("");
  const [inputContent, setInputContent] = useState(post?.content || "");
  const [errorContent, setErrorContent] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    const res = await fetch(`${postUrl}/${post.post_number}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: inputTitle,
        content: inputContent,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setOpenComplete(true);
    }
  };

  const handleButtonClick = (e) => {
    setSubmit(true);
    if (errorTitle) {
      document.querySelector("#title").focus();
    } else if (errorContent) {
      document.querySelector("#content").focus();
    } else {
      setOpenSubmit(true);
    }
  };

  const handleError = (error) => {
    if (submit && error) {
      return (
        <div className="error">
          <ErrorOutlineIcon fontSize="inherit" />
          {error}
        </div>
      );
    }
  };

  const handleTitleChange = (e) => {
    setInputTitle(e.target.value);
    if (e.target.value.length < 5) {
      setErrorTitle("제목을 최소 5자 이상 입력해주세요.");
    } else {
      setErrorTitle("");
    }
  };

  const handleContentChange = (e) => {
    setInputContent(e.target.value);
    if (e.target.value.length < 5) {
      setErrorContent("내용을 최소 5자 이상 입력해주세요.");
    } else {
      setErrorContent("");
    }
  };

  useEffect(() => {
    if (inputTitle || inputContent) setInput(true);
    else setInput(false);
  }, [inputTitle, inputContent]);

  useEffect(() => {
    console.log(post);
    if (post) {
      setInputTitle(post.title);
      setInputContent(post.content);
    }
  }, [post]);

  return (
    <div className="post-form-box">
      <div className="form-header">
        <div className="title">게시글 작성하기</div>
        <IconButton aria-label="close" color="inherit" onClick={handleCancle}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </div>

      <div className="flex-box title">
        <div className="input">
          <label htmlFor="title">*제목</label>
          <input type="text" id="title" name="title" value={inputTitle} onChange={handleTitleChange} maxLength={40} placeholder="제목을 작성해 주세요." required />
        </div>
        {handleError(errorTitle)}
      </div>

      <div className="input content flex-box">
        <label htmlFor="content">*내용</label>
        <textarea id="content" name="content" value={inputContent} onChange={handleContentChange} placeholder="내용을 작성해 주세요." required></textarea>
        {handleError(errorContent)}
      </div>

      <div className="form-footer">
        <div className="notice">*표시가 되어 있는 항목은 필수 기재 항목입니다.</div>
        <Button disabled={false} type="button" variant="contained" onClick={handleButtonClick}>
          작성완료
        </Button>
      </div>

      <AlertCustom
        open={openSubmit}
        onclose={() => setOpenSubmit(false)}
        title={"teenybox.com 내용:"}
        content={"게시글을 수정하시겠습니까?"}
        onclick={handleSubmit}
        checkBtn={"수정"}
        closeBtn={"취소"}
        checkBtnColor={"#42BB48"}
      />
      <AlertCustom
        open={openComplete}
        onclose={() => {
          setOpenComplete(false);
          setTimeout(() => nav("/community"), 300);
        }}
        onclick={() => {
          setOpenComplete(false);
          setTimeout(() => nav("/community"), 300);
        }}
        title={"teenybox.com 내용:"}
        content={"글 수정이 완료되었습니다!"}
        btnCloseHidden={true}
        time={1000}
      />
    </div>
  );
}
