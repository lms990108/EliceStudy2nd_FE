// import useAuthorization from "../../hooks/authoriaztionHooks/useAuthorization";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCustom } from "../../components/common/alert/Alerts";

export default function KakaoRedirection({ popup, setPopup }) {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const currentUrl = window.location.href;
    const searchParams = new URL(currentUrl).searchParams;
    const code = searchParams.get("code");
    if (code) {
      window.opener.postMessage({ code }, window.location.origin);
    }
  }, []);

  // 로그인 팝입이 열리면 로그인 로직을 처리합니다.
  useEffect(() => {
    if (!popup) {
      return;
    }

    const kakaoOauthCodeListener = (e) => {
      if (e.origin !== window.location.origin) {
        console.log("hi");
        return;
      }

      const { code } = e.data;
      const authorizationCode = code;

      if (authorizationCode) {
        popup.close();
        console.log(`The popup URL has URL code param = ${authorizationCode}`);

        // 가져온 code 로 다른 정보를 가져오는 API 호출
        fetch(`https://dailytopia2.shop/api/users/login/kakao`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ authorizationCode }),
          credentials: "include",
        })
          .then((res) => {
            console.log(res);
            if (res.ok) {
              // 마지막으로 로그인한 계정 저장
              localStorage.setItem("social_provider", "kakao");
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
                      id: data[`kakaoUserData`]["id"],
                      existingNickname: data[`kakaoUserData`]["nickname"],
                      profileUrl: data[`kakaoUserData`]["profileUrl"],
                      socialProvider: "kakao",
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
      } else {
        console.error("인가코드가 없습니다.");
      }
      popup?.close();
      setPopup(null);
    };

    window.addEventListener("message", kakaoOauthCodeListener, false);

    return () => {
      window.removeEventListener("message", kakaoOauthCodeListener);
      popup?.close();
      setPopup(null);
    };
  }, [popup]);

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
