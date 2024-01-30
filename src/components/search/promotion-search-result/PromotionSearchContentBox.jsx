import { Link } from "react-router-dom";
import "./PromotionSearchContentBox.scss";
import { format } from "date-fns";

export default function PromotionSearchContentBox({ content }) {
  return (
    <div className="promotion-search-content-box">
      <div className="promotion-img-container">
        <Link to={`/promotion/${content.promotion_number}`} style={{ margin: 0 }}>
          <img src={content.image_url} />
        </Link>
      </div>
      <div className="promotion-info">
        <Link to={`/promotion/${content.promotion_number}`} style={{ margin: 0 }}>
          <h3>{content.title}</h3>
          <p>{content.content}</p>
          <div className="tags">
            {content.tags.map((tag, idx) => (
              <p key={idx}># {tag}</p>
            ))}
          </div>
          <p>{format(new Date(content.createdAt), "yyyy-MM-dd")}</p>
        </Link>
      </div>
    </div>
  );
}
