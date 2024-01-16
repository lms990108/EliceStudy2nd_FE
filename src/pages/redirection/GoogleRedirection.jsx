import useAuthorization from "../../hooks/authoriaztionHooks/useAuthorization";

export default function GoogleRedirection() {
  const authorizationCode = new URL(window.location.href).searchParams.get(
    "code"
  );

  // 인가코드가 존재하면 서버로 전송
  if (authorizationCode) {
    return useAuthorization({ authorizationCode }, "google");
  } else {
    console.error("인가코드가 없습니다.");
  }
}
