import React, { useState, useRef, useEffect } from "react";
import "./SearchModal.scss";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const SearchModal = ({ onCloseModal }) => {
  const inputRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // input 요소에 포커스 주기
    }
  }, []);

  const handleCloseStart = () => {
    setIsClosing(true);
    setContentVisible(false);
    setTimeout(onCloseModal, 200); // 애니메이션 시간에 맞추어 모달을 닫습니다.
  };


  return (
    <>
      <div className="search-modal-backdrop" onClick={handleCloseStart}></div>
      <div className={`search-modal-container ${isClosing ? "closing" : ""}`}>
        <div className={`search-modal-box ${contentVisible ? "" : "hide-content"}`}>
          <SearchRoundedIcon className="search-modal-search-icon" />
          <input
            className="search-modal-input"
            ref={inputRef}
            placeholder="Teeny-Box.com 검색하기"
          ></input>
          <HighlightOffIcon className="search-modal-exit-icon" onClick={handleCloseStart}/>
          <div className="last-search-header-box">
            <div className="last-search-title">&nbsp;&nbsp;최근 검색어</div>
            <div className="last-search-delete"><DeleteOutlineIcon className="last-search-delete-icon"/>비우기&nbsp;&nbsp;</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
