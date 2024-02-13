/* 마이페이지 - 내가 작성한 연극 리뷰 게시판 */
import { DataGrid } from "@mui/x-data-grid";
import "./MyPlayReview.scss";
import Button from "@mui/material/Button";
import { reviewUrl, userUrl } from "../../apis/apiURLs";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import ServerError from "../common/state/ServerError";
import Empty from "../common/state/Empty";
import TimeFormat from "../common/time/TimeFormat";
import { AlertCustom } from "../common/alert/Alerts";
import { AlertContext } from "../../App";

const columns = [
  {
    field: "show_title",
    headerName: "연극",
    width: 180,
    renderCell: (data) => (
      <Link className="link" to={`/play/${data.row.show_id}?tab=reviews`}>
        {data.value}
      </Link>
    ),
  },
  {
    field: "title",
    headerName: "제목",
    width: 200,
    renderCell: (data) => (
      <Link className="link" to={`/play/${data.row.show_id}?tab=reviews`}>
        {data.value}
      </Link>
    ),
  },
  { field: "content", headerName: "내용", width: 200 },
  { field: "rate", headerName: "별점", width: 100 },
  { field: "created_at", headerName: "작성 시기", width: 150, renderCell: (data) => <TimeFormat time={data.row.createdAt} type={"time"} /> },
];

function MyPlayReview({ user, setUserData }) {
  const [reviews, setReviews] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [state, setState] = useState("loading");
  const [openAlert, setOpenAlert] = useState(false);
  const nav = useNavigate();
  const { setOpenFetchErrorAlert } = useContext(AlertContext);

  const getReviews = async () => {
    setState("loading");
    console.log(user.user_id);
    try {
      const res = await fetch(`${reviewUrl}?userId=${user.user_id}`);
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setReviews(
          data.data.map((review) => {
            return { ...review, id: review._id };
          })
        );
        setState("hasValue");
      } else {
        setState("hasError");
      }
    } catch (err) {
      setState("hasError");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${reviewUrl}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewIds: checkedList,
        }),
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        let newReviews = [...reviews];
        for (let id of checkedList) {
          let index = newReviews.findIndex((review) => review.id === id);
          newReviews.splice(index, 1);
        }

        setReviews(newReviews);
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
    } catch (e) {
      setOpenFetchErrorAlert(true);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <>
      <div className="my-play-review-container">
        <div className="header">
          <h1>MY 연극 리뷰</h1>
          {!reviews.length || (
            <Button onClick={() => setOpenAlert(true)} disabled={!checkedList.length} variant="contained" color="orange" sx={{ width: "70px", height: "36px", color: "white" }}>
              삭제
            </Button>
          )}
        </div>
        <div className="body">
          {state === "loading" ? (
            <CircularProgress className="loading" color="secondary" />
          ) : state === "hasError" ? (
            <ServerError onClickBtn={() => getReviews()} />
          ) : reviews.length ? (
            <DataGrid
              rows={reviews}
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
            <Empty />
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

export default MyPlayReview;
