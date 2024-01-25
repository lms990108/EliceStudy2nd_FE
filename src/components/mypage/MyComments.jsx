/* 마이페이지 - My 댓글 */
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./MyComments.scss";
import Button from "@mui/material/Button";

const columns = [
  { field: "id", headerName: "번호", hide: true },
  { field: "tilte", headerName: "댓글 내용", width: 500 },
  { field: "createdAt", headerName: "작성 시기", width: 150 },
];

const rows = [
  { id: 1, tilte: "Snow", Rating: "Jon", createdAt: 35 },
  { id: 2, tilte: "Lannister", Rating: "Cersei", createdAt: 42 },
  { id: 3, tilte: "Lannister", Rating: "Jaime", createdAt: 45 },
  { id: 4, tilte: "Stark", Rating: "Arya", createdAt: 16 },
  { id: 5, tilte: "Targaryen", Rating: "Daenerys", createdAt: 32 },
  { id: 6, tilte: "Melisandre", Rating: "sungjae", createdAt: 150 },
  { id: 7, tilte: "Clifford", Rating: "Ferrara", createdAt: 44 },
  { id: 8, tilte: "Frances", Rating: "Rossini", createdAt: 36 },
  { id: 9, tilte: "Roxie", Rating: "Harvey", createdAt: 65 },
];

function MyComments() {
  return (
    <>
      <div className="my-comments-container">
        <div className="my-comments-header">
          <h1>내 댓글</h1>
          <Button
            variant="contained"
            color="orange"
            sx={{ width: "80px", height: "40px", color: "white" }}
          >
            <h4>삭제</h4>
          </Button>
        </div>
        <div style={{ height: "628px", width: "800px" }}>
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
}

export default MyComments;