import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCustom } from "../../components/common/alert/Alerts";

// 소셜 로그인, 회원가입 시 사용하는 인가 커스텀 훅
export default function useAuthorization(authorizationInfo, socialProvider) {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  console.log({ ...authorizationInfo });

  useEffect(() => {
    fetch(`https://dailytopia2.shop/api/user/${socialProvider}-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...authorizationInfo }),
      credentials: "include",
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          // 마지막으로 로그인한 계정 저장
          localStorage.setItem("social_provider", socialProvider);
          setAlert({
            title: "로그인 성공",
            content: "Teeny Box에 로그인 되었습니다.",
            severity: "success",
          });
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          res.json().then((data) => {
            setAlert({
              title: "추가정보 입력 필요",
              content: "회원가입을 위한 추가정보 입력 페이지로 이동합니다.",
              severity: "info",
            });
            setTimeout(() => {
              setAlert(null);
              navigate("/additional-user-info", {
                state: {
                  id: data[`${socialProvider}UserData`]["id"],
                  existingNickname:
                    data[`${socialProvider}UserData`]["nickname"],
                  profileUrl: data[`${socialProvider}UserData`]["profileUrl"],
                  socialProvider,
                  isFromSignUpPage: true,
                },
              });
            }, 2000);
          });
        }
      })
      .catch((error) => {
        console.error("네트워크 오류", error);
        setAlert({
          title: "오류 발생",
          content: "회원가입/로그인 중 오류가 발생하였습니다.",
          severity: "error",
          onclose: () => setAlert(null),
          onclick: () => setAlert(null),
          checkBtn: "확인",
        });
      });
  }, []);

  return (
    <div>
      {alert && (
        <AlertCustom
          open={true}
          title={alert.title}
          content={alert.content}
          severity={alert.severity}
          btnCloseHidden={true}
          onclose={alert.onclose}
          onclick={alert.onclick}
          checkBtn={alert.checkBtn}
        />
      )}
    </div>
  );
}
