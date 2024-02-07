import { Link } from "react-router-dom";
import "./PlaySearchContentBox.scss";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

export default function PlaySearchContentBox({
  showId,
  imgSrc,
  location,
  title,
  startDate,
  endDate,
  price,
  state,
}) {
  return (
    <div className="play-search-content-box">
      <div className="play-img-container">
        <Link to={`/play/${showId}`} style={{ margin: 0 }}>
          <img src={imgSrc} />
        </Link>
      </div>
      <div className="play-info">
        <Link to={`/play/${showId}`} style={{ margin: 0 }}>
          <h3>{title}</h3>
          <p className="location">
            {location.length >= 30 ? `${location.slice(0, 28)}...` : location}
          </p>
          <p>
            {startDate.split("T")[0]} ~ {endDate.split("T")[0]}
          </p>
          <h3>{price.length >= 45 ? `${price.slice(0, 45)}...` : price}</h3>
        </Link>
      </div>
      <div className="reservation-btn">
        {state !== "공연완료" ? (
          <a
            href={`https://tickets.interpark.com/contents/search?keyword=${title}&start=0&rows=20`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              disableElevation
            >
              <Typography>예매하러 가기</Typography>
            </Button>
          </a>
        ) : (
          <Tooltip
            title="본 연극은 종료되어 예매 링크가 제공되지 않습니다."
            arrow
          >
            <div className="reservation-disabled">
              <Button variant="contained" disabled>
                <Typography className="button-text" disableElevation>
                  예매하러 가기
                </Typography>
              </Button>
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
