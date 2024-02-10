import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./AdminReview.scss";
import Button from "@mui/material/Button";

const columns = [
  { field: "id", headerName: "후기 번호", width: 100 },
  { field: "title", headerName: "후기 제목", width: 180 },
  { field: "user_nickname", headerName: "작성자", width: 120 },
  { field: "show_title", headerName: "해당 공연 제목", width: 180 },
  { field: "updated_at", headerName: "작성 시기", width: 150 },
];

const AdminReview = () => {
  const [reviews, setReviews] = useState([]);
  const [checkedList, setCheckedList] = useState([]);

  useEffect(() => {
    fetch(`https://dailytopia2.shop/api/reviews`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data.data) && data.data.length > 0) {
          const reviewsWithIds = data.data.map((review) => ({
            ...review,
            id: review._id,
          }));
          setReviews(reviewsWithIds);
          console.log(reviewsWithIds);
        } else {
          console.error("Data is not an array or empty");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = () => {
    // 선택된 후기의 ID 목록
    const selectedReviewIds = checkedList
      .filter((index) => index >= 0 && index < reviews.length)
      .map((index) => reviews[index].id);

    // DELETE 요청 보내기
    fetch(`https://dailytopia2.shop/api/reviews`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reviewIds: selectedReviewIds }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // 성공 또는 실패 메시지 확인
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="admin-board-container">
        <div className="admin-board-header">
          <h1>공연 후기</h1>
          <Button
            variant="contained"
            color="moreDarkGray"
            sx={{ width: "80px", height: "40px", color: "white" }}
            onClick={handleDelete} // 삭제 버튼 클릭 시 handleDelete 함수 호출
          >
            <h4>삭제</h4>
          </Button>
        </div>
        <div style={{ height: "631px", width: "800px" }}>
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
            getRowId={(review) => review._id}
            rowSelectionModel={checkedList}
            onRowSelectionModelChange={(e) => setCheckedList(e)}
          />
        </div>
      </div>
    </>
  );
};

export default AdminReview;
