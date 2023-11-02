import { Alert, AlertTitle, Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import React from "react";

// 필수
// open : const [open, setOpen] = useState(false); 셋팅 후 open={open} 로 넘겨주세용
// onclose : onclose={() => setOpen(false)}를 넘겨주세용

// 버튼 관련 속성(선택)
// onclick : 체크 아이콘 클릭 시 실행할 동작. 없으면 체크 아이콘 안 보임
// checkBtn : 체크 아이콘 대신 넣을 버튼 텍스트(예를 들어 '확인')
// closeBtn : 닫힘 아이콘 대신 넣을 버튼 텍스트(예를 들어 '취소')
// btnCloseHidden : true로 넘기면 X(버튼) 안 보임

//내용 속성(선택)
// title : 타이틀 - 위쪽에 굵은 글씨로 나타남
// content : 내용 - react element 형태로 넣어도 됨 ex) <small>내용</small>

// 기타(선택)
// severity : error, warning, info, success(기본)
// time : ms 후 자동 닫힘
// width : alert창 너비 - 숫자로 보내주세요!(기본 500)
// color : 기본 색상 (primary, secondary ...) 변경 가능

export function AlertCustom({ open, onclose, onclick, checkBtn, closeBtn, btnCloseHidden, title, content, time, severity, width = 500, color }) {
  return (
    <Snackbar open={open} onClose={onclose} autoHideDuration={time || null} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <Alert
        sx={{ width }}
        severity={severity || "success"}
        color={color || null}
        action={
          <>
            {onclick &&
              (btnText ? (
                <Button
                  aria-label="check"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    onclick();
                    onclose();
                  }}
                >
                  {checkBtn}
                </Button>
              ) : (
                <IconButton
                  aria-label="check"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    onclick();
                    onclose();
                  }}
                >
                  <CheckIcon fontSize="inherit" />
                </IconButton>
              ))}
            {btnCloseHidden || closeBtn ? (
              <Button aria-label="close" color="inherit" size="small" onClick={onclose}>
                {closeBtn}
              </Button>
            ) : (
              <IconButton aria-label="close" color="inherit" size="small" onClick={onclose}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            )}
          </>
        }
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {content}
      </Alert>
    </Snackbar>
  );
}
