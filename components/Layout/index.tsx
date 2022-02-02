import React from "react";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Header from "./Header";
import { Hidden } from "@mui/material";

export default function Layout({ children, title = "Next Forum" }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Container
          maxWidth="lg"
          sx={{
            height: "100%",
            flex: "1",
            p: 1,
            overflow: "auto",
          }}
        >
          {children}
        </Container>
      </Box>
    </React.Fragment>
  );
}
