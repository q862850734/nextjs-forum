import { gql, useQuery } from "@apollo/client";
// import apolloClient from "../../lib/apollo";
import { initializeApollo } from "../../lib/apollo";
import { Box, Typography } from "@mui/material";
import { getSession } from "next-auth/react";
import BaseCard from "components/BaseCard";
import PostCard from "components/PostCard";
import HeadTitle from "components/HeadTitle";

const TAG_BY_NAME = gql`
  query Query($name: String!) {
    tagPosts(name: $name) {
      id
      name
      posts {
        title
        id
        description
        updatedAt
        url
        thumbnail
        viewCount
        createdAt
        likesCount
        isLiked
        author {
          name
        }
        like {
          email
        }
      }
    }
  }
`;

export async function getServerSideProps({ req, query: { name } }) {
  const session = await getSession({ req });
  const {
    data: { tagPosts },
  } = await initializeApollo().query({
    query: TAG_BY_NAME,
    variables: {
      name,
    },
  });
  if (session)
    return {
      props: {
        tagPosts: {
          ...tagPosts,
          posts: tagPosts.posts.map((x) => ({
            ...x,
            isLiked:
              x.like.length > 0 &&
              x.like.some((e) => e.email === session?.user["email"]),
          })),
        },
      },
    };

  return { props: { tagPosts } };
}

export default function Forum({ tagPosts: tag }) {
  return (
    <>
      <HeadTitle title={"#" + tag?.name || "Next"} />
      <Box
        sx={{
          width: 1,
          height: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <BaseCard>
          <Typography component="h2" variant="h3">
            {"#" + tag.name}
          </Typography>
        </BaseCard>

        <BaseCard sx={{ flex: 1 }}>
          {tag.posts.map((x) => (
            <PostCard key={x.id} {...x} />
          ))}
        </BaseCard>
      </Box>
    </>
  );
}
