import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "./FreeBoardForm.scss";
import { AlertCustom } from "../common/alert/Alerts";
import { useNavigate } from "react-router-dom";
import { postUrl } from "../../apis/apiURLs";

export function FreeBoardForm({ setInput, handleCancle }) {
  const [submit, setSubmit] = useState(false);
  const [openSubmit, setOpenSubmit] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);

  const [inputTitle, setInputTitle] = useState("");
  const [errorTitle, setErrorTitle] = useState("제목을 최소 3자 이상 입력해주세요.");
  const [inputContent, setInputContent] = useState("");
  const [errorContent, setErrorContent] = useState("내용을 최소 3자 이상 입력해주세요.");
  const [tagList, setTagList] = useState([]);
  const [inputTag, setInputTag] = useState();

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    const res = await fetch(`${postUrl}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
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

  const handleClickSubmitButton = (e) => {
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
    setInputTitle(e.target.value.trimStart());
    if (e.target.value.trim().length < 3) {
      setErrorTitle("제목을 최소 3자 이상 입력해주세요.");
    } else {
      setErrorTitle("");
    }
  };

  const handleContentChange = (e) => {
    setInputContent(e.target.value);
    if (e.target.value.trim().length < 3) {
      setErrorContent("내용을 최소 3자 이상 입력해주세요.");
    } else {
      setErrorContent("");
    }
  };

  const handleChangeTag = (e) => {
    if (e.keyCode === 13) {
      if (!inputTag) return;
      setTagList((cur) => [...cur, inputTag]);
      setInputTag("");
    }
  };

  const handleRemoveTag = (e) => {
    const tagId = e.target.closest(".tag-box").id;
    let newList = [...tagList];
    newList.splice(tagId, 1);
    setTagList(newList);
  };

  useEffect(() => {
    if (inputTitle || inputContent) setInput(true);
    else setInput(false);
  }, [inputTitle, inputContent]);

  return (
    <div className="post-form-box">
      <div className="form-header">
        <div className="title">게시글 작성하기</div>
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

      <div className="input tag flex-box">
        <div>
          <label htmlFor="tags">태그</label>
          <input
            type="text"
            id="tags"
            name="tags"
            onKeyDown={handleChangeTag}
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value.trimStart())}
            placeholder="엔터를 입력하여 태그를 등록할 수 있습니다."
            maxLength={16}
          />
        </div>
        {tagList && (
          <div className="tag-list flex">
            {tagList.map((tag, idx) => (
              <div id={idx} className="tag-box flex">
                <span># {tag} </span>
                <IconButton onClick={handleRemoveTag} size="small" sx={{ padding: "2px", fontSize: 14, marginLeft: "4px" }}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="form-footer">
        <div className="notice">
          <span className="star">*</span>표시가 되어 있는 항목은 필수 기재 항목입니다.
        </div>
        <div>
          <Button color="darkGray" size="large" variant="outlined" onClick={handleCancle} sx={{ marginRight: "14px" }}>
            취소
          </Button>
          <Button variant="contained" size="large" onClick={handleClickSubmitButton} disableElevation>
            등록
          </Button>
        </div>
      </div>

      <AlertCustom
        open={openSubmit}
        onclose={() => setOpenSubmit(false)}
        title={"teenybox.com 내용:"}
        content={"게시글을 작성하시겠습니까?"}
        onclick={() => {
          handleSubmit();
        }}
        checkBtn={"등록"}
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
        content={"글 등록이 완료되었습니다!"}
        btnCloseHidden={true}
        time={2000}
      />
    </div>
  );
}
