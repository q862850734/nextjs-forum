import { Box, Stack, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/zh-cn";

interface Props {
  id: number;
  viewCount: number;
  isLiked: boolean;
  like: any;
  createdAt: any;
}
const THUMB = gql`
  mutation Mutation($thumbId: Int!, $type: Boolean!) {
    thumb(id: $thumbId, type: $type) {
      thumb_list {
        id
      }
      posts {
        like {
          name
        }
        likesCount
      }
    }
  }
`;
const Operate = ({ id, viewCount, isLiked, like, createdAt }: Props) => {
  moment.locale("zh-cn");
  const { data: session, status } = useSession();
  const [thumb, { data, loading, error }] = useMutation(THUMB);
  const [likeState, setLike] = useState(false);
  const [likeCount, setCount] = useState(0);
  useEffect(() => {
    setLike(isLiked);
    setCount(like?.length);
  }, []);

  const clickHandle = () => {
    thumb({
      variables: {
        thumbId: id,
        type: !likeState,
      },
    }).then(() => {
      setLike(!likeState);
      setCount((v) => (likeState ? v - 1 : v + 1));
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: 1,
        px: 1,
        justifyContent: "space-between",
      }}
    >
      <Stack direction="row" spacing={3}>
        <Stack direction="row" spacing={1}>
          {likeState ? (
            <ThumbUpIcon onClick={clickHandle} />
          ) : (
            <ThumbUpAltOutlinedIcon onClick={clickHandle} />
          )}
          <Typography>{likeCount}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <RemoveRedEyeOutlinedIcon />
          <Typography>{viewCount}</Typography>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1}>
        <AccessTimeIcon />
        <Typography>{moment(createdAt).format("lll")}</Typography>
      </Stack>
    </Box>
  );
};

export default Operate;
