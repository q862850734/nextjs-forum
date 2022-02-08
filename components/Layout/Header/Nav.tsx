import React from "react";
import {
  Box,
  Button,
  MenuItem,
  IconButton,
  Menu,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Item from "./Item";
import RouteLink from "components/RouteLink";

const pages = [
  {
    title: "首页",
    href: "/",
  },
  {
    title: "发帖",
    href: "/create",
  },
];

export default function Nav() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map(({ title, href }) => (
          <Button
            key={title + href}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            <RouteLink title={title} href={href} />
          </Button>
        ))}
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map(({ title, href }) => (
            <Item
              key={title}
              onClick={handleCloseNavMenu}
              href={href}
              title={title}
            />
          ))}
        </Menu>
      </Box>
    </>
  );
}
