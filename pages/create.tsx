import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Autocomplete,
  TextField,
  Chip,
} from "@mui/material";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { throttle } from "lodash";
import { initializeApollo } from "../lib/apollo";

import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { Forum, Tag } from "@prisma/client";
import { useRouter } from "next/router";
import TagsInput from "components/TagsInput";
import Loading from "components/Loading";
import toast, { Toaster } from "react-hot-toast";

const Editor = dynamic(() => import("components/Editor"), {
  ssr: false,
});

export default function Create({ session }) {
  const [addPost, { data: d, loading: l, error }] = useMutation(
    gql(`mutation Mutation($tags: [String]!, $title: String, $description: String, $content: String, $forum: String) {
      addPost(tags: $tags, title: $title, description: $description, content: $content, forum: $forum) {
        id
      }
    }`)
  );
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    addPost({ variables: { ...data } })
      .then(
        ({
          data: {
            addPost: { id },
          },
        }) => {
          toast.success("提交成功");
          router.push("/posts/" + id);
        }
      )
      .catch((e) => {
        toast.error(e);
      });
  };

  const { loading, data } = useQuery(gql`
    query Query {
      forums {
        id
        title
        icon
      }
      tags {
        id
        name
      }
    }
  `);

  if (loading) return <Loading />;
  const { forums, tags } = data;

  const defaultProps = (data, key) => {
    return {
      options: data,
      getOptionLabel: (option) => option[key],
    };
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography>{session.user.name}</Typography>
      <Autocomplete
        {...defaultProps(forums, "title")}
        disablePortal
        id="combo-box-demo"
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...register("forum")}
            required
            fullWidth
            {...params}
            label="论坛"
          />
        )}
      />
      <TextField
        {...register("title")}
        fullWidth
        required
        id="outlined-title"
        label="标题"
      />
      <TextField
        {...register("description")}
        fullWidth
        required
        id="outlined-desc"
        label="描述"
      />
      <TagsInput control={control} tags={tags} />

      <Box
        sx={{
          p: 1,
          boxShadow: 4,
        }}
      >
        <Editor control={control}></Editor>
      </Box>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        提交
      </Button>
    </Box>
  );
}
const secret = process.env.SECRET;
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  const token = await getToken({ req, secret });
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
