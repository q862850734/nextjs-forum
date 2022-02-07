import { Box, Grid, Paper } from "@mui/material";
import { memo } from "react";
import { BoxProps } from "@mui/material/Box";

import { gql } from "@apollo/client";
import { initializeApollo } from "../lib/apollo";
import HeadTitle from "components/HeadTitle";
import SwipeBanner from "components/SwipeBanner";
import { ForumCategory, HotList } from "components/Home";
import { getSession } from "next-auth/react";

const Item = memo(function item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        height: 1,
        ...sx,
      }}
      {...other}
    />
  );
});

const HOME_INFO = gql`
  query Query($take: Int) {
    banners {
      image
      name
      description
      url
    }
    forumCategories {
      name
      icon
      forum {
        id
        title
        description
      }
    }
    hotPosts(take: $take) {
      createdAt
      thumbnail
      viewCount
      id
      title
      description
    }
  }
`;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: HOME_INFO,
    variables: {
      take: 6,
    },
  });

  if (!session) {
    return {
      props: { data },
    };
  }
  const { user } = session;
  return {
    props: { user, data },
  };
}
export default function Home({ data }) {
  const { banners, forumCategories, hotPosts } = data;

  return (
    <>
      <HeadTitle title="首页" />
      <Box
        sx={{
          width: 1,
          height: 1,
        }}
        component="main"
      >
        <Grid
          container
          spacing={{ xs: 2, sm: 0.5, md: 1 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            width: 1,
            height: 4 / 10,
          }}
        >
          <Grid item xs={4} sm={5} md={8}>
            <Item
              sx={{
                background:
                  "url(https://uploadstatic.mihoyo.com/contentweb/20200211/2020021114220951905.jpg)",
              }}
            >
              <SwipeBanner banners={banners} />
            </Item>
          </Grid>
          <Grid item xs={4} sm={3} md={4}>
            <Item sx={{ bgcolor: "primary.light" }}>
              <HotList data={hotPosts} />
            </Item>
          </Grid>
        </Grid>
        <Box
          sx={{
            width: 1,
            height: 2 / 3,
            display: "grid",
            gridAutoColumns: "1fr",
            gap: 1,
          }}
        >
          <Item sx={{ gridRow: "2", gridColumn: "span 3", height: 1 / 3 }}>
            {forumCategories.map((x) => (
              <ForumCategory {...x} key={x.name} />
            ))}
          </Item>
        </Box>
      </Box>
    </>
  );
}
