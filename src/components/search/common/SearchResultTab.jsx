import { useSearchParams } from "react-router-dom/dist";
import "./SearchResultTab.scss";

export default function SearchResultTab({ selectedTabMenu, setSelectedTabMenu }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeTabMenu = (menu) => {
    setSelectedTabMenu(menu);
    if (searchParams.get("type") !== "tag") {
      searchParams.delete("type");
      setSearchParams(searchParams);
    }
  };

  return (
    <section className="search-result-tab-container">
      <div className={`menu ${selectedTabMenu === "연극" ? "active-tab" : null}`} onClick={() => handleChangeTabMenu("연극")}>
        연극
      </div>
      <div className={`menu ${selectedTabMenu === "홍보게시글" ? "active-tab" : null}`} onClick={() => handleChangeTabMenu("홍보게시글")}>
        홍보게시글
      </div>
      <div className={`menu ${selectedTabMenu === "커뮤니티" ? "active-tab" : null}`} onClick={() => handleChangeTabMenu("커뮤니티")}>
        커뮤니티
      </div>
    </section>
  );
}
