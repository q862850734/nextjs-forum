import type { NextPage } from "next";
import HeadTitle from "../../components/HeadTitle";
import { gql, useQuery } from "@apollo/client";
import { initializeApollo } from "../../lib/apollo";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";

const FORUM_BY_ID = gql`
  query ForumById($forumByIdId: Int!) {
    forumById(id: $forumByIdId) {
      title
      posts {
        title
        id
        description
        updatedAt
        url
        thumbnail
        viewCount
        likesCount
        isLiked
        author {
          name
        }
      }
    }
  }
`;

export async function getServerSideProps({ query: { forum } }) {
  const apolloClient = initializeApollo();

  const {
    data: { forumById },
  } = await apolloClient.query({
    query: FORUM_BY_ID,
    variables: {
      forumByIdId: Number(forum),
    },
  });

  return { props: { forumById } };
}

export default function Forum({ forumById: { posts } }) {
  return (
    <Box
      sx={{
        width: 1,
        height: 1,
      }}
    >
      <HeadTitle title="首页" />

      {posts &&
        posts.map((x) => (
          <Typography component="section" key={x.id}>
            {x.title}
          </Typography>
        ))}
    </Box>
  );
}
