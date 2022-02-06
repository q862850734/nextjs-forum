import { GraphQLSchema } from "graphql";
import { makeSchema, connectionPlugin } from "nexus";
import { join } from "path";
import * as Types from "./type-defs";

const schema = makeSchema({
  types: [Types],
  plugins: [connectionPlugin()],
  outputs: {
    typegen: join(process.cwd(), "@types", "nexus-typegen.d.ts"),
    schema: join(process.cwd(), "schema", "schema.graphql"),
  },
  contextType: {
    export: "Context",
    module: join(process.cwd(), "schema", "context.ts"),
  },
});

export default schema;
