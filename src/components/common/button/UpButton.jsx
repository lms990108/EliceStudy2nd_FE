import React, { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "./UpButton.scss";

export function UpButton({ y }) {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > (y || 1500)) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    showButton && <ArrowUpwardIcon className="up-button" fontSize="large" onClick={scrollToTop} sx={{ color: "#ffffff", "@media (max-width: 780px)": { fontSize: "24px" } }} />
  );
}
