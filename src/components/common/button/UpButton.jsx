import React, { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "./UpButton.scss";

export function UpButton() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 1500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    console.log(window.scrollY);
    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return showButton && <ArrowUpwardIcon className="up-button" onClick={scrollToTop} fontSize="large" sx={{ color: "#ffffff" }} />;
}
