import { useState, MouseEvent } from "react";

import { signIn, signOut, useSession } from "next-auth/react";

import RouteLink from "../../RouteLink";
import {
  Box,
  IconButton,
  Avatar as UserAvatar,
  Menu,
  MenuItem,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";

function Item({ href, title, children }) {
  return (
    <MenuItem>
      <Stack direction="row" spacing={2}>
        {children}
        <RouteLink href={href} title={title} />
      </Stack>
    </MenuItem>
  );
}
export default function Avatar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { data: session, status } = useSession();

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <UserAvatar>
          {session?.user && (
            <Image
              layout="fill"
              src={session.user["image"]}
              alt={session.user["name"]}
            />
          )}
        </UserAvatar>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Item href="/create" title="发帖">
          <EditIcon />
        </Item>
        <Item href="/user" title="个人主页">
          <AccountCircleIcon />
        </Item>

        <Item href="/profile" title="设置">
          <SettingsIcon />
        </Item>
        <Divider />
        <Item
          href={"/api/auth/" + (session?.user ? "signout" : "signin")}
          title={session?.user ? "退出登录" : "登录/注册"}
        >
          {session?.user ? <LogoutIcon /> : <LoginIcon />}
        </Item>
      </Menu>
    </Box>
  );
}
