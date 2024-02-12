import { useEffect, useState } from "react";
import PromotionSearchContentBox from "./PromotionSearchContentBox";
import "./PromotionSearchResult.scss";
import { promotionUrl } from "../../../apis/apiURLs";
import { CircularProgress, Pagination } from "@mui/material";
import EmptySearchResult from "../../common/state/EmptySearchResult";
import { useSearchParams } from "react-router-dom/dist";
import ServerError from "../../common/state/ServerError";

const TYPES = ["play_title", "title", "tag"];

export default function PromotionSearchResult({ searchKeyword }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResult, setSearchResult] = useState();
  const [totalCnt, setTotalCnt] = useState(0);
  const [page, setPage] = useState(1);
  const [type, setType] = useState(searchParams.get("type") || "play_title");
  const [state, setState] = useState("loading");

  const getPromotionSearchResult = async () => {
    setState("loading");
    try {
      const res = await fetch(`${promotionUrl}/search?type=${type}&query=${searchKeyword}&page=${page}&limit=10`);
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setSearchResult(data.promotions);
        setTotalCnt(data.totalCount);
        setState("hasValue");
      } else {
        setState("hasError");
      }
    } catch (err) {
      setState("hasError");
    }
  };

  const handleChangeType = (e) => {
    setType(e.target.value);
    searchParams.set("type", e.target.value);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!TYPES.includes(searchParams.get("type"))) {
      setType("play_title");
      searchParams.set("type", "play_title");
      setSearchParams(searchParams);
    }

    getPromotionSearchResult();
  }, [searchParams, page, type]);

  useEffect(() => {
    getPromotionSearchResult();
  }, []);

  return (
    <div className="promotion-search-result-container">
      <div className="search-header">
        <div>
          <span className="title">홍보 검색결과</span>
          <span className="title count">({totalCnt.toLocaleString("ko-KR")})</span>
        </div>
        <div>
          <span>검색 범위 : </span>
          <select className="sort-by" value={type} onChange={handleChangeType}>
            <option value="play_title">연극/행사명</option>
            <option value="title">글 제목</option>
            <option value="tag">태그</option>
          </select>
        </div>
      </div>
      <div className="search-content">
        {state === "loading" ? (
          <div className="loading">
            <CircularProgress color="secondary" />
          </div>
        ) : state === "hasError" ? (
          <div className={`state`}>
            <ServerError onClickBtn={getPromotionSearchResult} />
          </div>
        ) : !searchResult?.length ? (
          <div className="state">
            <EmptySearchResult play={true} type={true} />
          </div>
        ) : (
          <>
            {searchResult.map((content) => (
              <PromotionSearchContentBox content={content} />
            ))}
            <div className="search-pagination">
              <Pagination count={Math.ceil(totalCnt / 10)} color="secondary" page={page} size="large" onChange={(e, value) => setPage(value)} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
