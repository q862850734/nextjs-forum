import { Box } from "@mui/material";

const BaseCard = ({ children, sx = {} }) => {
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
