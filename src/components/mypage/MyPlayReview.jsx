/* 마이페이지 - 내가 작성한 연극 리뷰 게시판 */
import { DataGrid } from "@mui/x-data-grid";
import "./MyPlayReview.scss";
import Button from "@mui/material/Button";
import { reviewUrl } from "../../apis/apiURLs";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const columns = [
  {
    field: "show_title",
    headerName: "연극",
    width: 200,
    renderCell: (data) => (
      //`/play/${data.id}?tab=reviews`
      <Link to={"/play/PF231931?tab=reviews"}>
        {console.log(data)}
        {data.value}
      </Link>
    ),
  },
  { field: "title", headerName: "제목", width: 200 },
  { field: "content", headerName: "내용", width: 200 },
  { field: "rate", headerName: "별점", width: 100 },
  { field: "created_at", headerName: "작성 시기", width: 150, valueGetter: (data) => data.value.split(".")[0].replaceAll("T", " ") },
];

function MyPlayReview({ user }) {
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    console.log(user.user_id);
    const res = await fetch(`${reviewUrl}?userId=${user.user_id}&page=1&limit=100`);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setReviews(
        data.data.map((review) => {
          return { ...review, id: review._id }; // id: review.showId
        })
      );
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <>
      <div className="my-play-review-container">
        <div className="my-play-review-header">
          <h1>내가 작성한 연극 리뷰</h1>
          <Button variant="contained" color="orange" sx={{ width: "80px", height: "40px", color: "white" }}>
            <h4>삭제</h4>
          </Button>
        </div>
        <div style={{ height: "628px", width: "800px" }}>
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
            // unstable_cellSelection
            // unstable_onCellSelectionModelChange={(selected) => console.log("ss")}
          />
        </div>
      </div>
    </>
  );
}

export default MyPlayReview;
