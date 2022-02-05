import { useState, useMemo, createContext } from "react";
import {
  ThemeProvider,
  createTheme,
  PaletteOptions,
} from "@mui/material/styles";

export const Themes: Array<PaletteOptions> = [
  {
    mode: "light",
  },
  {
    mode: "dark",
  },
  {
    mode: "light",
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
      secondary: "rgba(255,255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
    },
  },
  {
    mode: "dark",
    primary: {
      main: "#444756",
      contrastText: "#c3e4fa",
      dark: "#515260",
    },
    secondary: {
      main: "#fff",
      contrastText: "#fff",
    },
    text: {
      primary: "#c3e4fa",
      secondary: "rgba(195, 228, 250, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
    },
  },
  {
    mode: "dark",
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
  {
    mode: "light",
    primary: {
      main: "#1a1a40",
      contrastText: "#fa58b6",
    },
    secondary: {
      main: "#270082",
      contrastText: "#7a0bc0",
    },
    text: {
      primary: "#fa58b6",
      secondary: "rgba(255,255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
    },
  },
];

export const ColorModeContext = createContext({
  toggleColorMode: (mode: number) => {},
});
const getDesignTokens = (mode: number) => ({
  palette: {
    ...Themes[mode],
  },
});
export default function ToggleColorMode({ children }) {
  const [mode, setMode] = useState(2);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: (mode) => {
        setMode(mode);
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
