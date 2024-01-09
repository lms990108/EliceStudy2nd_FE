import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchResultHeader.scss";

export default function SearchResultHeader({ searchKeyword }) {
  return (
    <div className="search-result-header">
      <SearchIcon color="secondary" />
      <span>'{searchKeyword}' 검색 결과</span>
    </div>
  );
}
