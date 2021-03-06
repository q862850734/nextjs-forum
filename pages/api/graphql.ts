import { ApolloServer } from "apollo-server-micro";
import schema from "../../schema";
import { createContext } from "../../schema/context";
import Cors from "micro-cors";

const cors = Cors();
const apolloServer = new ApolloServer({
  //@ts-ignore
  schema,
  context: createContext,
});
const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
