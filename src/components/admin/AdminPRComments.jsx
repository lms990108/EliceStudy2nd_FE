import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./AdminPRComments.scss";
import Button from "@mui/material/Button";

const columns = [
  { field: "id", headerName: "댓글 번호", width: 150 },
  { field: "content", headerName: "내용", width: 250 },
  { field: "user_nickname", headerName: "작성자", width: 200 },
  { field: "createdAt", headerName: "작성 시기", width: 150 },
];

const AdminPRComments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://dailytopia2.shop/api/comments/admins/promotions`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // 데이터 확인용 콘솔
        if (Array.isArray(data.comments) && data.comments.length > 0) {
          const commentsWithIds = data.comments.map((comment, index) => ({
            ...comment,
            id: index + 1,
          }));
          setComments(commentsWithIds);
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
          <h1>홍보 게시판 댓글</h1>
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
            rows={comments}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            checkboxSelection
          />
        </div>
      </div>
    </>
  );
};

export default AdminPRComments;
