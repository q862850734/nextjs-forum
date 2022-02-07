import type { NextPage } from "next";

import { gql, useQuery } from "@apollo/client";
import { initializeApollo } from "../../lib/apollo";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";

import BaseCard from "components/BaseCard";
import { ForumHead } from "components/Forum";
import RouteLink from "components/RouteLink";
import PostCard from "components/PostCard";

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
        likesCount
        isLiked
        author {
          name
        }
      }
    }
  }
`;

export async function getServerSideProps({ query: { name } }) {
  const apolloClient = initializeApollo();

  const {
    data: { tagPosts },
  } = await apolloClient.query({
    query: TAG_BY_NAME,
    variables: {
      name,
    },
  });

  return { props: { tagPosts } };
}

export default function Forum({ tagPosts: tag }) {
  return (
    <>
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
