import type { NextPage } from "next";
import { Box, Grid, Paper } from "@mui/material";
import { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import HeadTitle from "../components/HeadTitle";
import { gql } from "@apollo/client";
import { initializeApollo } from "../lib/apollo";
import SwipeBanner from "../components/SwipeBanner";

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        height: "30%",
        ...sx,
      }}
      {...other}
    />
  );
}

const BANNERS = gql`
  query Query {
    banners {
      image
    }
  }
`;

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: BANNERS,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default function Home({ initialApolloState: { ROOT_QUERY } }) {
  const { banners } = ROOT_QUERY;

  return (
    <>
      <HeadTitle title="首页" />
      <Box
        sx={{
          width: 1,
          height: 1,
          display: "grid",
          gridAutoColumns: "1fr",
          gap: 1,
        }}
      >
        <Item
          sx={{
            gridRow: "1",
            gridColumn: "span 3",
            background:
              "url(https://uploadstatic.mihoyo.com/contentweb/20200211/2020021114220951905.jpg)",
          }}
        >
          <SwipeBanner banners={banners} />
        </Item>
        <Item sx={{ gridRow: "1", gridColumn: "4 / 5", bgcolor: "blue" }}>
          4 / 5
        </Item>
      </Box>
    </>
  );
}
