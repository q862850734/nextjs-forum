import { Box, Grid, Paper } from "@mui/material";
import { memo } from "react";
import { BoxProps } from "@mui/material/Box";

import { gql } from "@apollo/client";
// import apolloClient from "../lib/apollo";
import { initializeApollo } from "../lib/apollo";
import HeadTitle from "components/HeadTitle";
import SwipeBanner from "components/SwipeBanner";
import { ForumCategory, HotList } from "components/Home";

const Item = memo(function item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",

        height: { xs: 240, md: 1 },
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

export async function getServerSideProps() {
  const { data } = await initializeApollo().query({
    query: HOME_INFO,
    variables: {
      take: 6,
    },
  });

  return {
    props: { data },
  };
}
export default function Home({ data }) {
  const { banners, forumCategories, hotPosts } = data;

  return (
    <>
      <HeadTitle title="首页" />
      <Grid
        container
        direction="row"
        spacing={{ xs: 2, md: 3 }}
        alignItems="stretch"
        sx={{
          width: 1,
        }}
      >
        <Grid item xs={12} md={8}>
          <Item
            sx={{
              width: 1,
              background:
                "url(https://uploadstatic.mihoyo.com/contentweb/20200211/2020021114220951905.jpg)",
            }}
          >
            <SwipeBanner banners={banners} />
          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          {/* sx={{ bgcolor: "primary.light" }} */}
          <Item sx={{ border: 2 }}>
            <HotList data={hotPosts} />
          </Item>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: 1,
          display: "grid",
          gridAutoColumns: "1fr",
          gap: 1,
        }}
      >
        <Item
          sx={{
            gridRow: "2",
            gridColumn: "span 3",
            height: { xs: 1 / 5, md: 1 / 3 },
          }}
        >
          {forumCategories.map((x) => (
            <ForumCategory {...x} key={x.name} />
          ))}
        </Item>
      </Box>
    </>
  );
}
