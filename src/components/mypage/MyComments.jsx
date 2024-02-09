/* 마이페이지 - My 댓글 */
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./MyComments.scss";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { commentUrl } from "../../apis/apiURLs";
import { CircularProgress } from "@mui/material";
import ServerError from "../common/state/ServerError";
import Empty from "../common/state/Empty";
import { Link } from "react-router-dom";
import TimeFormat from "../common/time/TimeFormat";

const columns = [
  { field: "id", headerName: "번호" },
  { field: "content", headerName: "내용", width: 498 },
  { field: "createdAt", headerName: "작성 시기", width: 150, renderCell: (data) => <TimeFormat time={data.row.createdAt} type={"time"} /> },
];

function MyComments() {
  const [comments, setComments] = useState([]);
  const [state, setState] = useState("loading");
  const [checkedList, setCheckedList] = useState([]);
  const nav = useNavigate();

  const getComments = async () => {
    setState("loading");
    const res = await fetch(`${commentUrl}/users?limit=1000`, { credentials: "include" });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setComments(
        data.comments.map((review) => {
          return { ...review, id: review._id };
        })
      );
      setState("hasValue");
    } else {
      setState("hasError");
    }
  };

  const handleClickDeleteBtn = async () => {
    const res = await fetch(`${commentUrl}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        commentIds: checkedList,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      let newComments = [...comments];
      checkedList.map((id) => {
        let index = comments.findIndex((comment) => comment.id === id);
        newComments.splice(index, 1);
      });

      setComments(newComments);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <div className="my-comments-container">
        <div className="header">
          <h1>MY 댓글</h1>
          {!comments.length || (
            <Button onClick={handleClickDeleteBtn} variant="contained" color="orange" sx={{ width: "80px", height: "40px", color: "white" }}>
              <h4>삭제</h4>
            </Button>
          )}
        </div>
        <div className="body">
          {state === "loading" ? (
            <CircularProgress className="loading" />
          ) : state === "hasError" ? (
            <ServerError onClickBtn={() => getComments()} />
          ) : comments.length ? (
            <DataGrid
              rows={comments}
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
            <Empty>
              <>
                <p>데이터가 없습니다. 연극을 찾아보고 다양한 기록을 남겨보세요</p>
                <Link className="link" to={`/play`}>
                  연극 찾아보기
                </Link>
              </>
            </Empty>
          )}
        </div>
      </div>
    </>
  );
}

export default MyComments;
