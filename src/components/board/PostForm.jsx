import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./PostForm.scss";
import { AlertCustom } from "../common/alert/Alerts";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";

export function PostForm({ title = true, content = true, tags = true, image = true }) {
  const [imageURL, setImageURL] = useState("");
  const [openCancle, setOpenCancle] = useState(false);
  const [openSubmit, setOpenSubmit] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.content.value);
  };

  const handleImageChange = (e) => {
    setImageURL(e.target.value);
  };

  const handleTagChange = (e) => {
    if (e.keyCode === 13) {
      if (!inputTag) return;
      setTagList((cur) => [...cur, inputTag]);
      setInputTag("");
    }
  };

  const handleTagRemove = (e) => {
    const tagId = e.target.closest(".tag-box").id;
    console.log(tagId);
    let newList = [...tagList];
    newList.splice(tagId, 1);
    setTagList(newList);
  };

  return (
    <div className="post-form-box">
      <div className="form-header flex-box">
        <div className="title">게시글 작성하기</div>
        <IconButton aria-label="close" color="inherit" onClick={() => setOpenCancle(true)}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </div>

      {title && (
        <div className="input title flex-box">
          <label htmlFor="title">*제목</label>
          <input type="text" id="title" name="title" placeholder="제목을 작성해 주세요." required />
        </div>
      )}

      {content && (
        <div className="input content flex-box">
          <label htmlFor="content">*내용</label>
          <textarea id="content" name="content" placeholder="내용을 작성해 주세요." required></textarea>
        </div>
      )}

      {tags && (
        <div className="input tag">
          <div>
            <label htmlFor="tags">태그</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={inputTag}
              onKeyDown={handleTagChange}
              onChange={(e) => setInputTag(e.target.value)}
              placeholder="엔터를 입력하여 태그를 등록할 수 있습니다."
            />
          </div>
          {tagList && (
            <div className="tag-list flex-box">
              {tagList.map((tag, idx) => (
                <div id={idx} className="tag-box flex-box">
                  <span># {tag} </span>
                  <IconButton onClick={handleTagRemove} size="small" sx={{ padding: "2px", fontSize: 14, marginLeft: "4px" }}>
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {image && (
        <div className="input image">
          <div>
            <label htmlFor="image">*사진 URL</label>
            <input type="text" id="image" name="image" onChange={handleImageChange} placeholder="https://image.jpg" required />
          </div>
          {imageURL && <img src={imageURL} alt="?" />}
        </div>
      )}

      <div className="form-footer flex-box">
        <div className="notice">*표시가 되어 있는 항목은 필수 기재 항목입니다.</div>
        <Button
          type="button"
          variant="contained"
          onClick={() => {
            setOpenSubmit(true);
          }}
        >
          작성완료
        </Button>
      </div>
      <AlertCustom
        open={openCancle}
        onclose={() => setOpenCancle(false)}
        onclick={() => nav("/pr-board")}
        closeBtn={"취소"}
        checkBtn={"확인"}
        checkBtnColor={"red"}
        severity={"warning"}
        title={"teenybox.com 내용:"}
        content={"정말로 취소하시겠습니까?"}
      />
      <AlertCustom
        open={openSubmit}
        onclose={() => setOpenSubmit(false)}
        title={"teenybox.com 내용:"}
        content={"홍보 게시글을 작성하시겠습니싸?"}
        onclick={() => setOpenComplete(true)}
        checkBtn={"등록"}
        closeBtn={"취소"}
        checkBtnColor={"#42BB48"}
      />
      <AlertCustom
        open={openComplete}
        onclose={() => {
          setOpenComplete(false);
          setTimeout(() => nav("/pr-board"), 300);
        }}
        onclick={() => {
          setOpenComplete(false);
          setTimeout(() => nav("/pr-board"), 300);
        }}
        title={"teenybox.com 내용:"}
        content={"글 등록이 완료되었습니다!"}
        btnCloseHidden={true}
        time={2000}
      />
    </div>
  );
}
