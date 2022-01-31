import {
  enumType,
  objectType,
  asNexusMethod,
  nonNull,
  extendType,
  stringArg,
  intArg,
} from "nexus";
import { DateTimeResolver } from "graphql-scalars";
export const DateTime = asNexusMethod(DateTimeResolver, "date");
// import { prisma } from "../lib/prisma";

/* 账户 */
export const Account = objectType({
  name: "Account",
  definition(t) {
    t.string("id");
    t.string("userId");
    t.string("type");
    t.string("provider");
    t.string("providerAccountId");
    t.string("refresh_token");
    t.string("access_token");
    t.string("token_type");
    t.string("scope");
    t.string("id_token");
    t.string("oauth_token_secret");
    t.string("oauth_token");
    t.field("user", { type: User });
  },
});

/* 用户 */
export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("email");
    t.int("emailVerified");
    t.string("password");
    t.string("image");
    t.boolean("isBlocked");

    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
    t.list.field("accounts", {
      type: Account,
      async resolve({ id }, _args, { prisma }) {
        return await prisma.user.findUnique({ where: { id } }).accounts();
      },
    });
    t.list.field("posts", {
      type: Post,
      async resolve({ id }, _args, { prisma }) {
        return await prisma.user.findUnique({ where: { id } }).posts();
      },
    });
    t.field("profile", {
      type: Profile,
      async resolve({ id }, _args, { prisma }) {
        return await prisma.user.findUnique({ where: { id } }).profile();
      },
    });
    t.field("role", { type: Role });
  },
});

/* 文章 */
export const Post = objectType({
  name: "Post",
  definition(t) {
    t.int("id");
    t.string("authorId");
    t.string("title");
    t.string("description");
    t.string("content");
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
    t.string("url");
    t.string("thumbnail");
    t.boolean("isLocked");
    t.int("viewCount");
    t.int("likesCount");
    t.boolean("isLiked");

    t.nullable.field("author", {
      type: "User",
      async resolve({ id }, _args, { prisma }) {
        return await prisma.post
          .findUnique({
            where: { id },
          })
          .author();
      },
    });

    t.list.field("tags", {
      type: Tag,
      async resolve({ id }, _args, { prisma }) {
        return await prisma.post.findUnique({ where: { id } }).tags();
      },
    });
  },
});

/* 用户信息 */
export const Profile = objectType({
  name: "Profile",
  definition(t) {
    t.int("id");
    t.string("userId");
    t.string("name");
    t.string("bio");
    t.string("avatar");
    t.string("banner");
    t.string("background");
    t.field("user", {
      type: User,
      resolve({ id }, _args, { prisma }) {
        return prisma.profile.findUnique({ where: { id } }).user();
      },
    });
  },
});
/* 标签 */
export const Tag = objectType({
  name: "Tag",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("description");
    t.list.field("posts", {
      type: Post,
      async resolve({ id }, _args, { prisma }) {
        return await prisma.tag.findUnique({ where: { id } }).posts();
      },
    });
  },
});

/* 查询定义 */
export const Query = extendType({
  type: "Query",
  definition(t) {
    /* 通过邮箱查找用户 */
    t.field("userByEmail", {
      type: "User",
      args: {
        email: nonNull(stringArg()),
      },
      resolve: (_, { email }, { prisma }) => {
        return prisma.user.findUnique({
          where: { email },
        });
      },
    });
    /* 查找所有用户 */
    t.nonNull.list.field("allUsers", {
      type: "User",
      resolve(_parent, _args, { prisma }) {
        return prisma.user.findMany();
      },
    });
    /* 查找所有文章 */
    t.nonNull.list.field("allPosts", {
      type: "Post",
      resolve(_parent, _args, { prisma }) {
        return prisma.post.findMany({
          include: {
            tags: true,
          },
        });
      },
    });
    t.nullable.field("postById", {
      type: "Post",
      args: {
        id: nonNull(intArg()),
      },
      resolve(_parent, { id }, { prisma }) {
        return prisma.post.findUnique({
          where: { id },
          include: {
            tags: true,
          },
        });
      },
    });
    /* 查找所有标签 */
    t.nonNull.list.field("allTags", {
      type: "Tag",
      resolve(_parent, _args, { prisma }) {
        return prisma.tag.findMany({
          include: {
            posts: true,
          },
        });
      },
    });
  },
});

const Role = enumType({
  name: "Role",
  members: ["USER", "ADMIN"],
});
