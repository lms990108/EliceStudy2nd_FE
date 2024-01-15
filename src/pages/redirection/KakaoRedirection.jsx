import useAuthorization from "../../hooks/authoriaztionHooks/useAuthorization";

export default function KakaoRedirection() {
  const authorizationCode = new URL(window.location.href).searchParams.get(
    "code"
  );
  // 인가코드가 존재하면 서버로 전송
  if (authorizationCode) {
    // useAuthorization 커스텀 훅은 alert 관련 jsx 코드를 반환하므로 이를 랜더링하려면 return을 적어주어야 함!
    return useAuthorization({ authorizationCode }, "kakao");
  } else {
    console.error("인가코드가 없습니다.");
  }
}
