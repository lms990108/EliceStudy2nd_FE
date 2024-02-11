import React, { useContext, useEffect, useState } from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";
import Tooltip from "@mui/material/Tooltip";
import { AlertCustom } from "../alert/Alerts";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

const Footer = () => {
  // 알람
  const [alert, setAlert] = useState(null);
  // 링크 복사 버튼 클릭 시
  const handleLinkShareBtnClick = async (currentPath) => {
    try {
      await navigator.clipboard.writeText(currentPath);
      setAlert({
        title: "링크 복사 완료",
        content: "현재 페이지의 링크가 복사되었습니다.",
        open: true,
        onclose: () => setAlert(null),
        severity: "success",
      });
    } catch (err) {
      setAlert({
        title: "링크 복사 실패",
        content: "현재 페이지 링크 복사에 실패하였습니다.",
        open: true,
        onclose: () => setAlert(null),
        severity: "error",
      });
    }
  };

  return (
    <div className="footer-layout">
      {alert && (
        <AlertCustom
          title={alert.title}
          content={alert.content}
          open={alert.open}
          onclose={alert.onclose}
          severity={alert.severity}
        />
      )}
      <div className="footer-nav">
        <div className="footer-nav-tab1">
          <Link to="/privacy-policy">
            <p>개인정보 처리방침</p>
          </Link>
        </div>
        <div className="footer-nav-tab2">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfVEaTNtLfpYnCg1RFbDj77CI-2yrTLam9f8LoruiFaLi44Yw/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>문의 및 피드백</p>
          </a>
        </div>
      </div>
      <div className="footer-container">
        <div className="footer-inner-box">
          <p className="footer-comment">
            사이트 이용 중에 불편한 점이나 피드백이 있으시면 <a className="footer-text-link"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfVEaTNtLfpYnCg1RFbDj77CI-2yrTLam9f8LoruiFaLi44Yw/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
          >위 링크</a>를 통해
            의견을 보내주시면 감사하겠습니다.
          </p>
          <p className="footer-inner">
            주소: (04799) 서울특별시 성동구 아차산로17길 48 성수낙낙 2층
          </p>
          <p className="footer-inner">
            <span className="footer-span1">대표: 이민섭</span>
            <span className="footer-span2">
              E-mail: teenybox2023@gmail.com
            </span>
          </p>
          <p className="footer-copyright">
            COPYRIGHT © KOREA PERFORMING ARTS BOX OFFICE INFORMATION SYSTEM
          </p>
        </div>
        <div className="footer-logo-box">
          <Link to="/">
            <img
              className="footer-logo"
              src={process.env.PUBLIC_URL + "/logo2.png"}
              alt="logo-image"
              component={Link}
              to="/Main"
            ></img>
          </Link>
          <div className="footer-share">
            <Tooltip title="URL 복사" arrow>
              <ShareOutlinedIcon
                onClick={() => handleLinkShareBtnClick(window.location.href)}
                style={{ cursor: "pointer", width: "24px", height: "24px" }}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;