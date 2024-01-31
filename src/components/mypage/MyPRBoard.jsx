import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./MyPRBoard.scss";
import Button from "@mui/material/Button";
import { promotionUrl } from "../../apis/apiURLs";

const columns = [
  { field: "id", headerName: "번호", hide: true },
  { field: "tilte", headerName: "홍보 글 제목", width: 250 },
  { field: "createdAt", headerName: "작성 시기", width: 250 },
  { field: "comments", headerName: "댓글", width: 150 },
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
];

function MyPRBoard({ user }) {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    console.log(user.user_id);
    const res = await fetch(`${promotionUrl}/user/${user.user_id}`);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setPosts(data);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="my-pr-board-container">
        <div className="my-pr-board-header">
          <h1>홍보 게시판 작성글</h1>
          <Button variant="contained" color="orange" sx={{ width: "80px", height: "40px", color: "white" }}>
            <h4>삭제</h4>
          </Button>
        </div>
        <div style={{ height: "628px", width: "800px" }}>
          <DataGrid
            rows={posts}
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

export default MyPRBoard;
