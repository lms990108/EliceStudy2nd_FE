import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import "./PRBoardForm.scss";
import { AlertCustom } from "../common/alert/Alerts";
import { useNavigate } from "react-router-dom";
import { promotionUrl, uploadImgUrl } from "../../apis/apiURLs";

export function PRBoardForm({ setInput, handleComplete, handleCancle }) {
  const [submit, setSubmit] = useState(false);
  const [openSubmit, setOpenSubmit] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [errorTitle, setErrorTitle] = useState("제목을 최소 5자 이상 입력해주세요.");
  const [inputContent, setInputContent] = useState("");
  const [errorContent, setErrorContent] = useState("내용을 최소 5자 이상 입력해주세요.");
  const [inputTag, setInputTag] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [errorImage, setErrorImage] = useState("사진을 선택해주세요.");
  const [tagList, setTagList] = useState([]);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    const res = await fetch(`${promotionUrl}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title: inputTitle,
        content: inputContent,
        tags: tagList,
        image_url: imageURL,
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
    } else if (image && errorImage) {
      document.querySelector("#imageBtn").focus();
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

  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      let formData = new FormData();
      formData.append("image_url", e.target.files[0]);

      const res = await fetch(`${uploadImgUrl}`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setImageURL(data.imageUrl);
        setErrorImage("");
      } else {
        console.log(data);
        setErrorImage("사진을 선택해주세요.");
      }
    } else {
      setErrorImage("사진을 선택해주세요.");
    }
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
    let newList = [...tagList];
    newList.splice(tagId, 1);
    setTagList(newList);
  };

  useEffect(() => {
    if (inputTitle || inputContent || imageURL || inputTag) setInput(true);
    else setInput(false);
  }, [inputTitle, imageURL, inputContent, inputTag]);

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
          <input type="text" id="title" name="title" value={inputTitle} onChange={handleTitleChange} maxLength={30} placeholder="제목을 작성해 주세요." required />
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
            onKeyDown={handleTagChange}
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            placeholder="엔터를 입력하여 태그를 등록할 수 있습니다."
          />
        </div>
        {tagList && (
          <div className="tag-list flex">
            {tagList.map((tag, idx) => (
              <div id={idx} className="tag-box flex">
                <span># {tag} </span>
                <IconButton onClick={handleTagRemove} size="small" sx={{ padding: "2px", fontSize: 14, marginLeft: "4px" }}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="input image">
        <div>
          <label htmlFor="image">*사진</label>
          <Button id="imageBtn" color="darkGray" variant="outlined" size="small" startIcon={<DriveFolderUploadIcon />}>
            <label className="pointer" htmlFor="image">
              파일 찾기
            </label>
          </Button>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} required />
        </div>
        {handleError(errorImage)}
        {imageURL && <img src={imageURL} alt="?" />}
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
          setTimeout(() => nav("/promotion"), 300);
        }}
        onclick={() => {
          setOpenComplete(false);
          setTimeout(() => nav("/promotion"), 300);
        }}
        title={"teenybox.com 내용:"}
        content={"글 등록이 완료되었습니다!"}
        btnCloseHidden={true}
        time={2000}
      />
    </div>
  );
}
