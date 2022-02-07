import React from "react";
import {
  Box,
  Grid,
  TextField,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import BaseWrap from "components/BaseWrap";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { gql, useQuery, useMutation } from "@apollo/client";
import { initializeApollo } from "../lib/apollo";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Loading from "components/Loading";

const Profile = ({ session }) => {
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

  if (loading) return <Loading />;

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
          <Avatar src={image} sx={{ height: 200, width: 200, mt: 2, ml: 2 }} />{" "}
        </Grid>
      </Grid>
    </BaseWrap>
  );
};

export default Profile;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

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
