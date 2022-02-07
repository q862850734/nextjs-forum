import { Stack, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
interface Props {
  id: number;
  viewCount: number;
  like: any;
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
const Operate = ({ id, viewCount, like }: Props) => {
  const { data: session, status } = useSession();
  const [thumb, { data, loading, error }] = useMutation(THUMB);
  const [isLiked, setLike] = useState(false);
  const [likeCount, setCount] = useState(0);
  useEffect(() => {
    setLike(
      like.length > 0 && like.filter((x) => x.email == session?.user["email"])
    );
    setCount(like?.length);
  }, []);

  const clickHandle = () => {
    thumb({
      variables: {
        thumbId: id,
        type: !isLiked,
      },
    }).then(() => {
      setLike(!isLiked);
      setCount((v) => (isLiked ? v - 1 : v + 1));
    });
  };
  return (
    <Stack direction="row" spacing={2}>
      <Stack direction="row" spacing={1}>
        {isLiked ? (
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
  );
};

export default Operate;
