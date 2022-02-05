import React from "react";
import { Box } from "@mui/material";
import RouteLink from "../../RouteLink";

const option = {
  variant: "h6",
  sx: { p: 2 },
  align: "center",
};

export default function Nav() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        height: "6vh",
        alignItems: "center",
      }}
      component="nav"
    >
      <RouteLink option={option} title="首页" href="/" />
      <RouteLink option={option} title="测试" href="/test" />
      <RouteLink option={option} title="排版" href="/typography" />
      <RouteLink option={option} title="发帖" href="/create" />
    </Box>
  );
}
