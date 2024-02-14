import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./AdminFree.scss";
import Button from "@mui/material/Button";
import TimeFormat from "../common/time/TimeFormat";
import { AlertCustom } from "../common/alert/Alerts";
import { Backdrop } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "_id", headerName: "게시글 번호", width: 213 },
  { field: "title", headerName: "게시글 제목", width: 213 },
  { field: "nickname", headerName: "작성자", width: 213 },
  {
    field: "createdAt",
    headerName: "작성 시기",
    width: 100,
    renderCell: (data) => <TimeFormat time={data.row.createdAt} />,
  },
];

const AdminFree = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const fetchData = () => {
    fetch(`https://dailytopia2.shop/api/posts?limit=1000`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // 데이터 확인용 콘솔
        if (Array.isArray(data.posts) && data.posts.length > 0) {
          const postsWithIds = data.posts.map((post) => ({
            ...post,
            nickname: post.user.nickname,
          }));
          setPosts(postsWithIds);
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
    const selectedPostNumbers = posts
      .filter((post) => post.selected)
      .map((post) => post.post_number);

    // DELETE 요청 보내기
    fetch(`https://dailytopia2.shop/api/posts/bulk`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postNumbers: selectedPostNumbers }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // 성공 또는 실패 메시지 확인
        console.log(selectedPostNumbers);
        setOpenAlert2(true);
        fetchData(); // 삭제 후 데이터 다시 불러오기
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="admin-board-container">
        <div className="admin-board-header">
          <h1>커뮤니티 게시글</h1>
          <Button
            variant="contained"
            color="moreDarkGray"
            sx={{ width: "80px", height: "40px", color: "white" }}
            onClick={() => {
              const hasSelectedPosts = posts.some((post) => post.selected);
              if (hasSelectedPosts) setOpenAlert(true);
            }}
          >
            <h4>삭제</h4>
          </Button>
        </div>
        <div style={{ height: "631px", width: "800px" }}>
          <DataGrid
            onRowClick={(params) => {
              const postNumber = params.row.post_number;
              navigate(`/community/${postNumber}`);
            }}
            rows={posts}
            columns={columns}
            checkboxSelection
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            getRowId={(posts) => posts._id}
            onRowSelectionModelChange={(newSelection) => {
              const updatedPosts = posts.map((post) => ({
                ...post,
                selected: newSelection.includes(post._id),
              }));
              setPosts(updatedPosts);
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
          content={<p>선택하신 게시글을 정말로 삭제시키시겠습니까?</p>}
        />
      </Backdrop>
      <AlertCustom
        severity="success"
        open={openAlert2}
        onclose={() => setOpenAlert2(false)}
        title={"완료"}
        width={500}
        content={<p>선택하신 게시글이 정상적으로 삭제되었습니다.</p>}
        time={1000}
      />
    </>
  );
};

export default AdminFree;
