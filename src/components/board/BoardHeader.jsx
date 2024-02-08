import { useNavigate } from "react-router-dom/dist";
import "./BoardHeader.scss";
import { KeyboardDoubleArrowLeftOutlined } from "@mui/icons-material";

export function BoardListHeader({ header }) {
  return (
    <div className="board-list-header">
      <h2>{header}</h2>
    </div>
  );
}

export function BoardSecondHeader({ header }) {
  const nav = useNavigate();

  return (
    <div className="board-second-header">
      <div className="click-box pointer" onClick={() => nav(-1)}>
        <KeyboardDoubleArrowLeftOutlined sx={{ fontSize: 18 }} />
        <span className="header-title">{header}</span>
      </div>
      <hr />
    </div>
  );
}
