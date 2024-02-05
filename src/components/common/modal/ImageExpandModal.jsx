import { useState } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";

export default function ImageExpandModal({ imgSrc, setClickedPhoto }) {
  const [open, setOpen] = useState(true);

  const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const imgStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "100%",
    maxHeight: "100%",
    width: "500px",
    height: "450px",
  };

  const closeIconStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
  };

  const handleClose = () => {
    setOpen(false);
    setClickedPhoto(null);
  };

  return (
    <Modal
      open={open}
      BackdropComponent={(props) => (
        <Backdrop {...props} onClick={() => handleClose()} />
      )}
    >
      <Box sx={{ boxStyle }}>
        <img src={imgSrc} alt="확대된 리뷰 이미지" style={imgStyle} />
        <CloseIcon
          fontSize="large"
          color="ourGray"
          style={closeIconStyle}
          onClick={() => handleClose()}
        />
      </Box>
    </Modal>
  );
}
