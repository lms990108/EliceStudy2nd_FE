import { Backdrop, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "../board-pr/PRBoardForm.scss";
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
  const [tagList, setTagList] = useState(post?.tags || []);
  const [inputTag, setInputTag] = useState();

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    const res = await fetch(`${postUrl}/${post.post_number}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: inputTitle,
        content: inputContent,
        tags: tagList,
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
    setInputTitle(e.target.value);
    if (e.target.value.length < 3) {
      setErrorTitle("제목을 최소 3자 이상 입력해주세요.");
    } else {
      setErrorTitle("");
    }
  };

  const handleContentChange = (e) => {
    setInputContent(e.target.value);
    if (e.target.value.length < 1) {
      setErrorContent("내용을 최소 1자 이상 입력해주세요.");
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
    if (inputTitle || inputContent || tagList) setInput(true);
    else setInput(false);
  }, [inputTitle, inputContent, tagList]);

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
        <div className="title">게시글 수정하기</div>
      </div>

      <div className="flex-box title">
        <div className="input">
          <label htmlFor="title">제목*</label>
          <input type="text" id="title" name="title" value={inputTitle} onChange={handleTitleChange} maxLength={40} placeholder="제목을 작성해 주세요." required />
        </div>
        {handleError(errorTitle)}
      </div>

      <div className="input content flex-box">
        <label htmlFor="content">내용*</label>
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
        <div className="notice">*표시가 되어 있는 항목은 필수 기재 항목입니다.</div>
        <div>
          <Button color="darkGray" size="large" variant="outlined" onClick={handleCancle} sx={{ marginRight: "14px" }}>
            취소
          </Button>
          <Button variant="contained" size="large" onClick={handleClickSubmitButton} disableElevation>
            수정
          </Button>
        </div>
      </div>

      <Backdrop open={openSubmit || openComplete} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <AlertCustom
          open={openSubmit}
          onclose={() => setOpenSubmit(false)}
          title={"teenybox.com 내용:"}
          content={"게시글을 수정하시겠습니까?"}
          onclick={handleSubmit}
          checkBtn={"확인"}
          closeBtn={"취소"}
          checkBtnColor={"#42BB48"}
        />
        <AlertCustom
          open={openComplete}
          onclose={() => {
            setOpenComplete(false);
            nav("/community");
          }}
          onclick={() => {
            setOpenComplete(false);
            nav("/community");
          }}
          title={"teenybox.com 내용:"}
          content={"글 수정이 완료되었습니다!"}
          btnCloseHidden={true}
          time={300}
        />
      </Backdrop>
    </div>
  );
}
