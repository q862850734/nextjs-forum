import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Autocomplete,
  TextField,
  Chip,
} from "@mui/material";
import { getSession } from "next-auth/react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { initializeApollo } from "../lib/apollo";

import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { Forum, Tag } from "@prisma/client";

import TagsInput from "components/TagsInput";

const Editor = dynamic(() => import("components/Editor"), {
  ssr: false,
});

const CREATE_POST = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
    }
  }
`;

export default function Create({ session }) {
  const [forumData, setData] = useState({});
  useEffect(() => {
    if (forumData["title"]) {
      addPost();
    }
  }, [forumData]);
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setData(data);
    // addPost();
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

  const [addPost, { data: d, loading: l, error }] = useMutation(
    gql(`
  mutation Mutation($title: String, $description: String, $content: String, $forum: String) {
    addPost(title: $title, description: $description, content: $content, forum: $forum) {
      title
    }
  }`),
    {
      variables: {
        ...forumData,
      },
    }
  );

  if (loading) return <div>Loading</div>;
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
      <Autocomplete
        multiple
        options={tags.map((option) => option.name)}
        defaultValue={[tags[0].name]}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              key={index}
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="标签"
            placeholder="Favorites"
          />
        )}
      />

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
