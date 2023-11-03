import React from "react";
import "./PaginationBox.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationBox() {
  return (
    <div className="play-list-pagenation">
      <Stack spacing={2}>
        <Pagination count={10} color="secondary" size="large" />
      </Stack>
    </div>
  );
}
