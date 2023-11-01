import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import "./FreeBoardPost.scss";
import { Alert, AlertTitle, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function FreeBoardPost() {
  const [open, setOpen] = useState(false);

  return (
    <div className="free-board-post">
      <div className="top">
        <AccountCircleIcon sx={{ fontSize: 50 }} />
        <div className="flex-box">
          <div className="user-id">user123</div>
          <div className="date">2023-10-31</div>
        </div>
        <div className="icons">
          <ShareOutlinedIcon className="share-icon pointer" onClick={() => setOpen(true)} />
          <div className="comments-icon pointer" onClick={() => (location.href = "#commentForm")}>
            <SmsOutlinedIcon />
            <span>3</span>
          </div>
        </div>
      </div>
      <h2 className="title">title</h2>
      <div>
        sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다
      </div>
      <Snackbar open={open} onClose={() => setOpen(false)} autoHideDuration={1500} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert
          sx={{ width: 500 }}
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>URL이 복사되었습니다!</AlertTitle>
          <small>{window.location.href}</small>
        </Alert>
      </Snackbar>
    </div>
  );
}
