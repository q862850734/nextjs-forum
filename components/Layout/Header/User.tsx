import { useState, MouseEvent } from "react";

import { useSession } from "next-auth/react";

import RouteLink from "../../RouteLink";
import * as React from "react";
import {
  Box,
  Menu,
  Stack,
  Avatar,
  Divider,
  Tooltip,
  MenuItem,
  IconButton,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import Item from "./Item";

export default function User() {
  const { data: session } = useSession();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar src={session?.user["image"] || ""} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Item onClick={handleCloseUserMenu} href="/create" title="发帖">
          <EditIcon />
        </Item>
        <Item onClick={handleCloseUserMenu} href="/user" title="个人主页">
          <AccountCircleIcon />
        </Item>
        <Item onClick={handleCloseUserMenu} href="/profile" title="设置">
          <SettingsIcon />
        </Item>
        <Divider />
        <Item
          onClick={handleCloseUserMenu}
          href={"/api/auth/" + (session?.user ? "signout" : "signin")}
          title={session?.user ? "退出登录" : "登录/注册"}
        >
          {session?.user ? <LogoutIcon /> : <LoginIcon />}
        </Item>
      </Menu>
    </Box>
  );
}
