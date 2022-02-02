import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { initializeApollo } from "../../lib/apollo";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout";

const ALL_USER_QUERY = gql`
  query Query {
    allUsers {
      name
      email
    }
  }
`;

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_USER_QUERY,
  });

  console.log(apolloClient.cache.extract());

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default function index() {
  const {
    data: { allUsers },
    loading,
    error,
  } = useQuery(ALL_USER_QUERY);
  console.log(allUsers);

  return (
    <Layout>
      <h1>111</h1>
    </Layout>
  );
}
