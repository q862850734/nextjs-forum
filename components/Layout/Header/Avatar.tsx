import { useState, MouseEvent } from "react";

import { signIn, signOut, useSession } from "next-auth/react";

import RouteLink from "../../RouteLink";
import {
  Button,
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
          {session && (
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
        <Item href="/" title="个人主页">
          <AccountCircleIcon />
        </Item>
        <Item href="/create" title="发帖">
          <EditIcon />
        </Item>
        <Divider />
        <Item
          href={"/api/auth/" + (session ? "signout" : "signin")}
          title={session ? "退出登录" : "登录/注册"}
        >
          {session ? <LogoutIcon /> : <LoginIcon />}
        </Item>
      </Menu>
    </Box>
  );
}
