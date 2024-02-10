import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./AdminUser.scss";
import Button from "@mui/material/Button";

const columns = [
  { field: "id", headerName: "회원 번호", width: 145 },
  { field: "nickname", headerName: "닉네임", width: 200 },
  { field: "social_provider", headerName: "가입 경로", width: 145 },
  { field: "role", headerName: "회원 등급", width: 145 },
  { field: "state", headerName: "회원 상태", width: 145 },
];

const AdminUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`https://dailytopia2.shop/api/users/admin/users`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.users) { // data 및 data.users가 유효한지 확인
          // 데이터에 고유한 id 속성 추가
          const usersWithIds = data.users.map((user, index) => ({
            ...user,
            id: index + 1, // 예시로 index + 1을 사용하여 고유한 id 부여
          }));
          setUsers(usersWithIds); // 데이터를 상태에 저장
          console.log(usersWithIds);
        } else {
          console.error("No user data found");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = () => {
    // 선택된 사용자의 ID 목록
    const selectedUserIds = users
      .filter((user) => user.selected)
      .map((user) => user.id);

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
        // TODO: 성공 또는 실패에 따른 처리
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
            onClick={handleDelete}
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
          />
        </div>
      </div>
    </>
  );
};

export default AdminUser;