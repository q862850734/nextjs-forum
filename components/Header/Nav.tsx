import React from "react";
import { Box } from "@mui/material";
import Link from "next/link";

function Nav() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        "&>a": {
          mx: 2,
          mt: 1,
        },
      }}
    >
      <Link href="/" passHref>
        <a>首页</a>
      </Link>
      <Link href="/" passHref>
        <a>热门</a>
      </Link>
      <Link href="/" passHref>
        <a>我的</a>
      </Link>
    </Box>
  );
}

export default Nav;
