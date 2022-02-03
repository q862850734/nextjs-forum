import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Nav from "./Nav";
import Avatar from "./Avatar";
import Palette from "./Palette";

export default function index({ sx = {} }) {
  return (
    <Box
      sx={{
        boxShadow: 1,
        ...sx,
      }}
      component="header"
    >
      <Container
        maxWidth="xl"
        sx={{
          height: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Nav />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Palette />
          <Avatar />
        </Box>
      </Container>
    </Box>
  );
}
