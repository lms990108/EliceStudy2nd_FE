import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function CommonLayout({ setPrevPlayListQuery, children }) {
  const location = useLocation();

  useEffect(() => {
    const isPlayPage = location.pathname.startsWith("/play");

    if (!isPlayPage) {
      setPrevPlayListQuery(null);
    }
  }, [location.pathname]);

  return <>{children}</>;
}
