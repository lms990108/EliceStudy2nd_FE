import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function NotFoundRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("없는 페이지로 이동");
    navigate("/not-found");
  }, []);
}
