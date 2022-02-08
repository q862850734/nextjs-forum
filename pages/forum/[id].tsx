import { gql } from "@apollo/client";
// import apolloClient from "../../lib/apollo";
import { initializeApollo } from "../../lib/apollo";
import { Box } from "@mui/material";

import BaseCard from "components/BaseCard";
import { ForumHead } from "components/Forum";
import HeadTitle from "components/HeadTitle";
import PostCard from "components/PostCard";
import { getSession } from "next-auth/react";

const FORUM_BY_ID = gql`
  query Query($forumByIdId: Int!) {
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
        createdAt
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

export async function getServerSideProps({ req, query: { id } }) {
  const session = await getSession({ req });

  const {
    data: { forumById: forum },
  } = await initializeApollo().query({
    query: FORUM_BY_ID,
    variables: {
      forumByIdId: Number(id),
    },
  });
  if (!forum)
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };

  if (session)
    return {
      props: {
        forum: {
          ...forum,
          posts: forum.posts.map((x) => ({
            ...x,
            isLiked:
              x.like.length > 0 &&
              x.like.some((e) => e.email === session?.user["email"]),
          })),
        },
      },
    };
  return { props: { forum } };
}

export default function Forum({ forum }) {
  console.log(forum);

  return (
    <>
      <HeadTitle title={forum.title} />
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
