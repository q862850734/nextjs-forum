import {
  enumType,
  objectType,
  asNexusMethod,
  nonNull,
  extendType,
  stringArg,
  intArg,
  inputObjectType,
  list,
} from "nexus";
import { DateTimeResolver } from "graphql-scalars";
export const DateTime = asNexusMethod(DateTimeResolver, "date");
import crypto from "crypto";
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
    t.string("bio");
    t.string("banner");
    t.string("background");
    t.field("user", {
      type: User,
      async resolve({ id }, _args, { prisma }) {
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

export const Banner = objectType({
  name: "Banner",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("image");
    t.string("description");
    t.string("url");
  },
});

/* 论坛 */
export const Forum = objectType({
  name: "Forum",
  definition(t) {
    t.int("id");
    t.string("title");
    t.string("subscribers");
    t.string("description");
    t.string("icon");
    t.list.field("posts", {
      type: Post,
      async resolve({ id }, _args, { prisma }) {
        return prisma.forum.findUnique({ where: { id } }).posts();
      },
    });
    t.field("category", {
      type: ForumCategory,
      resolve({ id }, _args, { prisma }) {
        return prisma.profile.findUnique({ where: { id } }).user();
      },
    });
  },
});

/* 论坛分类 */
export const ForumCategory = objectType({
  name: "ForumCategory",
  definition(t) {
    t.int("id"), t.string("name");
    t.string("icon");
    t.list.field("forum", {
      type: Forum,
      async resolve({ id }, _args, { prisma }) {
        return prisma.forumCategory.findUnique({ where: { id } }).forum();
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
    t.nonNull.list.field("users", {
      type: "User",
      resolve(_, __, { prisma }) {
        return prisma.user.findMany();
      },
    });
    /* 查找所有文章 */
    t.nonNull.list.field("posts", {
      type: "Post",
      resolve(_, __, { prisma }) {
        return prisma.post.findMany({
          include: {
            tags: true,
          },
        });
      },
    });
    /* 查找热门文章 */
    t.nonNull.list.field("hotPosts", {
      type: "Post",
      args: {
        take: intArg(),
        time: intArg(),
      },
      resolve(_, { take = 10, time = 7 }, { prisma }) {
        const now = new Date();
        return prisma.post.findMany({
          take,
          where: {
            createdAt: {
              gte: new Date(now.getTime() - time * 24 * 60 * 60000),
              lt: now,
            },
          },
          orderBy: {
            viewCount: "desc",
          },
          include: {
            tags: true,
          },
        });
      },
    });
    /* 按ID查找文章 */
    t.nullable.field("postById", {
      type: "Post",
      args: {
        id: nonNull(intArg()),
      },
      resolve(_, { id }, { prisma }) {
        return prisma.post.findUnique({
          where: { id },
          include: {
            tags: true,
          },
        });
      },
    });
    /* 查找所有标签 */
    t.nonNull.list.field("tags", {
      type: "Tag",
      resolve(_, __, { prisma }) {
        return prisma.tag.findMany({
          include: {
            posts: true,
          },
        });
      },
    });

    /* 查找所有大图*/
    t.list.field("banners", {
      type: "Banner",
      resolve(_, __, { prisma }) {
        return prisma.banner.findMany();
      },
    });
    /* 查找所有论坛 */
    t.list.field("forums", {
      type: "Forum",
      resolve(_, __, { prisma }) {
        return prisma.forum.findMany();
      },
    });
    /* 查找所有论坛分类 */
    t.list.field("forumCategories", {
      type: "ForumCategory",
      resolve(_, __, { prisma }) {
        return prisma.forumCategory.findMany();
      },
    });
    /* 按ID查找对应论坛 */
    t.field("forumById", {
      type: "Forum",
      args: {
        id: nonNull(intArg()),
      },
      resolve(_, { id }, { prisma }) {
        return prisma.forum.findUnique({ where: { id } });
      },
    });
  },
});

/* 突变定义 */
export const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("userSetPassword", {
      type: "User",
      args: {
        password: nonNull(stringArg()),
      },
      resolve(_parent, { password }, { prisma, session }) {
        // console.log(session);
        if (!session) throw new Error(`您需要登录后才能执行操作`);

        password = crypto.createHash("md5").update(password).digest("hex");

        return prisma.user.update({
          where: { email: session.user.email },
          data: { password },
        });
      },
    });

    t.field("addPost", {
      type: "Post",
      args: {
        title: stringArg(),
        description: stringArg(),
        content: stringArg(),
        forum: stringArg(),
      },
      resolve(_, { forum, ...other }, { prisma, session }) {
        if (!session) throw new Error(`您需要登录后才能执行操作`);
        return prisma.post.create({
          data: {
            ...other,
            forum: {
              connect: {
                title: forum,
              },
            },
            author: {
              connect: {
                email: session.user.email,
              },
            },
          },
          include: {
            forum: true,
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
