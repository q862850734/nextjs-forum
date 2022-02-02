import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Nav from "./Nav";
import Avatar from "./Avatar";

export default function index() {
  return (
    <Box
      sx={{
        boxShadow: 1,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "primary.main",
        }}
      >
        <Nav />
        <Avatar />
      </Container>
    </Box>
  );
}
