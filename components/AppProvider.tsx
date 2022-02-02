import { useState, useMemo, createContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  amber,
  blue,
  deepOrange,
  grey,
  pink,
  indigo,
} from "@mui/material/colors";
import { PaletteMode } from "@mui/material";

const Themes = [
  {
    type: "dark",
    palette: {
      primary: {
        main: "#565a72",
        contrastText: "#f7d6ca",
      },
      secondary: {
        main: "#8387a1",
        contrastText: "#fffffd",
      },
      background: {
        default: "#2c3147",
        paper: "#434343",
      },
      text: {
        primary: "#f7d6ca",
        secondary: "rgba(255, 255, 255, 0.7)",
        disabled: "rgba(255, 255, 255, 0.5)",
        hint: "rgba(255, 255, 255, 0.5)",
      },
    },
  },
  {
    type: "light",
    primary: {
      main: "#342bad",
      contrastText: "#FA9AF2",
    },
    secondary: {
      main: "#6e56e0",
      contrastText: "#ffccff",
    },
    text: {
      primary: "rgba(203,20,65,0.87)",
      secondary: "rgba(214,81,114,0.54)",
      disabled: "rgba(214,81,114,0.38)",
      hinit: "rgba(214,81,114,0.38)",
    },
    background: {
      default: "#efb5a5",
      paper: "#f9f9f7",
    },
  },
  {
    primary: {
      main: "#072227",
      contrastText: "#AEFEFF",
    },
    secondary: {
      main: "#35858B",
      contrastText: "#AEFEFF",
    },
  },
  {
    type: "light",
    primary: {
      main: "#444756",
      contrastText: "#c3e4fa",
      dark: "#515260",
    },
    secondary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
];

export const ColorModeContext = createContext({ toggleColorMode: () => {} });
const getDesignTokens = (mode: number) => ({
  palette: {
    ...Themes[1],
  },
});
export default function ToggleColorMode({ children }) {
  const [mode, setMode] = useState(0);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(3);
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
