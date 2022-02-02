import { useContext, useState, MouseEvent } from "react";
import { useTheme } from "@mui/material/styles";
import { signIn, signOut, useSession } from "next-auth/react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import RouteLink from "../../RouteLink";
import {
  Box,
  IconButton,
  Avatar as UserAvatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { ColorModeContext } from "../../AppProvider";
import Image from "next/image";

export default function Avatar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
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
          <RouteLink href="/" title="个人主页" />
        </MenuItem>
        {session ? (
          <MenuItem
            onClick={() => {
              signOut();
            }}
          >
            退出登录
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              signIn();
            }}
          >
            登录/注册
          </MenuItem>
        )}
        <MenuItem onClick={handleClose}>
          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </MenuItem>
      </Menu>
    </Box>
  );
}
