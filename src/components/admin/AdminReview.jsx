import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./AdminReview.scss";
import Button from "@mui/material/Button";
import TimeFormat from "../common/time/TimeFormat";
import { AlertCustom } from "../common/alert/Alerts";
import { Backdrop } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "_id", headerName: "후기 번호", width: 128 },
  { field: "show_title", headerName: "해당 공연 제목", width: 128 },
  { field: "title", headerName: "후기 제목", width: 128 },
  { field: "rate", headerName: "평점", width: 128 },
  { field: "user_nickname", headerName: "작성자", width: 128 },
  {
    field: "created_at",
    headerName: "작성 시기",
    width: 100,
    renderCell: (data) => <TimeFormat time={data.row.createdAt} />,
  },
];

const AdminReview = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  const fetchData = () => {
    fetch(`https://dailytopia2.shop/api/reviews`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data.data) && data.data.length > 0) {
          const reviewsWithIds = data.data.map((review) => ({
            ...review,
          }));
          setReviews(reviewsWithIds);
          console.log(reviewsWithIds);
        } else {
          console.error("Data is not an array or empty");
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = () => {
    // 선택된 후기의 ID 목록
    const selectedReviewIds = reviews
      .filter((review) => review.selected)
      .map((review) => review._id);

    // DELETE 요청 보내기
    fetch(`https://dailytopia2.shop/api/reviews`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reviewIds: selectedReviewIds }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // 성공 또는 실패 메시지 확인
        console.log(selectedReviewIds);
        fetchData(); // 탈퇴 처리 후에 데이터 다시 불러오기
        setOpenAlert2(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="admin-board-container">
        <div className="admin-board-header">
          <h1>공연 후기</h1>
          <Button
            variant="contained"
            color="moreDarkGray"
            sx={{ width: "80px", height: "40px", color: "white" }}
            onClick={() => {
              const hasSelectedReviews = reviews.some(
                (review) => review.selected
              );
              if (hasSelectedReviews) setOpenAlert(true);
            }}
          >
            <h4>삭제</h4>
          </Button>
        </div>
        <div style={{ height: "631px", width: "800px" }}>
          <DataGrid
            onRowClick={(params) => {
              const showNumber = params.row.show_id;
              navigate(`/Play/${showNumber}`);
            }}
            rows={reviews}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            checkboxSelection
            getRowId={(reviews) => reviews._id}
            onRowSelectionModelChange={(selectionModel) => {
              const updateReviews = reviews.map((review) => ({
                ...review,
                selected: selectionModel.includes(review._id),
              }));
              setReviews(updateReviews);
            }}
          />
        </div>
      </div>
      <Backdrop
        open={openAlert}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <AlertCustom
          severity="error"
          open={openAlert}
          onclose={() => setOpenAlert(false)}
          onclick={() => handleDelete()}
          checkBtn={"확인"}
          closeBtn={"취소"}
          checkBtnColor={"#fa2828"}
          title={"teenybox.com 내용:"}
          width={500}
          content={<p>선택하신 후기를 정말로 삭제시키시겠습니까?</p>}
        />
      </Backdrop>
      <AlertCustom
        severity="success"
        open={openAlert2}
        onclose={() => setOpenAlert2(false)}
        title={"완료"}
        width={500}
        content={<p>선택하신 후기가 정상적으로 삭제되었습니다.</p>}
        time={1000}
      />
    </>
  );
};

export default AdminReview;
