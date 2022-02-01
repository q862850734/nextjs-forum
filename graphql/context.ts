import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import prisma from "../lib/prisma";

export type Context = {
  session?: Session;
  prisma: PrismaClient;
};

export async function createContext({ req }): Promise<Context> {
  // console.log(req);

  const session = await getSession({ req });
  console.log("Session", JSON.stringify(session, null, 2));

  if (!session) return { prisma };

  return {
    session,
    prisma,
  };
}
