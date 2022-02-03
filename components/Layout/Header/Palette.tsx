import { useContext, MouseEvent, useState } from "react";

import { Button, IconButton, Typography, Popover } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import { Themes } from "../../AppProvider";
import { ColorModeContext } from "../../AppProvider";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";

export default function Palette() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  return (
    <div>
      <IconButton
        onClick={handleClick}
        sx={{
          color: "primary.contrastText",
        }}
      >
        <PaletteIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <IconButton
          onClick={() => {
            colorMode.toggleColorMode(theme.palette.mode === "dark" ? 0 : 1);
          }}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
        {Themes.slice(2).map((x, i) => (
          <IconButton
            key={i}
            size="large"
            onClick={() => {
              colorMode.toggleColorMode(i + 2);
            }}
            sx={{ m: 1, bgcolor: x.primary["main"] }}
          ></IconButton>
        ))}
      </Popover>
    </div>
  );
}
