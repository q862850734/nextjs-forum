import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import prisma from "../lib/prisma";

export type Context = {
  session?: Session;
  prisma: PrismaClient;
};

export async function createContext({ req }): Promise<Context> {
  const session = await getSession({ req });

  if (!session) return { prisma };

  return {
    session,
    prisma,
  };
}
