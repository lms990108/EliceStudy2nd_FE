import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./AdminPR.scss";
import Button from "@mui/material/Button";

const columns = [
  { field: "id", headerName: "게시글 번호", width: 150 },
  { field: "title", headerName: "게시글 제목", width: 250 },
  { field: "createdAt", headerName: "작성 시기", width: 200 },
  { field: "commentsCount", headerName: "댓글 수", width: 200 },
];

const AdminPR = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    fetch(`https://dailytopia2.shop/api/promotions`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // 데이터 확인용 콘솔
        if (Array.isArray(data.promotions) && data.promotions.length > 0) {
          const promotionsWithIds = data.promotions.map((promotion, index) => ({
            ...promotion,
            id: index + 1,
          }));
          setPromotions(promotionsWithIds);
        } else {
          console.error("Data is not an array or empty");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="admin-board-container">
        <div className="admin-board-header">
          <h1>홍보 게시글</h1>
          <Button
            variant="contained"
            color="moreDarkGray"
            sx={{ width: "80px", height: "40px", color: "white" }}
          >
            <h4>삭제</h4>
          </Button>
        </div>
        <div style={{ height: "631px", width: "800px" }}>
          <DataGrid
            rows={promotions}
            columns={columns}
            checkboxSelection
          />
        </div>
      </div>
    </>
  );
};

export default AdminPR;