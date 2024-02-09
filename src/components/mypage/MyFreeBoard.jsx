import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./MyFreeBoard.scss";
import Button from "@mui/material/Button";
import { postUrl } from "../../apis/apiURLs";
import { CircularProgress } from "@mui/material";
import ServerError from "../common/state/ServerError";
import Empty from "../common/state/Empty";
import { Link, useNavigate } from "react-router-dom";
import TimeFormat from "../common/time/TimeFormat";

const columns = [
  {
    field: "post_number",
    headerName: "번호",
    renderCell: (data) => (
      <Link className="link" to={`/community/${data.value}`}>
        {data.value}
      </Link>
    ),
  },
  {
    field: "title",
    headerName: "제목",
    width: 248,
    renderCell: (data) => (
      <Link className="link" to={`/community/${data.row.post_number}`}>
        {data.value}
      </Link>
    ),
  },
  { field: "content", headerName: "내용", width: 250 },
  {
    field: "createdAt",
    headerName: "작성 시기",
    width: 150,
    renderCell: (data) => <TimeFormat time={data.row.createdAt} type={"time"} />,
  },
];

function MyFreeBoard({ user }) {
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState("loading");
  const nav = useNavigate();

  const getPosts = async () => {
    setState("loading");
    const res = await fetch(`${postUrl}/user/${user._id}`);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setPosts(
        data.posts.map((review) => {
          return { ...review, id: review._id };
        })
      );
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
      <div className="my-free-board-container">
        <div className="header">
          <h1>MY 커뮤니티</h1>
          {!posts.length || (
            <Button variant="contained" color="orange" sx={{ width: "80px", height: "40px", color: "white" }}>
              삭제
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
            <Empty onClickBtn={() => nav(`/community/write`)} />
          )}
        </div>
      </div>
    </>
  );
}

export default MyFreeBoard;
