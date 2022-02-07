import { Box, Typography, Chip } from "@mui/material";
import { gql, useQuery, useMutation } from "@apollo/client";
import { initializeApollo } from "../../lib/apollo";
import RouteLink from "components/RouteLink";
import BasicBreadcrumbs from "components/BasicBreadcrumbs";
const ALL_POSTS_PATH = gql`
  query Query {
    posts {
      id
    }
  }
`;

export async function getStaticPaths(t) {
  const apolloClient = initializeApollo();

  const {
    data: { posts },
  } = await apolloClient.query({
    query: ALL_POSTS_PATH,
  });

  const paths = posts.map((x) => ({
    params: { id: x.id + "" },
  }));
  return {
    paths,
    fallback: false, // false or 'blocking'
  };
}
const POST_BY_ID = gql`
  query Query($postByIdId: Int!) {
    postById(id: $postByIdId) {
      id
      authorId
      title
      description
      content
      createdAt
      updatedAt
      url
      thumbnail
      isLocked
      viewCount
      likesCount
      isLiked
      forum {
        title
        id
        category {
          name
        }
      }
      author {
        name
        id
        image
      }
      tags {
        id
        name
        description
      }
    }
  }
`;
export async function getStaticProps({ params: { id } }) {
  const apolloClient = initializeApollo();

  const {
    data: { postById },
  } = await apolloClient.query({
    query: POST_BY_ID,
    variables: {
      postByIdId: Number(id),
    },
  });
  console.log(postById);

  return {
    props: { data: { ...postById } }, // will be passed to the page component as props
  };
}

export default function Posts({ data }) {
  return (
    <Box
      component="article"
      sx={{
        boxShadow: 4,
        p: 3,
        borderRadius: 2,
        minHeight: 1,
      }}
    >
      <BasicBreadcrumbs
        {...{
          links: [
            {
              href: "/",
              title: data.forum.category.name,
            },
          ],
          title: data.forum.title,
        }}
      />
      <Typography align="center" variant="h4" component="h2">
        {data.title}
      </Typography>
      {data.tags &&
        data.tags.map((x) => (
          <RouteLink key={x.id} href={"/tag/" + x.name} title={x.name}>
            <Chip label={x.name} />
          </RouteLink>
        ))}
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          my: 2,
        }}
        dangerouslySetInnerHTML={{ __html: data.content }}
      ></Box>
    </Box>
  );
}
