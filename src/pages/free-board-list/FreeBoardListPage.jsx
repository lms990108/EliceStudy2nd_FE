import React from "react";
import BoardListHeader from "../../components/board/BoardHeader";
import BoardNav from "../../components/board/BoardNav";
import FreeBoardList from "../../components/free-board-list/FreeBoardList";
import "./FreeBoardListPage.scss";
import { Pagination } from "@mui/material";

export default function FreeBoardListPage() {
  const desc = (
    <p>
      연극 및 다양한 공연에 대해 이야기 하는 곳입니다. <br /> 누구나 작성할 수 있으며,
      <br /> 비방 및 욕설, 음란물은 작성 불가합니다.
    </p>
  );
  const boardList = [
    { user_id: "user123", title: "제목입니다.", content: "내용입니다.", coments: 4, time: "2023-10-31" },
    { user_id: "user123", title: "제목입니다.", content: "내용입니다.", coments: 4, time: "2023-10-31" },
    { user_id: "user123", title: "제목입니다.", content: "내용입니다.", coments: 4, time: "2023-10-31" },
    { user_id: "user123", title: "제목입니다.", content: "내용입니다.", coments: 4, time: "2023-10-31" },
    { user_id: "user123", title: "제목입니다.", content: "내용입니다.", coments: 4, time: "2023-10-31" },
    { user_id: "user123", title: "제목입니다.", content: "내용입니다.", coments: 4, time: "2023-10-31" },
    { user_id: "user123", title: "제목입니다.", content: "내용입니다.", coments: 4, time: "2023-10-31" },
    { user_id: "user123", title: "제목입니다.", content: "내용입니다.", coments: 4, time: "2023-10-31" },
    { user_id: "user123", title: "제목입니다.", content: "내용입니다.", coments: 4, time: "2023-10-31" },
    {
      user_id: "user123",
      title: "제목입니다.",
      content:
        "내용입니다.asdaaaa aaaaaaaaaa aaaaaa aaaaa sdasdasda sfsdzz zzzzz zzzzzzzzzz zzzz skjdfhksbf  skdjfhKDJ F kf KSDJHfKAJH kajdhAKJHd KA AKJf AKJSdAJKS zzzzzz zzzzzzz zzzz zzzz zzzzzzzzzzz zzzzzzzzzz zzzzzzzzzzz zzzzzzzz zz zzz",
      coments: 4,
      time: "2023-10-31",
    },
  ];
  return (
    <div className="free-board-page">
      <BoardListHeader header="자유게시판" desc={desc}></BoardListHeader>
      <BoardNav point="620개" text="의 글 목록" />
      <FreeBoardList boardList={boardList} />
      <div className="pagination">
        <Pagination count={20} color="secondary" siblingCount={2} />
      </div>
    </div>
  );
}
