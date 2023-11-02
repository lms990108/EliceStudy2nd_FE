import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./PostForm.scss";

export function PostForm({ title = true, content = true, tags = true, image = true }) {
  const [imageURL, setImageURL] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.content.value);
  };

  const handleImageChange = (e) => {
    setImageURL(e.target.value);
  };

  return (
    <form className="post-form-box" onSubmit={handleSubmit}>
      <div className="form-header flex-box">
        <div className="title">게시글 작성하기</div>
        <IconButton
          aria-label="close"
          color="inherit"
          onClick={() => {
            alert("wer");
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </div>

      {title && (
        <div className="input title flex-box">
          <label htmlFor="title">*제목</label>
          <input type="text" id="title" name="title" placeholder="제목을 작성해 주세요." />
        </div>
      )}

      {content && (
        <div className="input content flex-box">
          <label htmlFor="content">*내용</label>
          <textarea id="content" name="content" placeholder="내용을 작성해 주세요"></textarea>
        </div>
      )}

      {tags && (
        <div className="input tag flex-box">
          <label htmlFor="tags">태그</label>
          <input type="text" id="tags" name="tags" placeholder="#태그를-작성해-주세요" />
        </div>
      )}

      {image && (
        <div className="input image">
          <div>
            <label htmlFor="image">*사진 URL</label>
            <input type="text" id="image" name="image" onChange={handleImageChange} required />
          </div>
          {imageURL && <img src={imageURL} alt="?" />}
        </div>
      )}

      <div className="form-footer flex-box">
        <div className="notice">*표시가 되어 있는 항목은 필수 기재 항목입니다.</div>
        <Button type="submit" variant="contained">
          작성완료
        </Button>
      </div>
    </form>
  );
}
