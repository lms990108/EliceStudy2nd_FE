import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./AdminReview.scss";
import Button from "@mui/material/Button";

const columns = [
  { field: "id", headerName: "후기 번호", width: 120 },
  { field: "tilte", headerName: "후기 내용", width: 180 },
  { field: "tiltes", headerName: "해당 공연 제목", width: 180 },
  { field: "comments", headerName: "작성자", width: 150 },
  { field: "createdAt", headerName: "작성 시기", width: 150 },
];

const rows = [
  { id: 1, tilte: "Snow", comments: "Jon", createdAt: 35 },
  { id: 2, tilte: "Lannister", comments: "Cersei", createdAt: 42 },
  { id: 3, tilte: "Lannister", comments: "Jaime", createdAt: 45 },
  { id: 4, tilte: "Stark", comments: "Arya", createdAt: 16 },
  { id: 5, tilte: "Targaryen", comments: "Daenerys", createdAt: 32 },
  { id: 6, tilte: "Melisandre", comments: "sungjae", createdAt: 150 },
  { id: 7, tilte: "Clifford", comments: "Ferrara", createdAt: 44 },
  { id: 8, tilte: "Frances", comments: "Rossini", createdAt: 36 },
  { id: 9, tilte: "Roxie", comments: "Harvey", createdAt: 65 },
  { id: 10, tilte: "Roxie", comments: "Harvey", createdAt: 65 },
  { id: 11, tilte: "Roxie", comments: "Harvey", createdAt: 65 },
];

const AdminReview = () => {
  return (
    <>
      <div className="my-free-board-container">
        <div className="my-free-board-header">
          <h1>공연 후기</h1>
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
            rows={rows}
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

export default AdminReview;
