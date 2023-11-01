import React from "react";
import BoardListHeader from "../../components/board/BoardHeader";
import "./PRBoardListPage.scss";
import PRBoardList from "../../components/board-pr/PRBoardList";
import UpButton from "../../components/common/button/UpButton";

export default function PRBoardListPage() {
  const desc = (
    <p>
      소규모 연극을 홍보하는 곳입니다.
      <br />
      모든 연극인을 응원합니다.
      <br />
      누구나 작성할 수 있습니다.{" "}
    </p>
  );

  const boardList = [
    {
      user_id: "user123",
      title: "제목입니다.",
      content: "내용입니다.",
      coments: 4,
      time: "2023-10-31",
      img: "https://t-img1.wemep.co.kr/wmp-tevent/21/202308/18/0oe16hzalbp6.jpg",
    },
    {
      user_id: "user123",
      title: "제목입니다.",
      content: "내용입니다.",
      coments: 4,
      time: "2023-10-31",
      img: "https://t-img1.wemep.co.kr/wmp-tevent/36/202309/18/egk8yqr8m6jz_pc.jpg",
    },
    {
      user_id: "user123",
      title: "제목입니다.",
      content: "내용입니다.",
      coments: 4,
      time: "2023-10-31",
      img: "https://t-img1.wemep.co.kr/wmp-tevent/21/202308/18/0oe16hzalbp6.jpg",
    },
    {
      user_id: "user123",
      title: "제목입니다.",
      content: "내용입니다.",
      coments: 4,
      time: "2023-10-31",
      img: "https://t-img1.wemep.co.kr/wmp-tevent/36/202309/18/egk8yqr8m6jz_pc.jpg",
    },
    { user_id: "user123", title: "제목입니다.", content: "내용입니다.", coments: 4, time: "2023-10-31" },
    { user_id: "user123", title: "제목입니다.", content: "내용입니다.", coments: 4, time: "2023-10-31" },
    { user_id: "user123", title: "제목입니다.", content: "내용입니다.", coments: 4, time: "2023-10-31" },
    { user_id: "user123", title: "제목입니다.", content: "내용입니다.", coments: 4, time: "2023-10-31" },
    { user_id: "user123", title: "제목입니다.", content: "내용입니다.", coments: 4, time: "2023-10-31" },
    {
      user_id: "user123",
      title: "제목입니다.",
      content:
        "내용입니다.asdaaaa aaaaaaaaaa aaaaaa aaaaa sdasdasda sfsdzz zzz zz zzzzz zzzzz zzzz skjdfhksbf  skdjfhKDJ F kf KSDJHfKAJH kajdhAKJHd KA AKJf AKJSdAJKS zzzzzz zzzzzzz zzzz zzzz zzzzzzzzzzz zzzzzzzzzz zzzzzzzzzzz zzzzzzzz zz zzz",
      coments: 4,
      time: "2023-10-31",
    },
  ];

  return (
    <div className="pr-board-page">
      <BoardListHeader header="홍보게시판" desc={desc} />
      <PRBoardList boardList={boardList} />
      <UpButton />
    </div>
  );
}
