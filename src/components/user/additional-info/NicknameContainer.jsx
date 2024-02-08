import { useState, useEffect } from "react";
import "./NicknameContainer.scss";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export default function NicknameContainer({
  nicknameInfo,
  setNicknameInfo,
  user_id,
}) {
  const [alert, setAlert] = useState(null);

  // 닉네임 중복 확인
  const duplicationCheck = () => {
    // 닉네임 길이부터 확인
    if (nicknameInfo.nickname.length === 0) {
      setAlert({
        severity: "error",
        message: "닉네임은 최소 1자 이상 적어주세요.",
      });
      return;
    }

    // 특수 문자나 숫자가 닉네임에 포함되어 있는지를 확인
    const regex = /[!@#$%^&*(),.?":{}|<>0-9]/;
    if (regex.test(nicknameInfo.nickname)) {
      setAlert({
        severity: "error",
        message: "닉네임에 특수 문자나 숫자는 사용이 불가합니다.",
      });
      return;
    }

    // 중복 확인 로직
    fetch("https://dailytopia2.shop/api/users/nickname", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        nickname: nicknameInfo.nickname,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setAlert({
            severity: "success",
            message: "사용할 수 있는 닉네임입니다.",
          });
          setNicknameInfo((pre) => ({ ...pre, isDuplicationChecked: true }));
        } else {
          // 중복된 닉네임이면
          setAlert({ severity: "error", message: "중복된 닉네임입니다." });
        }
      })
      .catch(() =>
        setAlert({
          severity: "error",
          message: "닉네임 중복 확인 중 에러가 발생했습니다.",
        })
      );

    return;
  };

  return (
    <div className="nickname-input-container">
      <label>닉네임</label>
      <div className="nickname-input">
        <OutlinedInput
          color="orange"
          sx={{ height: "50px" }}
          inputProps={{ maxLength: 10 }}
          value={nicknameInfo.nickname}
          onChange={(e) =>
            setNicknameInfo((pre) => ({ ...pre, nickname: e.target.value }))
          }
          disabled={alert && alert.severity === "success"}
        />
        {alert && alert.severity === "success" ? (
          <Button
            variant="outlined"
            color="orange"
            onClick={() => {
              setNicknameInfo({ nickname: "", isDuplicationChecked: false });
              setAlert(null);
            }}
          >
            재설정
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="orange"
            onClick={() => duplicationCheck()}
          >
            중복 확인
          </Button>
        )}
      </div>
      <p>* 특수문자/숫자 제외 영문 or 한글로 1 ~ 10자리 입력</p>
      {alert && (
        <Alert
          severity={alert.severity}
          sx={{ padding: 0, border: "none" }}
          variant="outlined"
        >
          {alert.message}
        </Alert>
      )}
    </div>
  );
}
