/* 마이페이지 - 내가 작성한 연극 리뷰 게시판 */
import { DataGrid } from "@mui/x-data-grid";
import "./MyPlayReview.scss";
import Button from "@mui/material/Button";
import { reviewUrl } from "../../apis/apiURLs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ServerError from "../common/state/ServerError";
import Empty from "../common/state/Empty";
import TimeFormat from "../common/time/TimeFormat";

const columns = [
  {
    field: "show_title",
    headerName: "연극",
    width: 180,
    renderCell: (data) => (
      <Link className="link" to={`/play/${data.row.show_id}?tab=reviews`}>
        {data.value}
      </Link>
    ),
  },
  {
    field: "title",
    headerName: "제목",
    width: 200,
    renderCell: (data) => (
      <Link className="link" to={`/play/${data.row.show_id}?tab=reviews`}>
        {data.value}
      </Link>
    ),
  },
  { field: "content", headerName: "내용", width: 200 },
  { field: "rate", headerName: "별점", width: 100 },
  { field: "created_at", headerName: "작성 시기", width: 150, renderCell: (data) => <TimeFormat time={data.row.createdAt} type={"time"} /> },
];

function MyPlayReview({ user }) {
  const [reviews, setReviews] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [state, setState] = useState("loading");

  const getReviews = async () => {
    setState("loading");
    console.log(user.user_id);
    const res = await fetch(`${reviewUrl}?userId=${user.user_id}`);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setReviews(
        data.data.map((review) => {
          return { ...review, id: review._id };
        })
      );
      setState("hasValue");
    } else {
      setState("hasError");
    }
  };

  const handleClickDeleteBtn = async () => {
    const res = await fetch(`${reviewUrl}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reviewIds: checkedList,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      let newReviews = [...reviews];
      checkedList.map((id) => {
        let index = reviews.findIndex((review) => review.id === id);
        newReviews.splice(index, 1);
      });

      setReviews(newReviews);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <>
      <div className="my-play-review-container">
        <div className="header">
          <h1>MY 연극 리뷰</h1>
          {!reviews.length || (
            <Button onClick={handleClickDeleteBtn} disabled={!checkedList.length} variant="contained" color="orange" sx={{ width: "80px", height: "40px", color: "white" }}>
              삭제
            </Button>
          )}
        </div>
        <div className="body">
          {state === "loading" ? (
            <CircularProgress className="loading" />
          ) : state === "hasError" ? (
            <ServerError onClickBtn={() => getReviews()} />
          ) : reviews.length ? (
            <DataGrid
              rows={reviews}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              checkboxSelection
              disableRowSelectionOnClick
              rowSelectionModel={checkedList}
              onRowSelectionModelChange={(e) => setCheckedList(e)}
            />
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </>
  );
}

export default MyPlayReview;
