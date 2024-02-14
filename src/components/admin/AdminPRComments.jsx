import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./AdminPRComments.scss";
import Button from "@mui/material/Button";
import TimeFormat from "../common/time/TimeFormat";
import { AlertCustom } from "../common/alert/Alerts";
import { Backdrop } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "_id", headerName: "댓글 번호", width: 213 },
  { field: "content", headerName: "내용", width: 213 },
  { field: "nickname", headerName: "작성자", width: 213 },
  {
    field: "createdAt",
    headerName: "작성 시기",
    width: 100,
    renderCell: (data) => <TimeFormat time={data.row.createdAt} />,
  },
];

const AdminPRComments = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

  const fetchData = () => {
    fetch(`https://dailytopia2.shop/api/comments/admins/promotions`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // 데이터 확인용 콘솔
        if (Array.isArray(data.comments) && data.comments.length > 0) {
          const commentsWithIds = data.comments.map((comment) => ({
            ...comment,
            nickname: comment.user.nickname,
          }));
          setComments(commentsWithIds);
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
    // 선택된 게시글의 ID 목록
    const selectedComments = comments
      .filter((comment) => comment.selected)
      .map((comment) => comment._id);

    // DELETE 요청 보내기
    fetch(`https://dailytopia2.shop/api/comments/admins/comments`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentIds: selectedComments }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // 성공 또는 실패 메시지 확인
        console.log(selectedComments);
        fetchData(); // 삭제 후 데이터 다시 불러오기
        setOpenAlert2(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="admin-board-container">
        <div className="admin-board-header">
          <h1>홍보 게시판 댓글</h1>
          <Button
            variant="contained"
            color="moreDarkGray"
            sx={{ width: "80px", height: "40px", color: "white" }}
            onClick={() => {
              const hasSelectedComments = comments.some(
                (comment) => comment.selected
              );
              if (hasSelectedComments) setOpenAlert(true);
            }}
          >
            <h4>삭제</h4>
          </Button>
        </div>
        <div style={{ height: "631px", width: "800px" }}>
          <DataGrid
            onRowClick={(params) => {
              const promotionNumber = params.row.promotion.promotion_number;
              navigate(`/promotion/${promotionNumber}`);
            }}
            rows={comments}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            checkboxSelection
            getRowId={(comments) => comments._id}
            onRowSelectionModelChange={(newSelection) => {
              const updatedComments = comments.map((comment) => ({
                ...comment,
                selected: newSelection.includes(comment._id),
              }));
              setComments(updatedComments);
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
          content={<p>선택하신 댓글을 정말로 삭제시키시겠습니까?</p>}
        />
      </Backdrop>
      <AlertCustom
        severity="success"
        open={openAlert2}
        onclose={() => setOpenAlert2(false)}
        title={"완료"}
        width={500}
        content={<p>선택하신 댓글이 정상적으로 삭제되었습니다.</p>}
        time={1000}
      />
    </>
  );
};

export default AdminPRComments;
