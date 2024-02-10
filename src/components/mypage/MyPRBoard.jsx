import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./MyPRBoard.scss";
import Button from "@mui/material/Button";
import { promotionUrl } from "../../apis/apiURLs";
import { CircularProgress } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import ServerError from "../common/state/ServerError";
import Empty from "../common/state/Empty";
import { Link, useNavigate } from "react-router-dom";
import TimeFormat from "../common/time/TimeFormat";

const columns = [
  {
    field: "promotion_number",
    headerName: "번호",
    renderCell: (data) => (
      <Link className="link" to={`/promotion/${data.promotion_number}`}>
        {data.value}
        {console.log(data)}
      </Link>
    ),
  },
  {
    field: "title",
    headerName: "제목",
    width: 248,
    renderCell: (data) => (
      <Link className="link" to={`/promotion/${data.promotion_number}`}>
        {data.value}
      </Link>
    ),
  },
  { field: "content", headerName: "내용", width: 250 },
  {
    field: "createdAt",
    headerName: "작성 시기",
    width: 200,
    renderCell: (data) => <TimeFormat time={data.row.createdAt} type={"time"} />,
  },
];

function MyPRBoard({ user }) {
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState("loading");
  const [checkedList, setCheckedList] = useState([]);
  const nav = useNavigate();

  const getPosts = async () => {
    setState("loading");
    console.log(user.user_id);
    const res = await fetch(`${promotionUrl}/user/${user._id}`);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setPosts(
        data.promotions.map((promotion) => {
          return { ...promotion, id: promotion.promotion_number };
        })
      );
      setState("hasValue");
    } else {
      setState("hasError");
    }
  };

  const handleClickDeleteBtn = async () => {
    console.log(checkedList);
    const res = await fetch(`${promotionUrl}/bulk`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        promotionNumbers: checkedList,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      let newPosts = [...posts];
      checkedList.map((id) => {
        let index = posts.findIndex((post) => post.id === id);
        newPosts.splice(index, 1);
      });

      setPosts(newPosts);
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
            <Button onClick={handleClickDeleteBtn} variant="contained" color="orange" sx={{ width: "80px", height: "40px", color: "white" }}>
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
              disableRowSelectionOnClick
              rowSelectionModel={checkedList}
              onRowSelectionModelChange={(e) => setCheckedList(e)}
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
