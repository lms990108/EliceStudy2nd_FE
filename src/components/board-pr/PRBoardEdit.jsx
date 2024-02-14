import { Backdrop, Button, FormControlLabel, IconButton, Radio, RadioGroup } from "@mui/material";
import React, { Children, useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import "./PRBoardForm.scss";
import { AlertCustom } from "../common/alert/Alerts";
import { useNavigate } from "react-router-dom";
import { presignedUrl, promotionUrl, uploadImgUrl } from "../../apis/apiURLs";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import empty_img from "../../assets/img/empty_img.svg";
import { Close } from "@mui/icons-material";
import { AlertContext } from "../../App";

export function PRBoardEditForm({ setInput, handleCancle, post }) {
  const [submit, setSubmit] = useState(false);
  const [openSubmit, setOpenSubmit] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);

  // 카테고리
  const [inputCategory, setInputCategiry] = useState(post?.category);
  // 연극명
  const [inputPlayTitle, setInputPlayTitle] = useState(post?.play_title);
  const [errorPlayTitle, setErrorPlayTitle] = useState("");
  // 장소
  const [inputLocation, setInputLocation] = useState(post?.location);
  // 주최
  const [inputHost, setInputHost] = useState(post?.host);
  // 러닝타임
  const [inputRuntime, setInputRuntime] = useState(post?.runtime);
  // 기간
  const [inputStartDate, setInputStartDate] = useState(dayjs(post.start_date));
  const [inputEndDate, setInputEndDate] = useState(dayjs(post.end_date));
  const [errorDate, setErrorDate] = useState("");
  // 글제목
  const [inputTitle, setInputTitle] = useState(post?.title);
  const [errorTitle, setErrorTitle] = useState("");
  // 내용
  const [inputContent, setInputContent] = useState(post?.content);
  const [errorContent, setErrorContent] = useState("");
  // 태그
  const [tagList, setTagList] = useState(post?.tags);
  const [inputTag, setInputTag] = useState("");
  // 사진
  const [mainImageURL, setMainImageURL] = useState(post?.image_url[0]); // 0인덱스 대표이미지
  const [errorMainImage, setErrorMainImage] = useState("");
  const [imageURL, setImageURL] = useState(post?.image_url.slice(1));
  const [errorImage, setErrorImage] = useState("");
  const [warningMainImage, setWarningMainImage] = useState("");

  const { setOpenFetchErrorAlert } = useContext(AlertContext);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    try {
      const res = await fetch(`${promotionUrl}/${post.promotion_number}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: inputTitle,
          content: inputContent,
          tags: tagList,
          image_url: [mainImageURL, ...imageURL],
          start_date: inputStartDate || undefined,
          end_date: inputEndDate || undefined,
          category: inputCategory,
          play_title: inputPlayTitle,
          runtime: Number(inputRuntime) || 0,
          location: inputLocation || "",
          host: inputHost || "",
        }),
      });

      if (res.ok) {
        setOpenComplete(true);
      } else {
        const data = await res.json();
        console.error(data);
      }
    } catch (e) {
      setOpenFetchErrorAlert(true);
    }
  };

  const handleClickSubmitButton = (e) => {
    setSubmit(true);
    if (!mainImageURL) {
      setErrorMainImage("사진을 선택해주세요.");
    }

    if (errorPlayTitle) {
      document.querySelector("#play-title").focus();
    } else if (errorDate) {
      document.querySelector("#date").focus();
    } else if (errorTitle) {
      document.querySelector("#title").focus();
    } else if (errorContent) {
      document.querySelector("#content").focus();
    } else if (!mainImageURL) {
      document.querySelector("#imageBtn").focus();
    } else {
      setOpenSubmit(true);
    }
  };

  const handleErrorPlaceholder = (error) => {
    if (submit && error) {
      return (
        <div className="error">
          <ErrorOutlineIcon fontSize="inherit" />
          {error}
        </div>
      );
    }
  };

  const handleChangePlayTitle = (e) => {
    if (e.target.value.trim().length > 30) return;
    setInputPlayTitle(e.target.value.trimStart());
    if (!e.target.value) {
      setErrorPlayTitle("연극명을 입력해주세요.");
    } else {
      setErrorPlayTitle("");
    }
  };

  const handleErrorDate = (error) => {
    setErrorDate("날짜를 선택해주세요.");
  };

  const handleChangeTitle = (e) => {
    if (e.target.value.trim().length > 40) return;
    setInputTitle(e.target.value.trimStart());
    if (e.target.value.length < 3) {
      setErrorTitle("제목을 최소 3자 이상 입력해주세요.");
    } else {
      setErrorTitle("");
    }
  };

  const handleChangeContent = (e) => {
    setInputContent(e.target.value);
    if (e.target.value.trim().length < 3) {
      setErrorContent("내용을 최소 3자 이상 입력해주세요.");
    } else {
      setErrorContent("");
    }
  };

  const handleChangeLocation = (e) => {
    if (e.target.value.trim().length <= 40) {
      setInputLocation(e.target.value.trimStart());
    }
  };

  const handleChangeHost = (e) => {
    if (e.target.value.trim().length <= 20) {
      setInputHost(e.target.value.trimStart());
    }
  };

  const uploadImage = async (file) => {
    try {
      let res = await fetch(presignedUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: file.name }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error(data);
        return false;
      }

      res = await fetch(data.presigned_url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!res.ok) {
        return false;
      }
      return data.public_url;
    } catch (e) {
      setOpenFetchErrorAlert(true);
    }
  };

  const handleChangeMainImage = async (e) => {
    if (!e.target.files.length) return;
    const file = e.target.files[0];

    if (file.size > 1024 * 1024 * 5) {
      return setErrorMainImage("사진은 최대 5MB까지 업로드 가능합니다.");
    }
    const data = await uploadImage(file);

    if (data) {
      setMainImageURL(data);
      setErrorMainImage("");

      let image = new Image();
      image.src = data;
      image.onload = function () {
        if (image.width > image.height) {
          setWarningMainImage("red");
        } else {
          setWarningMainImage("");
        }
      };
    } else {
      setErrorMainImage("사진 업로드에 실패했습니다. 다시 시도해주세요");
    }
    e.target.value = null;
  };

  const handleRemoveMainImage = async (e) => {
    setMainImageURL();
    setErrorMainImage("");
    setWarningMainImage("");
  };

  const handleChangeImage = async (e) => {
    if (!e.target.files.length) return;

    let newImg = [];
    let error = "";

    let newImage = Array.from(e.target.files);
    for (let file of newImage) {
      if (file.size > 1024 * 1024 * 5) {
        error = "사진은 최대 5MB까지 업로드 가능합니다.";
        continue;
      }
      const data = await uploadImage(file);

      if (data) {
        newImg.push(data);
      } else {
        error = error || "사진 업로드에 실패했습니다. 다시 시도해주세요.";
      }
    }

    setImageURL([...imageURL, ...newImg]);
    setErrorImage(error);
    e.target.value = null;
  };

  // 선택한 이미지 하나씩 삭제하는 기능
  const handleRemoveImage = async (e) => {
    const idx = Number(e.currentTarget.id);
    const newImageURL = imageURL.filter((url, _idx) => idx !== _idx);
    setImageURL(newImageURL);
  };

  const handleOnKeyDownTag = (e) => {
    if (e.keyCode === 13) {
      if (!inputTag) return;
      setTagList((cur) => [...cur, inputTag]);
      setInputTag("");
    }
  };

  const handleChangeTag = (e) => {
    if (e.target.value.trim().length <= 15) {
      setInputTag(e.target.value.trimStart());
    }
  };

  const handleRemoveTag = (e) => {
    const tagId = e.target.closest(".tag-box").id;
    let newList = [...tagList];
    newList.splice(tagId, 1);
    setTagList(newList);
  };

  useEffect(() => {
    if (inputStartDate && inputEndDate) {
      setErrorDate("");
    } else {
      setErrorDate("날짜를 선택해주세요.");
    }
  }, [inputStartDate, inputEndDate]);

  useEffect(() => {
    if (inputTitle || inputContent || imageURL || inputTag || tagList || inputPlayTitle || inputLocation || inputHost || inputRuntime || inputStartDate || inputEndDate)
      setInput(true);
    else setInput(false);
  }, [inputTitle, inputContent, imageURL, inputTag, inputPlayTitle, inputLocation, inputHost, inputRuntime, inputStartDate, inputEndDate]);

  return (
    <div className="post-form-box">
      <div className="form-header">
        <h2 className="title">홍보 게시글 수정하기</h2>
      </div>

      <div className="add-info">
        <div className="flex-box category">
          <div className="input">
            <label htmlFor="">카테고리</label>
            <RadioGroup name="controlled-radio-buttons-group" value={inputCategory} onChange={(e) => setInputCategiry(e.target.value)}>
              <FormControlLabel value="연극" control={<Radio size="small" />} label="연극" disabled={inputCategory !== "연극"} />
              <FormControlLabel value="기타" control={<Radio size="small" />} label="기타" disabled={inputCategory !== "기타"} />
            </RadioGroup>
          </div>
        </div>

        <div className="flex-box title">
          <div className="input">
            <label htmlFor="play-title">
              {inputCategory === "연극" ? "연극명" : "행사명"}
              <span className="star">*</span>
            </label>
            <input
              type="text"
              id="play-title"
              name="play-title"
              value={inputPlayTitle}
              onChange={handleChangePlayTitle}
              maxLength={30}
              placeholder={`${inputCategory === "연극" ? "연극명" : "행사명"}을 작성해 주세요.`}
              required
            />
          </div>
          {handleErrorPlaceholder(errorPlayTitle)}
        </div>

        <div className="flex-box">
          <div className="input">
            <label htmlFor="location">장소</label>
            <input type="text" id="location" name="location" value={inputLocation} onChange={handleChangeLocation} maxLength={40} placeholder="장소를 작성해 주세요." />
          </div>
        </div>

        <div className="flex-box">
          <div className="input">
            <label htmlFor="host">주최</label>
            <input type="text" id="host" name="host" value={inputHost} onChange={handleChangeHost} maxLength={20} placeholder="주최자 또는 기관을 작성해 주세요." />
          </div>
        </div>

        {inputCategory === "연극" && (
          <div className="flex-box running-time">
            <div className="input">
              <label htmlFor="running-time" className="lable">
                러닝타임
              </label>
              <input
                type="number"
                id="running-time"
                name="running-time"
                value={inputRuntime}
                min="0"
                max="300"
                onChange={(e) => setInputRuntime(e.target.value)}
                maxLength={30}
                placeholder="100"
              />
              <span>분</span>
            </div>
          </div>
        )}

        <div className="flex-box date">
          <div className="input">
            <label htmlFor="date">
              기간<span className="star">*</span>
            </label>
            <input id="date" className="hidden" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DesktopDatePicker"]}>
                <DatePicker
                  label="시작"
                  format="YYYY-MM-DD"
                  value={inputStartDate}
                  minDate={dayjs().subtract(1, "month").startOf("day")}
                  maxDate={dayjs().add(1, "year").endOf("day")}
                  onChange={(value) => setInputStartDate(value)}
                  slotProps={{ textField: { size: "small" } }}
                  onError={handleErrorDate}
                  size="small"
                />
                <span className="line">-</span>
                <DatePicker
                  label="종료"
                  format="YYYY-MM-DD"
                  value={inputEndDate}
                  minDate={dayjs().isAfter(inputStartDate) ? dayjs() : inputStartDate}
                  maxDate={dayjs().add(1, "year").endOf("day")}
                  onChange={(value) => setInputEndDate(value)}
                  slotProps={{ textField: { size: "small" } }}
                  onError={handleErrorDate}
                  size="small"
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          {handleErrorPlaceholder(errorDate)}
        </div>
      </div>

      <div className="flex-box title">
        <div className="input">
          <label htmlFor="title">
            글 제목<span className="star">*</span>
          </label>
          <input type="text" id="title" name="title" value={inputTitle} onChange={handleChangeTitle} maxLength={40} placeholder="제목을 작성해 주세요." required />
        </div>
        {handleErrorPlaceholder(errorTitle)}
      </div>

      <div className="input content flex-box">
        <label htmlFor="content">
          내용<span className="star">*</span>
        </label>
        <textarea id="content" name="content" value={inputContent} onChange={handleChangeContent} placeholder="내용을 작성해 주세요." required></textarea>
        {handleErrorPlaceholder(errorContent)}
      </div>

      <div className="input tag flex-box">
        <div>
          <label htmlFor="tags">태그</label>
          <input
            type="text"
            id="tags"
            name="tags"
            onKeyDown={handleOnKeyDownTag}
            value={inputTag}
            onChange={handleChangeTag}
            placeholder="엔터를 입력하여 태그를 등록할 수 있습니다."
            maxLength={15}
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

      <div className="input image">
        <div>
          <label htmlFor="main-image">
            대표이미지<span className="star">*</span>
          </label>
          <Button id="imageBtn" color="darkGray" variant="outlined" size="small" startIcon={<DriveFolderUploadIcon />}>
            <label className="pointer" htmlFor="main-image">
              파일 찾기
            </label>
          </Button>
          <span className={"placeholder " + warningMainImage}>(세로 이미지 권장)</span>
          <input type="file" id="main-image" name="main-image" accept="image/*" onChange={handleChangeMainImage} required />
        </div>
        {errorMainImage && (
          <div className="error">
            <ErrorOutlineIcon fontSize="inherit" />
            {errorMainImage}
          </div>
        )}
        {mainImageURL && (
          <div className="main image">
            <img src={mainImageURL} onError={(e) => (e.target.src = empty_img)} />
            <IconButton className="icon" onClick={handleRemoveMainImage}>
              <Close />
            </IconButton>
          </div>
        )}
      </div>

      <div className="input image">
        <div>
          <label htmlFor="image">추가이미지</label>
          <Button id="imageBtn" color="darkGray" variant="outlined" size="small" startIcon={<DriveFolderUploadIcon />}>
            <label className="pointer" htmlFor="image">
              파일 찾기
            </label>
          </Button>
          <input type="file" id="image" name="image" accept="image/*" multiple onChange={handleChangeImage} required />
        </div>
        {errorImage && (
          <div className="error">
            <ErrorOutlineIcon fontSize="inherit" />
            {errorImage}
          </div>
        )}
        {imageURL[0] && (
          <div className="preview-box">
            {Children.toArray(
              imageURL.map((url, idx) => (
                <div className="image">
                  <img src={url} />
                  <IconButton id={idx.toString()} className="icon" onClick={handleRemoveImage}>
                    <Close />
                  </IconButton>
                </div>
              ))
            )}
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
          onclick={() => {
            handleSubmit();
          }}
          checkBtn={"확인"}
          closeBtn={"취소"}
          checkBtnColor={"#42BB48"}
        />
        <AlertCustom
          open={openComplete}
          onclose={() => {
            setOpenComplete(false);
            nav("/promotion");
          }}
          onclick={() => {
            setOpenComplete(false);
            nav("/promotion");
          }}
          title={"teenybox.com 내용:"}
          content={"글 수정이 완료되었습니다!"}
          btnCloseHidden={true}
          time={1000}
        />
      </Backdrop>
    </div>
  );
}
