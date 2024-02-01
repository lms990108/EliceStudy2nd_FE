import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import "./UpButton.scss";

export function BackButton({ state }) {
  const nav = useNavigate();

  const moveToPlayPage = () => {
    nav("/play", { state: { prevInfo: state } });
  };

  return (
    <Tooltip title="이전 페이지로 가기" arrow>
      <AssignmentReturnIcon
        sx={{
          position: "fixed",
          left: "95.3%",
          width: "50px",
          height: "50px",
          bottom: "95px",
          cursor: "pointer",
        }}
        onClick={() => moveToPlayPage()}
      />
    </Tooltip>
  );
}
