import { PrismaClient } from "@prisma/client";
import Mock from "mockjs";
const prisma = new PrismaClient();

async function main() {
  await prisma.forumCategory.create({
    data: {
      name: "网事杂谈",
      forum: {
        createMany: {
          data: [
            {
              title: "网事杂谈",
            },
            {
              title: "程序员职业交流",
              description: "技术算法 业界新闻 职场经验",
            },
            {
              title: "生活万象",
            },
            {
              title: "生命之杯",
            },
            {
              title: "模型手办",
            },
            {
              title: "音乐影视",
            },
          ],
        },
      },
    },
  });
  await prisma.forumCategory.create({
    data: {
      name: "拳头游戏",
      forum: {
        createMany: {
          data: [
            {
              title: "英雄联盟",
              description: "League Of Legends",
            },
            {
              title: "云顶之奕",
              description: "下棋 下棋！",
            },
            {
              title: "无畏契约",
              description: "Valorant",
            },
            {
              title: "英雄联盟手游",
              description: "League of Legends: Wild Rift",
            },
          ],
        },
      },
    },
  });

  await prisma.forumCategory.create({
    data: {
      name: "游戏专版",
      forum: {
        createMany: {
          data: [
            {
              title: "CS:GO",
              description: "Counter-Strike: Global Offensive",
            },
            {
              title: "DOTA 2",
              description: "Defense of the Ancients 2",
            },
            {
              title: "PS游戏综合讨论",
              description: "恭贺索尼收购棒鸡",
            },
            {
              title: "XBOX游戏综合讨论",
              description: "恭贺微软收购暴雪、动视",
            },
            {
              title: "Nintendo游戏综合讨论",
              description: "宝可梦 YYDS",
            },
            {
              title: "刺客信条",
              description: "万物皆虚，万事皆允",
            },
            {
              title: "使命召唤系列",
              description: "美国 CF",
            },
            {
              title: "Grаnd Thеft Autо V",
              description: "GTA",
            },
            {
              title: "原神",
              description: "Genshin",
            },
            {
              title: "阴阳师",
              description: "YYS",
            },
          ],
        },
      },
    },
  });
  await prisma.banner.createMany({
    data: [
      {
        name: "test1",
        image:
          "https://uploadstatic.mihoyo.com/contentweb/20200305/2020030517194492538.png",
      },
      {
        name: "test2",
        image:
          "https://uploadstatic.mihoyo.com/contentweb/20201103/2020110317320323980.png",
      },
      {
        name: "test3",
        image:
          "https://uploadstatic.mihoyo.com/contentweb/20201126/2020112619441917813.png",
      },
      {
        name: "test4",
        image:
          "https://uploadstatic.mihoyo.com/contentweb/20211221/2021122118122432763.png",
      },
      {
        name: "test5",
        image:
          "https://uploadstatic.mihoyo.com/contentweb/20210817/2021081714114771170.png",
      },
      {
        name: "test6",
        image:
          "https://uploadstatic.mihoyo.com/contentweb/20200611/2020061121140891147.png",
      },
    ],
  });
  for (let i = 1; i < 20; i++) {
    await prisma.user.create({
      data: {
        ...Mock.mock({
          email: "@email",
          name: "@cname",
          image: "https://i.pravatar.cc/300",
          password: "test",
          profile: {
            create: {
              bio: "@csentence",
              banner: "http://placeimg.com/640/480",
              background: "http://placeimg.com/640/480",
            },
          },
          posts: {
            "create|5-10": [
              {
                title: "@ctitle(3, 5)",
                description: "@csentence()",
                content: "@cparagraph(10)",
                "viewCount|1-1000": 100,
                "likesCount|1-1000": 100,
                thumbnail: "http://placeimg.com/640/480",
                forum: {
                  connect: {
                    "id|1-20": 1,
                  },
                },
                tags: {
                  connectOrCreate: [
                    {
                      where: { name: "Test" },
                      create: { name: "Test" },
                    },
                    {
                      where: { name: "Dev" },
                      create: { name: "Dev" },
                    },
                  ],
                },
              },
            ],
          },
        }),
      },
      include: {
        posts: {
          include: {
            tags: true,
          },
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
