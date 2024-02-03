import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

export default function DisableModal() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Modal
      open={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ sx: { backgroundColor: "transparent" } }}
    >
      <Box sx={{ style }}></Box>
    </Modal>
  );
}
