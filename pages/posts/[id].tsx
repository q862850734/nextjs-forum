import { Box, Typography, Chip, Stack } from "@mui/material";
import { gql, useQuery, useMutation } from "@apollo/client";
import { initializeApollo } from "lib/apollo";
import RouteLink from "components/RouteLink";
import BasicBreadcrumbs from "components/BasicBreadcrumbs";
import Loading from "components/Loading";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const POST_BY_ID = gql`
  query Query($post_id: Int!) {
    postById(id: $post_id) {
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

export async function getServerSideProps({ query: { id } }) {
  const {
    data: { postById },
  } = await initializeApollo().query({
    query: POST_BY_ID,
    variables: {
      post_id: Number(id),
    },
  });

  if (!postById)
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  return {
    props: { data: { ...postById } },
  };
}

export default function Posts({ data }) {
  const router = useRouter();
  if (!data) if (router.isFallback) return <Loading />;
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
      {data?.forum && data.forum.title && (
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
      )}
      <Typography align="center" variant="h4" component="h2">
        {data.title}
      </Typography>
      <Box sx={{ width: 1, py: 1, display: "flex", justifyContent: "center" }}>
        <Stack direction="row" spacing={2}>
          {data?.tags &&
            data.tags.length > 0 &&
            data.tags.map((x) => (
              <RouteLink key={x.id} href={"/tag/" + x.name} title={x.name}>
                <Chip label={x.name} />
              </RouteLink>
            ))}
        </Stack>
      </Box>
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          my: 2,
        }}
        className="braft-output-content"
        dangerouslySetInnerHTML={{ __html: data.content }}
      ></Box>
    </Box>
  );
}
