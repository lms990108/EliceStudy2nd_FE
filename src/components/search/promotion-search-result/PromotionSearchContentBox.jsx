import { Link } from "react-router-dom";
import "./PromotionSearchContentBox.scss";
import dayjs from "dayjs";
import empty_img from "../../../assets/img/empty_img.svg";

export default function PromotionSearchContentBox({ content }) {
  return (
    <div className="promotion-search-content-box">
      <div className="promotion-img-container">
        <Link to={`/promotion/${content.promotion_number}`} style={{ margin: 0 }}>
          <img src={content.image_url[0]} onError={(e) => (e.target.src = empty_img)} />
        </Link>
      </div>
      <div className="promotion-info">
        <div className="info">
          <div className="title">
            <div className={`category ${content.category !== "연극" ? " blue" : ""}`}>{content.category}</div>
            <h3>
              <Link to={`/promotion/${content.promotion_number}`} style={{ margin: 0 }}>
                {content.play_title}
              </Link>
            </h3>
          </div>

          <p>{content.title}</p>
          <p>
            기간 : {dayjs(content.start_date).format("YYYY-MM-DD")} ~ {dayjs(content.end_date).format("YYYY-MM-DD")}
          </p>
          {content.location && <p>장소 : {content.location}</p>}
          {content.runtime && <p>러닝타임 : {content.runtime}</p>}
          {content.host && <p>주최 : {content.host}</p>}
        </div>
        <div className="tags">
          {content.tags.map((tag, idx) => (
            <Link className="tag" key={idx}>
              # {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
