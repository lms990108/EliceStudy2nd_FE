import { useState, useEffect } from "react";
import { AlertCustom } from "../../components/common/alert/Alerts";

// 유저가 로그인되어 있는지 확인하고 로컬스토리지에 상태를 저장하는 훅
export default function useCheckLogin() {
  // 에러를 띄우기 위한 상태 정의
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://dailytopia2.shop/api/users/login-status`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("isLoggedIn", data.isLoggedIn);
        if (data.isLoggedIn) {
          localStorage.setItem("profile_url", data.user.profile_url);
          localStorage.setItem("createdAt", data.user.createdAt);
          localStorage.setItem("role", data.user.role);
          localStorage.setItem("updatedAt", data.user.updatedAt);
          localStorage.setItem("nickname", data.user.nickname);
          localStorage.setItem("interested_area", data.user.interested_area);
        } else {
          localStorage.removeItem("profile_url");
          localStorage.removeItem("createdAt");
          localStorage.removeItem("role");
          localStorage.removeItem("updatedAt");
          localStorage.removeItem("nickname");
          localStorage.removeItem("interested_area");
        }
      })
      .catch((err) => {
        if (err.code !== "401") {
          setError(
            "현재 로그인된 사용자 정보를 가져오는 중 오류가 발생하였습니다."
          );
        }
      });
  }, []);

  return (
    <>
      {error && (
        <AlertCustom
          title={"Error"}
          content={error}
          open={true}
          onclose={
            // 에러 상태에서 현재 에러를 제외한 나머지 에러들을 유지
            () => setError(null)
          }
          severity={"error"}
        />
      )}
    </>
  );
}
