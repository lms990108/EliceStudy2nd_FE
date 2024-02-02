import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./AdminPR.scss";
import Button from "@mui/material/Button";

const columns = [
  { field: "id", headerName: "게시글 번호", width: 150 },
  { field: "tilte", headerName: "게시글 제목", width: 250 },
  { field: "createdAt", headerName: "작성자", width: 200 },
  { field: "comments", headerName: "작성 시기", width: 200 },
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

const AdminPR = () => {
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

export default AdminPR;
