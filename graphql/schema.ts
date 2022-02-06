import { GraphQLSchema } from "graphql";
import { makeSchema, connectionPlugin } from "nexus";
import { join } from "path";
import * as Types from "./type-defs";

export const schema = makeSchema({
  types: [Types],
  plugins: [connectionPlugin()],
  outputs: {
    typegen: join(process.cwd(), "@types", "nexus-typegen.d.ts"),
    schema: join(process.cwd(), "graphql", "schema.graphql"),
  },
  contextType: {
    export: "Context",
    module: join(process.cwd(), "graphql", "context.ts"),
  },
}) as unknown as GraphQLSchema;
