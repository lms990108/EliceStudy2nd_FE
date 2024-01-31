import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./MyFreeBoard.scss";
import Button from "@mui/material/Button";
import { postUrl } from "../../apis/apiURLs";

const columns = [
  { field: "id", headerName: "번호" },
  { field: "tilte", headerName: "제목", width: 250 },
  { field: "content", headerName: "내용", width: 150 },
  { field: "createdAt", headerName: "작성 시기", width: 250 },
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

function MyFreeBoard({ user }) {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    console.log(user.user_id);
    const res = await fetch(`${postUrl}/user/${user.user_id}`);
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
      <div className="my-free-board-container">
        <div className="my-free-board-header">
          <h1>커뮤니티 작성글</h1>
          <Button variant="contained" color="orange" sx={{ width: "80px", height: "40px", color: "white" }}>
            <h4>삭제</h4>
          </Button>
        </div>
        <div style={{ height: "631px", width: "800px" }}>
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

export default MyFreeBoard;
