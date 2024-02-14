import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./AdminUser.scss";
import Button from "@mui/material/Button";
import TimeFormat from "../common/time/TimeFormat";
import { AlertCustom } from "../common/alert/Alerts";
import { Backdrop } from "@mui/material";

const columns = [
  { field: "_id", headerName: "회원 번호", width: 128 },
  { field: "nickname", headerName: "닉네임", width: 128 },
  { field: "social_provider", headerName: "가입 경로", width: 128 },
  { field: "role", headerName: "회원 등급", width: 128 },
  { field: "state", headerName: "회원 상태", width: 128 },
  {
    field: "createdAt",
    headerName: "작성 시기",
    width: 100,
    renderCell: (data) => <TimeFormat time={data.createdAt} />,
  },
];

const AdminUser = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchData = () => {
    fetch(`https://dailytopia2.shop/api/users/admin/users`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.users) {
          const usersWithIds = data.users.map((user) => ({
            ...user,
          }));
          setUsers(usersWithIds);
        } else {
          console.error("No user data found");
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = () => {
    // 선택된 사용자의 ID 목록
    const selectedUserIds = users
      .filter((user) => user.selected)
      .map((user) => user._id);

    // DELETE 요청 보내기
    fetch(`https://dailytopia2.shop/api/users/admin/users`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userIds: selectedUserIds }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // 성공 또는 실패 메시지 확인
        console.log(selectedUserIds);
        fetchData();
        setOpenAlert2(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="admin-board-container">
        <div className="admin-board-header">
          <h1>회원 정보</h1>
          <Button
            variant="contained"
            color="moreDarkGray"
            sx={{ width: "80px", height: "40px", color: "white" }}
            onClick={() => {
              const hasSelectedUsers = users.some((user) => user.selected);
              if (hasSelectedUsers) setOpenAlert(true);
            }}
          >
            <h4>탈퇴</h4>
          </Button>
        </div>
        <div style={{ height: "631px", width: "800px" }}>
          <DataGrid
            rows={users}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            checkboxSelection
            getRowId={(users) => users._id}
            onRowSelectionModelChange={(selectionModel) => {
              const updatedUsers = users.map((user) => ({
                ...user,
                selected: selectionModel.includes(user._id),
              }));
              setUsers(updatedUsers);
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
          content={<p>선택하신 회원을 정말로 탈퇴시키시겠습니까?</p>}
        />
      </Backdrop>
      <AlertCustom
        severity="success"
        open={openAlert2}
        onclose={() => setOpenAlert2(false)}
        title={"완료"}
        width={500}
        content={<p>선택하신 회원이 정상적으로 탈퇴 처리되었습니다.</p>}
        time={1000}
      />
    </>
  );
};

export default AdminUser;
