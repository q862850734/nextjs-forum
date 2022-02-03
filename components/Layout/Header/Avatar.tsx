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
import Image from "next/image";

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
        <MenuItem onClick={handleClose}>
          <Stack direction="row" spacing={2}>
            <AccountCircleIcon />
            <RouteLink href="/" title="个人主页" />
          </Stack>
        </MenuItem>
        <Divider />
        {session ? (
          <MenuItem
            onClick={() => {
              signOut();
            }}
          >
            <Stack direction="row" spacing={2}>
              <LogoutIcon />
              <Typography>退出登录</Typography>
            </Stack>
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              signIn();
            }}
          >
            <Stack direction="row" spacing={2}>
              <LoginIcon />
              <Typography>登录/注册</Typography>
            </Stack>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}
