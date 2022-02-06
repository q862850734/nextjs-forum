import React from "react";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Header from "./Header";

const Layout = ({ children, title = "Next Forum" }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          width: 1,
          height: 1,
        }}
      >
        <Header sx={{ height: "6vh" }} />
        <Container
          maxWidth="lg"
          sx={{
            width: 1,
            height: "94vh",
            p: 1,
            overflow: "auto",
          }}
          component="main"
        >
          {children}
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default Layout;
