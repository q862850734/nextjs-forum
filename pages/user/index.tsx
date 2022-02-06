import { getSession } from "next-auth/react";
import type { NextPageContext } from "next";
import { gql, useQuery, useMutation } from "@apollo/client";
import { initializeApollo } from "../../lib/apollo";
import { useForm } from "react-hook-form";

import BaseHead from "components/BaseHead";
import BaseCard from "components/BaseCard";
import BaseWrap from "components/BaseWrap";
import Image from "next/image";
import { NexusGenObjects } from "../../@types/nexus-typegen";
import PostCard from "components/PostCard";

const USER_QUERY = gql`
  query Query($email: String!) {
    userByEmail(email: $email) {
      name
      email
      image
      isBlocked
      createdAt
      posts {
        id
        title
        description
        updatedAt
        thumbnail
        viewCount
        likesCount
        isLiked
      }
      profile {
        bio
        banner
        background
      }
    }
  }
`;
type Props = NexusGenObjects["User"] & {
  posts?: [NexusGenObjects["Post"]];
  profile?: NexusGenObjects["Profile"];
};
const Index = ({ name, image, posts, profile }: Props) => {
  return (
    <BaseWrap title={name + " - " + "的主页"}>
      <BaseCard>
        <BaseHead
          title={name}
          icon={image}
          description={profile ? profile.bio : "这个人什么都没写..."}
        ></BaseHead>
      </BaseCard>
      <BaseCard sx={{ flex: "1", overflow: "auto" }}>
        {posts && posts.map((x) => <PostCard key={x.id} {...x} />)}
      </BaseCard>
    </BaseWrap>
  );
};
export default Index;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  const apolloClient = initializeApollo();

  const {
    data: { userByEmail },
  } = await apolloClient.query({
    query: USER_QUERY,
    variables: {
      email: session.user["email"],
    },
  });

  return {
    props: {
      ...userByEmail,
    },
  };
}
