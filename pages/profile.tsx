import React from "react";
import { Box, Grid, TextField, Avatar, Button } from "@mui/material";
import BaseWrap from "components/BaseWrap";
import { getSession } from "next-auth/react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { initializeApollo } from "../lib/apollo";
import { useForm } from "react-hook-form";
import Image from "next/image";

const profile = ({ session }): React.Component => {
  // const [setProfile,{data:d,loading:l,error:r}] = useMutation(gql;``)
  const { register, handleSubmit, formState } = useForm();
  const onSubmit = (e) => {
    console.log(e, formState);
  };
  const { data, loading } = useQuery(
    gql`
      query Query($email: String!) {
        userByEmail(email: $email) {
          name
          email
          password
          image
          profile {
            bio
            banner
            background
            userId
          }
        }
      }
    `,
    {
      variables: {
        email: session.user["email"],
      },
    }
  );
  if (loading) return <p>loading...</p>;

  const {
    userByEmail: { image, name, password, profile },
  } = data;

  return (
    <BaseWrap>
      <Grid
        container
        sx={{
          height: 1,
          width: 1,
        }}
      >
        <Grid item xs={8} sx={{ height: 1 }}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { my: 2, width: 1 },
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              {...register("username")}
              label="用户名"
              defaultValue={name || "Hello World"}
            />
            <TextField
              type="password"
              placeholder="请输入密码"
              {...register("password")}
              label="密码"
            />
            <TextField {...register("bio")} label="简介" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 2 }}
            >
              保存
            </Button>
          </Box>
        </Grid>
        <Grid item xs={4} sx={{ height: 1 }}>
          <Avatar sx={{ height: 200, width: 200, mt: 2, ml: 2 }}>
            <Image layout="fill" src={image} alt=""></Image>
          </Avatar>
        </Grid>
      </Grid>
    </BaseWrap>
  );
};

export default profile;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}