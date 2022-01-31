import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Test: NextPage = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      <h1>Test</h1>
      {session?.user && <h2>{session.user["email"]}</h2>}
    </div>
  );
};

export default Test;
