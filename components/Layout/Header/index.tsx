import * as React from "react";

import { AppBar, Toolbar, Typography, Container, Stack } from "@mui/material";
import User from "./User";
import Nav from "./Nav";
import Palette from "./Palette";

const ResponsiveAppBar = () => {
  return (
    <AppBar position="static" sx={{ alignItems: "center" }}>
      <Container maxWidth="xl" sx={{ height: "8vh", minHeight: "8vh" }}>
        <Toolbar disableGutters sx={{ height: "8vh", minHeight: "8vh" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Next
          </Typography>

          <Nav />
          <Typography
            variant="h6"
            noWrap
            component="h1"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Next
          </Typography>
          <Stack direction="row" spacing={2}>
            <Palette />
            <User />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
