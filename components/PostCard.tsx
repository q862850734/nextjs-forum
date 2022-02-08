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
  isLiked,
  like,
  createdAt,
  author,
}: any) => {
  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        border: 1,
        display: "flex",
        borderRadius: 5,
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
        <PostOperateBar {...{ id, viewCount, isLiked, like, createdAt }} />
      </Box>
      <Box sx={{ height: 150 }}>
        {thumbnail && (
          <Image
            alt={description}
            width={150}
            height={150}
            src={thumbnail}
          ></Image>
        )}
      </Box>
    </Box>
  );
};

export default PostCard;
