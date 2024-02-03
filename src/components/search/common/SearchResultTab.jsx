import "./SearchResultTab.scss";

export default function SearchResultTab({ totalCnt, selectedTabMenu, setSelectedTabMenu }) {
  const handleChangeTabMenu = (menu) => {
    setSelectedTabMenu(menu);
  };

  return (
    <section className="search-result-tab-container">
      <div className={`menu ${selectedTabMenu === "연극" ? "active-tab" : null}`} onClick={() => handleChangeTabMenu("연극")}>
        연극 ({totalCnt.play})
      </div>
      <div className={`menu ${selectedTabMenu === "홍보게시글" ? "active-tab" : null}`} onClick={() => handleChangeTabMenu("홍보게시글")}>
        홍보게시글 ({totalCnt.promotion})
      </div>
      <div className={`menu ${selectedTabMenu === "커뮤니티" ? "active-tab" : null}`} onClick={() => handleChangeTabMenu("커뮤니티")}>
        커뮤니티 ({totalCnt.community})
      </div>
    </section>
  );
}
