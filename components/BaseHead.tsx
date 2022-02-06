import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import Image from "next/image";
interface Props {
  title: string;
  icon: string;
  description?: string;
}
const BaseHead = ({ title, icon, description = "" }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Avatar sx={{ width: 100, height: 100 }}>
        <Image layout="fill" src={icon} alt={title}></Image>
      </Avatar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          ml: 2,
        }}
      >
        <Typography variant="h3" component="h2">
          {title}
        </Typography>
        <Typography variant="subtitle1" component="h3">
          {description || "版主很懒什么都没写"}
        </Typography>
      </Box>
    </Box>
  );
};

export default BaseHead;
