import { Box, Typography } from "@mui/material";
import HeadTitle from "./HeadTitle";

const BaseWrap = ({ children, title = "", sx = {} }) => {
  return (
    <>
      <HeadTitle {...{ title }} />
      <Box
        sx={{
          width: 1,
          height: 1,
          borderRadius: 2,
          p: 2,
          display: "flex",
          flexDirection: "column",
          ...sx,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default BaseWrap;
