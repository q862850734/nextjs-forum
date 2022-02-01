import React from "react";
import { Box } from "@mui/material";
import Nav from "./Nav";

function index() {
  return (
    <Box
      sx={{
        width: "100%",
        background: "lightblue",
      }}
    >
      <Nav></Nav>
    </Box>
  );
}

export default index;
