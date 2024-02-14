import React, { useContext, useState } from "react";
import "./MemberDeletion.scss";
import Button from "@mui/material/Button";
import { AlertCustom } from "../common/alert/Alerts";
import { userUrl } from "../../apis/apiURLs";
import { useNavigate } from "react-router";
import { Backdrop, Checkbox, FormControlLabel } from "@mui/material";
import { Link } from "react-router-dom";

function MemberDeletion({ user, setUserData }) {
  const [openAlert, setOpenAlert] = useState(false);
  const [checked, setChecked] = useState(false);
  const nav = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await fetch(`${userUrl}`, { method: "DELETE", credentials: "include" });
      const data = await res.json();

      if (res.ok) {
        setUserData({ isLoggedIn: false });
        nav(`/`);
      } else if (res.status === 401 || res.status === 403) {
        const loginRes = await fetch(`${userUrl}`, { credentials: "include" });
        if (loginRes.ok) {
          handleDelete();
        } else {
          setUserData({ isLoggedIn: false });
          return nav(`/signup-in`);
        }
      } else {
        console.error(data);
      }
    } catch (e) {
      setOpenFetchErrorAlert(true);
    }
  };

  const handleChangCheck = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <>
      <div className="member-deletion-container">
        <div className="header">
          <h1>회원탈퇴</h1>
        </div>
        <div className="member-deletion-text-box">
          <p>
            회원 탈퇴일로부터 계정과 닉네임을 포함한 계정 정보(아이디/닉네임/프로필사진)는
            <br />
            <Link to={"/privacy-policy"}>개인정보 처리방침</Link>에 따라 6개월간 보관(잠김)되며, 6개월 경과된 후에는 모든 개인 정보는 완전히 삭제되며
            <br /> 더 이상 복구할 수 없게 됩니다.
          </p>
          <p>단, 6개월 이내에 재가입 시 기존의 모든 데이터는 유지됩니다.</p>
          <p>작성된 게시물은 삭제되지 않으며, 익명처리 후 TeenyBox 로 소유권이 귀속됩니다.</p>
        </div>
        <div className="check-box">
          <FormControlLabel label="계정 삭제에 관한 정책을 읽고 이에 동의합니다." control={<Checkbox checked={checked} onChange={handleChangCheck} />} />
        </div>
        <Button disabled={!checked} onClick={() => setOpenAlert(true)} variant="contained" color="red" sx={{ width: "180px", height: "48px" }}>
          <h4>티니박스 서비스 탈퇴</h4>
        </Button>
      </div>
      <Backdrop open={openAlert} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <AlertCustom
          severity="error"
          open={openAlert}
          onclose={() => setOpenAlert(false)}
          onclick={() => handleDelete()}
          checkBtn={"확인"}
          closeBtn={"취소"}
          checkBtnColor={"#fa2828"}
          title={"teenybox.com 내용:"}
          width={500}
          content={
            <p>
              탈퇴시 회원정보는 삭제되며 복구가 불가능합니다.
              <br /> 정말 탈퇴하시겠습니까?
            </p>
          }
        />
      </Backdrop>
    </>
  );
}

export default MemberDeletion;
