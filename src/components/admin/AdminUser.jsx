import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./AdminUser.scss";
import Button from "@mui/material/Button";

const columns = [
  { field: "id", headerName: "회원 번호", width: 150 },
  { field: "nickname", headerName: "닉네임", width: 250 },
  { field: "social_provider", headerName: "가입 경로", width: 200 },
  { field: "interested_area", headerName: "선호 지역", width: 200 },
];

const rows = [
  { id: 1, nickname: "Snow", interested_area: "Jon", social_provider: 35 },
  {
    id: 2,
    nickname: "Lannister",
    interested_area: "Cersei",
    social_provider: 42,
  },
  {
    id: 3,
    nickname: "Lannister",
    interested_area: "Jaime",
    social_provider: 45,
  },
  { id: 4, nickname: "Stark", interested_area: "Arya", social_provider: 16 },
  {
    id: 5,
    nickname: "Targaryen",
    interested_area: "Daenerys",
    social_provider: 32,
  },
];

const AdminUser = () => {
  //   const [users, setUsers] = useState([]); // 데이터를 저장할 상태

  //   useEffect(() => {
  //     fetch("https://dailytopia2.shop/api/users/admin/users")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setUsers(data); // 데이터를 상태에 저장
  //         console.log(data);
  //       })
  //       .catch((err) => alert(err));
  //   }, []);

  return (
    <>
      <div className="my-free-board-container">
        <div className="my-free-board-header">
          <h1>회원 정보</h1>
          <Button
            variant="contained"
            color="moreDarkGray"
            sx={{ width: "80px", height: "40px", color: "white" }}
          >
            <h4>삭제</h4>
          </Button>
        </div>
        <div style={{ height: "631px", width: "800px" }}>
          <DataGrid
            rows={rows}
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
