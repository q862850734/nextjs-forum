import React from "react";
import { Box, SxProps } from "@mui/material";
interface Props {
  children: React.ReactNode;
  sx?: SxProps;
}
const BaseCard = ({ children, sx = {} }: Props) => {
  return (
    <Box
      sx={{
        width: 1,
        borderRadius: 2,
        mt: 2,
        p: 4,
        boxShadow: 4,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
export default BaseCard;
