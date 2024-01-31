import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./MyPRBoard.scss";
import Button from "@mui/material/Button";
import { promotionUrl } from "../../apis/apiURLs";
import { CircularProgress } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import ServerError from "../common/state/ServerError";
import Empty from "../common/state/Empty";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "번호" },
  { field: "tilte", headerName: "제목", width: 248 },
  { field: "content", headerName: "내용", width: 250 },
  { field: "createdAt", headerName: "작성 시기", width: 150 },
];

function MyPRBoard({ user }) {
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState("loading");
  const nav = useNavigate();

  const getPosts = async () => {
    setState("loading");
    console.log(user.user_id);
    const res = await fetch(`${promotionUrl}/user/${user.user_id}`);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setPosts(data);
      setState("hasValue");
    } else {
      setState("hasError");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="my-pr-board-container">
        <div className="header">
          <h1>MY 홍보 게시글</h1>
          {!posts.length || (
            <Button variant="contained" color="orange" sx={{ width: "80px", height: "40px", color: "white" }}>
              <h4>삭제</h4>
            </Button>
          )}
        </div>
        <div className="body">
          {state === "loading" ? (
            <CircularProgress className="loading" />
          ) : state === "hasError" ? (
            <ServerError onClickBtn={() => getPosts()} />
          ) : posts.length ? (
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
          ) : (
            <Empty onClickBtn={() => nav(`/promotion/write`)} />
          )}
        </div>
      </div>
    </>
  );
}

export default MyPRBoard;
