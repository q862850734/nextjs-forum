import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import RouteLink from "./RouteLink";
import { NexusGenObjects } from "../@types/nexus-typegen";
import Image from "next/image";

export const PostCard = ({
  title,
  thumbnail,
  description,
  id,
  viewCount,
  likesCount,
  isLiked,
}: NexusGenObjects["Post"]) => {
  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        bgcolor: "background.paper",
        borderRadius: 1,
        display: "flex",
      }}
      component="section"
    >
      <Box sx={{ flex: 1, height: 150 }}>
        <RouteLink href={"/posts/" + id} title={title}>
          <Typography variant="h4" component="h2">
            {title}
          </Typography>
          <Typography variant="subtitle1" component="h3">
            {description}
          </Typography>
        </RouteLink>
      </Box>
      <Box sx={{ height: 150 }}>
        {thumbnail && <Image width={150} height={150} src={thumbnail}></Image>}
      </Box>
    </Box>
  );
};

export default PostCard;
