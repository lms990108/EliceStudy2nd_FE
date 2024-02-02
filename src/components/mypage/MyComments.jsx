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

const columns = [
  { field: "id", headerName: "번호" },
  { field: "tilte", headerName: "내용", width: 498 },
  { field: "createdAt", headerName: "작성 시기", width: 150 },
];

function MyComments() {
  const [comments, setComments] = useState([]);
  const [state, setState] = useState("loading");
  const nav = useNavigate();

  const getComments = async () => {
    setState("loading");
    const res = await fetch(`${commentUrl}/users`, { credentials: "include" });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setComments(data);
      setState("hasValue");
    } else {
      setState("hasError");
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
            <Button variant="contained" color="orange" sx={{ width: "80px", height: "40px", color: "white" }}>
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
