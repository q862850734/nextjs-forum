import { Stack, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

interface Props {
  viewCount: number;
  likesCount: number;
  isLiked: boolean;
}
const Operate = ({ isLiked, viewCount, likesCount }: Props) => {
  return (
    <Stack direction="row" spacing={2}>
      <Stack direction="row" spacing={1}>
        {isLiked ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
        <Typography>{likesCount}</Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <RemoveRedEyeOutlinedIcon />
        <Typography>{viewCount}</Typography>
      </Stack>
    </Stack>
  );
};

export default Operate;
