import { useState, useEffect } from "react";
// <'OOO' 검색 결과> 띄우기 위한 컴포넌트 (공통)
import SearchResultHeader from "../../components/search/common/SearchResultHeader";
// 총 검색 결과 개수 띄우기 위한 컴포넌트 (공통)
import SearchResultCount from "../../components/search/common/SearchResultCount";
// 연극/홍보게시물/자유게시물 선택 탭 띄우기 위한 컴포넌트 (공통)
import SearchResultTab from "../../components/search/common/SearchResultTab";
// 연극 검색 결과 띄우기 위한 컴포넌트 (여기서부터는 개별로)
import PlaySearchResult from "../../components/search/play-search-result/PlaySearchResult";
import "./SearchResultPage.scss";
import Loading from "../../components/common/state/Loading";
import PromotionSearchResult from "../../components/search/promotion-search-result/PromotionSearchResult";
import CommunitySearchResult from "../../components/search/community-search-result/CommunitySearchResult";
import { AlertCustom } from "../../components/common/alert/Alerts";
import { useNavigate, useSearchParams } from "react-router-dom/dist";
import ScrollToTop from "../../hooks/useScrollToTop";

export default function SearchResultPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  // 검색어
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get("query"));

  // 로딩중 여부
  const [isLoading, setIsLoading] = useState(true);
  // 연극/홍보게시물/자유게시물 선택 탭에서 현재 선택되어 있는 메뉴
  const [selectedTabMenu, setSelectedTabMenu] = useState(
    searchParams.get("category") || "연극"
  );
  // 연극 검색 결과
  const [playSearchResult, setPlaySearchResult] = useState(null);
  const [totalCnt, setTotalCnt] = useState(null);

  // 연극 검색 결과 정렬 기준
  const [sortStandard, setSortStandard] = useState("recent");
  // 연극 검색 결과 현재 페이지
  const [playCurPage, setPlayCurPage] = useState(1);

  // alert
  const [alert, setAlert] = useState(null);

  const getPlaySearchResult = async () => {
    if (!searchKeyword) {
      setPlaySearchResult([]);
      setTotalCnt(0);
      setIsLoading(false);
    } else {
      try {
        const res = await fetch(
          `https://dailytopia2.shop/api/shows?title=${searchKeyword}&order=${sortStandard}&page=${playCurPage}&limit=10`
        );
        const data = await res.json();

        if (res.ok) {
          setPlaySearchResult(data.shows);
          setTotalCnt(data.total);
          setIsLoading(false);
          window.scrollTo(0, 0);
        } else {
          setPlaySearchResult("error");
          setTotalCnt(0);
          setIsLoading(false);
        }
      } catch (err) {
        setPlaySearchResult("error");
        setTotalCnt(0);
        setIsLoading(false);
      }
    }
  };

  // 연극 검색 결과 받아오기
  useEffect(() => {
    getPlaySearchResult();
  }, [sortStandard, playCurPage]);

  useEffect(() => {
    if (selectedTabMenu === "연극") {
      searchParams.delete("type");
    }
    searchParams.set("category", selectedTabMenu);
    setSearchParams(searchParams);
  }, [selectedTabMenu]);

  return (
    <div className="bg-gray">
      {alert && (
        <AlertCustom
          title={alert.title}
          content={alert.content}
          open={alert.open}
          onclose={alert.onclose}
          severity={alert.severity}
        />
      )}
      {isLoading && !playSearchResult && <Loading />}
      {!isLoading && playSearchResult && (
        <div className="search-result-container">
          <SearchResultHeader searchKeyword={searchKeyword} />
          <SearchResultTab
            selectedTabMenu={selectedTabMenu}
            setSelectedTabMenu={setSelectedTabMenu}
          />
          {selectedTabMenu === "연극" && (
            <PlaySearchResult
              playSearchResult={playSearchResult}
              setPlaySearchResult={setPlaySearchResult}
              curPage={playCurPage}
              setCurPage={setPlayCurPage}
              playTotalCnt={totalCnt}
              searchKeyword={searchKeyword}
              setAlert={setAlert}
              setSortStandard={setSortStandard}
              getPlaySearchResult={getPlaySearchResult}
            />
          )}
          {selectedTabMenu === "홍보게시판" && (
            <PromotionSearchResult searchKeyword={searchKeyword} />
          )}
          {selectedTabMenu === "커뮤니티" && (
            <CommunitySearchResult searchKeyword={searchKeyword} />
          )}
        </div>
      )}
    </div>
  );
}
