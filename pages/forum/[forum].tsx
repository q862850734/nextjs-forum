import type { NextPage } from "next";

import { gql, useQuery } from "@apollo/client";
import { initializeApollo } from "../../lib/apollo";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";

import BaseCard from "components/BaseCard";
import { ForumHead } from "components/Forum";
import RouteLink from "components/RouteLink";
import HeadTitle from "components/HeadTitle";
import PostCard from "components/PostCard";
import { useSession } from "next-auth/react";

const FORUM_BY_ID = gql`
  query ForumById($forumByIdId: Int!) {
    forumById(id: $forumByIdId) {
      id
      title
      subscribers
      description
      icon
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
        like {
          email
          image
        }
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

export default function Forum({ forumById: forum }) {
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
          <ForumHead {...forum} />
        </BaseCard>

        <BaseCard sx={{ flex: 1 }}>
          {forum.posts.map((x) => (
            <PostCard key={x.id} {...x} />
          ))}
        </BaseCard>
      </Box>
    </>
  );
}
