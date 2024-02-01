import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    bgcolor: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Modal open={true}>
      <Box sx={style}>
        <CircularProgress color="secondary" />
      </Box>
    </Modal>
  );
}
