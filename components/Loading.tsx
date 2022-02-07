import { Box, CircularProgress } from "@mui/material";
const Loading = () => (
  <Box
    sx={{
      height: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <CircularProgress />
  </Box>
);

export default Loading;
