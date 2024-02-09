/* 마이페이지 - 찜한 연극 LIST */
import React, { useEffect, useState } from "react";
import "./MyPickList.scss";
import Button from "@mui/material/Button";
import { userUrl } from "../../apis/apiURLs";
import { Checkbox, CircularProgress, Pagination, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ServerError from "../common/state/ServerError";
import Empty from "../common/state/Empty";
import TimeFormat from "../common/time/TimeFormat";

function MyPickList({ user }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [checkedList, setCheckedList] = useState([]);
  const [state, setState] = useState("loading");

  const getBookmarks = async () => {
    setState("loading");
    const res = await fetch(`${userUrl}/bookmarks?page=${page}&limit=6`, { credentials: "include" });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setBookmarks(data.bookmarks.validShows);
      setTotalCount(data.bookmarks.totalCount);
      setState("hasValue");
    } else {
      setState("hasError");
    }
  };

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  const handleChangeChecked = (e) => {
    console.log(e.target.value);
    if (e.target.checked) {
      setCheckedList((cur) => [...cur, e.target.value]);
    } else {
      setCheckedList((cur) => cur.filter((id) => id !== e.target.value));
    }
  };

  const handleClickDeleteBtn = async (e) => {
    const res = await fetch(`${userUrl}/bookmarks`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        showIds: checkedList,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      if (bookmarks.length <= checkedList.length) {
        setPage(page - 1);
      }
      setCheckedList([]);
      getBookmarks();
    }
  };

  const renderComponent = (mainComponent) => {
    switch (state) {
      case "loading":
        return (
          <div className="content-container loading">
            <CircularProgress />
          </div>
        );
      case "hasValue":
        return mainComponent;
      case "hasError":
        return <ServerError onClickBtn={() => getBookmarks()} />;
      default:
        return mainComponent;
    }
  };

  useEffect(() => {
    getBookmarks();
    setCheckedList([]);
  }, [page]);

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <>
      <div className="my-pick-list-container">
        <div className="header">
          <h1>찜한 연극 LIST</h1>
          {!bookmarks.length || (
            <Button
              disabled={!checkedList.length}
              onClick={handleClickDeleteBtn}
              variant="contained"
              color="orange"
              sx={{ width: "80px", height: "40px", color: "white", fontWeight: "600" }}
            >
              삭제
            </Button>
          )}
        </div>
        <div className="body">
          {renderComponent(
            <>
              {bookmarks.length ? (
                <>
                  <div className="content-container">
                    {bookmarks.map(({ showId, title, poster, location, startDate, endDate, state }) => (
                      <div className="content" key={showId}>
                        <Checkbox value={showId} checked={checkedList.includes(showId)} onChange={handleChangeChecked} />
                        <div className="play-img-container">
                          <Link to={`/play/${showId}`}>
                            <img src={poster} />
                          </Link>
                        </div>
                        <div className="play-info">
                          <Link className="title" to={`/play/${showId}`}>
                            <h3>{title}</h3>
                          </Link>
                          <p className="place">{location || "극장 정보"}</p>
                          <p>
                            {startDate && <TimeFormat time={startDate} />}
                            {" ~ "}
                            {endDate && <TimeFormat time={endDate} />}
                          </p>
                          <div className="reservation-btn">
                            {(state || "") !== "공연완료" ? (
                              <a href={`https://tickets.interpark.com/contents/search?keyword=${title}&start=0&rows=20`} target="_blank" rel="noopener noreferrer">
                                <Button variant="contained" color="secondary" size="small">
                                  <Typography fontFamily="Nanum Gothic, sans-serif">예매하러 가기</Typography>
                                </Button>
                              </a>
                            ) : (
                              <Tooltip title="본 연극은 종료되어 예매 링크가 제공되지 않습니다." arrow>
                                <div className="reservation-disabled">
                                  <Button variant="contained" disabled size="small">
                                    <Typography fontFamily="Nanum Gothic, sans-serif" className="button-text">
                                      예매하러 가기
                                    </Typography>
                                  </Button>
                                </div>
                              </Tooltip>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pagination">
                    <Pagination count={Math.ceil(totalCount / 6)} page={page} onChange={handleChangePage} />
                  </div>
                </>
              ) : (
                <Empty />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MyPickList;
