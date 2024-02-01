import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// <'OOO' 검색 결과> 띄우기 위한 컴포넌트 (공통)
import SearchResultHeader from "../../components/search/common/SearchResultHeader";
// 총 검색 결과 개수 띄우기 위한 컴포넌트 (공통)
import SearchResultCount from "../../components/search/common/SearchResultCount";
// 연극/홍보게시물/자유게시물 선택 탭 띄우기 위한 컴포넌트 (공통)
import SearchResultTab from "../../components/search/common/SearchResultTab";
// 연극 검색 결과 띄우기 위한 컴포넌트 (여기서부터는 개별로)
import PlaySearchResult from "../../components/search/play-search-result/PlaySearchResult";
import "./SearchResultPage.scss";
import Loading from "../../components/common/loading/Loading";
import FreeBoardList from "../../components/board-free/FreeBoardList";
import { postUrl, promotionUrl } from "../../apis/apiURLs";
import PromotionSearchResult from "../../components/search/promotion-search-result/PromotionSearchResult";
import CommunitySearchResult from "../../components/search/community-search-result/CommunitySearchResult";
import { AlertCustom } from "../../components/common/alert/Alerts";

export default function SearchResultPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // 검색어
  const searchKeyword = queryParams.get("query");

  // 로딩중 여부
  const [isLoading, setIsLoading] = useState(true);
  // 연극/홍보게시물/자유게시물 선택 탭에서 현재 선택되어 있는 메뉴
  const [selectedTabMenu, setSelectedTabMenu] = useState("연극");
  // 연극 검색 결과
  const [playSearchResult, setPlaySearchResult] = useState(null);
  console.log(playSearchResult);
  const [promotionSearchResult, setPromotionSearchResult] = useState(null);
  const [communitySearchResult, setCommunitySearchResult] = useState(null);

  // 연극 검색 결과 정렬 기준
  const [sortStandard, setSortStandard] = useState("recent");
  // 연극 검색 결과 현재 페이지
  const [playCurPage, setPlayCurPage] = useState(1);
  // 연극 검색 결과 총 개수
  const [playTotalCnt, setPlayTotalCnt] = useState(0);

  // alert
  const [alert, setAlert] = useState(null);

  const getPlaySearchResult = async () => {
    try {
      const res = await fetch(
        `https://dailytopia2.shop/api/shows?title=${searchKeyword}&order=${sortStandard}&page=${playCurPage}&limit=10`
      );
      const data = await res.json();
      if (res.ok) {
        setPlaySearchResult(data.data);
        setPlayTotalCnt(data.total);
        setIsLoading(false);
      } else {
        setAlert({
          title: "오류",
          content: "연극 데이터를 가져오는 중 오류가 발생하였습니다.",
          open: true,
          onclose: () => setAlert(null),
          severity: "error",
        });
        setIsLoading(false);
      }
    } catch (err) {
      setAlert({
        title: "오류",
        content: "연극 데이터를 가져오는 중 오류가 발생하였습니다.",
        open: true,
        onclose: () => setAlert(null),
        severity: "error",
      });
      setIsLoading(false);
    }
  };

  const getPromotionSearchResult = async () => {
    const res = await fetch(`${promotionUrl}`);
    const data = await res.json();
    console.log(data);
    setPromotionSearchResult(data);
  };

  const getCommunitySearchResult = async () => {
    const res = await fetch(`${postUrl}`);
    const data = await res.json();
    console.log(data);
    setCommunitySearchResult(data);
  };

  // 검색 결과 받아오기
  useEffect(() => {
    getPromotionSearchResult();
    getCommunitySearchResult();
  }, []);

  // 연극 검색 결과 받아오기
  useEffect(() => {
    getPlaySearchResult();
  }, [sortStandard, playCurPage]);

  return (
    <>
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
          <SearchResultCount />
          <SearchResultTab
            playSearchCnt={playTotalCnt}
            selectedTabMenu={selectedTabMenu}
            setSelectedTabMenu={setSelectedTabMenu}
          />
          {selectedTabMenu === "연극" && (
            <PlaySearchResult
              playSearchResult={playSearchResult}
              setPlaySearchResult={setPlaySearchResult}
              curPage={playCurPage}
              setCurPage={setPlayCurPage}
              playTotalCnt={playTotalCnt}
              searchKeyword={searchKeyword}
              setAlert={setAlert}
              setSortStandard={setSortStandard}
            />
          )}
          {selectedTabMenu === "홍보게시글" && (
            <PromotionSearchResult searchResult={promotionSearchResult} />
          )}
          {selectedTabMenu === "자유게시글" && (
            <CommunitySearchResult searchResult={communitySearchResult} />
          )}
        </div>
      )}
    </>
  );
}
