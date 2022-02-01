import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

const allUserQuery = gql`
  query Query {
    allUsers {
      name
      email
    }
  }
`;

const setPassword = gql`
  mutation Mutation($password: String!) {
    userSetPassword(password: $password) {
      email
      password
    }
  }
`;

const Test: NextPage = () => {
  const [mutateFunction, { loading, error }] = useMutation(setPassword, {
    onCompleted: () => reset(),
  });
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async ({ password }) => {
    mutateFunction({ variables: { password } });
  };
  return (
    <div>
      <h1>Test</h1>
      {session?.user && <h2>{session.user["email"]}</h2>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="password"
          {...register("password", { required: true })}
        />
        <button>提交</button>
      </form>
    </div>
  );
};

export default Test;
