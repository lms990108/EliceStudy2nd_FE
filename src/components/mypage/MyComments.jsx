/* 마이페이지 - My 댓글 */
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./MyComments.scss";
import Button from "@mui/material/Button";
import { commentUrl, userUrl } from "../../apis/apiURLs";
import { Backdrop, CircularProgress } from "@mui/material";
import ServerError from "../common/state/ServerError";
import Empty from "../common/state/Empty";
import { Link, useNavigate } from "react-router-dom";
import TimeFormat from "../common/time/TimeFormat";
import { AlertCustom } from "../common/alert/Alerts";

const columns = [
  { field: "category", headerName: "카테고리", width: 120 },
  { field: "title", headerName: "글 제목", width: 200 },
  { field: "content", headerName: "내용", width: 400 },
  { field: "createdAt", headerName: "작성 시기", width: 150, renderCell: (data) => <TimeFormat time={data.row.createdAt} type={"time"} /> },
];

function MyComments({ user, setUserData }) {
  const [comments, setComments] = useState([]);
  const [state, setState] = useState("loading");
  const [checkedList, setCheckedList] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const nav = useNavigate();

  const getComments = async () => {
    setState("loading");
    const res = await fetch(`${commentUrl}/users?limit=1000`, { credentials: "include" });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setComments(
        data.comments.map((comment) => {
          return { ...comment, id: comment._id, category: comment.promotion ? "홍보게시판" : "커뮤니티", title: comment.promotion?.title || comment.post?.title };
        })
      );
      setState("hasValue");
    } else {
      setState("hasError");
    }
  };

  const handleDelete = async () => {
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
    } else if (res.status === 401 || res.status === 403) {
      const loginRes = await fetch(`${userUrl}`, { credentials: "include" });
      if (loginRes.ok) {
        const data = await loginRes.json();
        setUserData({ isLoggedIn: true, user: data.user });
        handleDelete();
      } else {
        setUserData({ isLoggedIn: false });
        return nav(`/signup-in`);
      }
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
            <Button onClick={() => setOpenAlert(true)} variant="contained" color="orange" sx={{ width: "70px", height: "36px", color: "white" }}>
              <h4>삭제</h4>
            </Button>
          )}
        </div>
        <div className="body">
          {state === "loading" ? (
            <CircularProgress className="loading" color="secondary" />
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
      <Backdrop open={openAlert} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <AlertCustom
          severity="error"
          open={openAlert}
          onclose={() => setOpenAlert(false)}
          onclick={() => handleDelete()}
          checkBtn={"확인"}
          closeBtn={"취소"}
          checkBtnColor={"#fa2828"}
          title={"teenybox.com 내용:"}
          content={"정말 삭제하시겠습니까?"}
        />
      </Backdrop>
    </>
  );
}

export default MyComments;
