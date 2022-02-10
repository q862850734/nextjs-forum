import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Avatar,
  Stack,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import BaseWrap from "components/BaseWrap";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import BaseHead from "components/BaseHead";
import Loading from "components/Loading";
import toast from "react-hot-toast";

const SET_PROFILE = gql`
  mutation Mutation(
    $bio: String
    $image: String
    $name: String
    $banner: String
    $background: String
  ) {
    setProfile(
      bio: $bio
      image: $image
      name: $name
      banner: $banner
      background: $background
    ) {
      name
      emailVerified
      email
      password
    }
  }
`;

const LOAD_USER = gql`
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
`;

const Input = styled("input")({
  display: "none",
});

const ImageUpload = ({ children, sx = {}, register }) => {
  return (
    <Box
      sx={{
        ...sx,
      }}
    >
      {children}
      <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="icon-button-file">
          <Input
            {...register}
            accept="image/*"
            id="icon-button-file"
            type="file"
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
      </Stack>
    </Box>
  );
};

const Profile = ({ session }) => {
  // const [setProfile,{data:d,loading:l,error:r}] = useMutation(gql;``)
  const { register, watch, handleSubmit, formState } = useForm();
  const watchShowAge = watch("image", "s");
  const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
  const watchFields = watch(["image", "age"]); // you can also target specific fields by their names
  const [setProfile, { data: pro, loading: l }] = useMutation(SET_PROFILE);

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(watchShowAge);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (e) => {
    console.log(e);

    // toast.promise(
    //   setProfile({
    //     variables: {
    //       ...e,
    //     },
    //   }),
    //   {
    //     loading: "正在保存",
    //     success: "保存成功",
    //     error: "保存失败",
    //   }
    // );
  };
  const { data, loading } = useQuery(LOAD_USER, {
    variables: {
      email: session.user["email"],
    },
  });

  if (loading) return <Loading />;

  const {
    userByEmail: { image, name, password, email, profile },
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
              {...register("name")}
              label="用户名"
              defaultValue={name || "Hello World"}
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
            <BaseHead
              title={name || email}
              icon={image || ""}
              description={profile ? profile.bio : "这个人什么都没写..."}
            />
          </Box>
        </Grid>
        <Grid item xs={4} sx={{ height: 1 }}>
          <ImageUpload sx={{ pl: 2 }} register={{ ...register("image") }}>
            <Avatar src={image} sx={{ height: 200, width: 200 }} />
          </ImageUpload>
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
