import { useContext, useEffect } from "react";
import { AppContext } from "../../App";

export default function useGetUser() {
  const { userData, setUserData } = useContext(AppContext);

  const getUserData = async () => {
    try {
      const res = await fetch(`https://dailytopia2.shop/api/users`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUserData({ isLoggedIn: true, user: data.user });
      } else if (res.status === 401 || res.status === 403) {
        // 다시 한 번 시도
        try {
          const secondRes = await fetch(`https://dailytopia2.shop/api/users`, {
            credentials: "include",
          });

          if (secondRes.ok) {
            const secondData = await secondRes.json();
            setUserData({ isLoggedIn: true, user: secondData.user });
          } else {
            // 두 번째 시도에서도 오류가 발생하면 isLoggedIn을 false로 설정
            setUserData({ isLoggedIn: false });
          }
        } catch (secondErr) {
          console.error(secondErr);
          // 두 번째 시도 자체가 실패하면 isLoggedIn을 false로 설정
          setUserData({ isLoggedIn: false });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return userData;
}
