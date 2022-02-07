import React from "react";
import { Box, Grid, Typography, Avatar } from "@mui/material";
import RouteLink from "./RouteLink";
import { NexusGenObjects } from "../@types/nexus-typegen";
import Image from "next/image";
import PostOperateBar from "./PostOperateBar";

type Props = NexusGenObjects["Post"] & {
  author?: NexusGenObjects["User"];
};

export const PostCard = ({
  title,
  thumbnail,
  description,
  id,
  viewCount,
  likesCount,
  isLiked,
  author,
}: Props) => {
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
      <Box
        sx={{ flex: 1, height: 150, display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ display: "flex", pb: 1, w: 1, alignItems: "center" }}>
          <Avatar src={author.image} />
          <Typography
            sx={{
              px: 2,
            }}
            variant="h5"
            component="h3"
          >
            {author.name}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <RouteLink href={"/posts/" + id} title={title}>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="subtitle1" component="h3">
              {description}
            </Typography>
          </RouteLink>
        </Box>
        <PostOperateBar {...{ viewCount, isLiked, likesCount }} />
      </Box>
      <Box sx={{ height: 150 }}>
        {thumbnail && <Image width={150} height={150} src={thumbnail}></Image>}
      </Box>
    </Box>
  );
};

export default PostCard;
