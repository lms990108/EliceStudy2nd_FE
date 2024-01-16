import useAuthorization from "../../hooks/authoriaztionHooks/useAuthorization";

export default function NaverRedirection() {
  const authorizationCode = new URL(window.location.href).searchParams.get(
    "code"
  );
  const state = new URL(window.location.href).searchParams.get("state");

  // 인가코드가 존재하면 서버로 전송
  if (authorizationCode) {
    return useAuthorization({ authorizationCode, state }, "naver");
  } else {
    console.error("인가코드가 없습니다.");
  }
}
