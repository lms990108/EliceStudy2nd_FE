import React from "react";
import Alert from "@mui/material/Alert";
import "./ReviewErrorBox.scss";

export default function ReviewErrorBox({ errorText }) {
  return (
    <div className="review-error-box-container">
      <Alert className="review-error-box" severity="error">
        {errorText}
      </Alert>
    </div>
  );
}
