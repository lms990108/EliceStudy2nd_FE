import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./CloseIconArea.scss";
import { AlertCustom } from "../../common/alert/Alerts";

export default function CloseIconArea() {
  const [alert, setAlert] = useState(null);

  return (
    <>
      {/* {alert && (
        <AlertCustom
          severity="warning"
          onclose={() => setAlert(null)}
          open={Boolean(alert)}
          title="추가정보 입력 건너뛰기"
          content={alert}
          checkBtn="확인"
          closeBtn="취소"
          onclick={() => {}}
        />
      )}
      <div className="close-icon-area">
        <CloseIcon
          fontSize="medium"
          color="secondary"
          onClick={() =>
            setAlert(
              "회원정보 추가입력을 건너뛰시겠습니까? 지금까지 작성한 추가입력 정보는 저장되지 않고, 기본 정보로 가입이 완료됩니다."
            )
          }
        />
      </div> */}
    </>
  );
}
