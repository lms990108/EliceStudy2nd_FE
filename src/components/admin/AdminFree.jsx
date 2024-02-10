import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./AdminFree.scss";
import Button from "@mui/material/Button";

const columns = [
  { field: "id", headerName: "게시글 번호", width: 150 },
  { field: "title", headerName: "게시글 제목", width: 250 },
  { field: "nickname", headerName: "작성자", width: 200 }, // user 객체 내의 nickname 사용
  { field: "createdAt", headerName: "작성 시기", width: 200 },
];

const AdminFree = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`https://dailytopia2.shop/api/posts`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // 데이터 확인용 콘솔
        if (Array.isArray(data.posts) && data.posts.length > 0) {
          const postsWithIds = data.posts.map((post, index) => ({
            ...post,
            id: index + 1,
            nickname: post.user.nickname,
          }));
          setPosts(postsWithIds);
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
          <h1>커뮤니티 게시글</h1>
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
};

export default AdminFree;