import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./type-defs";

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(process.cwd(), "@types", "nexus-typegen.d.ts"),
    schema: join(process.cwd(), "graphql", "schema.graphql"),
  },
});
