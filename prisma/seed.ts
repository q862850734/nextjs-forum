import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";
const prisma = new PrismaClient();

async function main() {
  console.log(faker.internet.email());
  const test = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      password: "test",
      name: faker.name.findName(),
      image: faker.image.avatar(),
      profile: {
        create: {
          name: faker.internet.userName(),
          bio: faker.lorem.sentence(),
          avatar: faker.internet.avatar(),
        },
      },
      posts: {
        create: [
          {
            title: faker.lorem.sentence(),
            description: faker.lorem.sentences(5),
            content: faker.lorem.paragraphs(3, "\n \r"),
            viewCount: faker.mersenne.rand(0, 1000),
            likesCount: faker.mersenne.rand(0, 1000),
            thumbnail: faker.image.image(),
            tags: {
              connectOrCreate: [
                {
                  where: {
                    name: "Introductions",
                  },
                  create: { name: "Introductions" },
                },
                {
                  where: {
                    name: "Social",
                  },
                  create: { name: "Social" },
                },
              ],
            },
          },
          {
            title: faker.lorem.sentence(),
            description: faker.lorem.sentences(5),
            content: faker.lorem.paragraphs(3, "\n \r"),
            viewCount: faker.mersenne.rand(0, 1000),
            likesCount: faker.mersenne.rand(0, 1000),
            thumbnail: faker.image.image(),
            tags: {
              connectOrCreate: [
                {
                  where: {
                    name: "Introductions",
                  },
                  create: { name: "Introductions" },
                },
                {
                  where: {
                    name: "Social",
                  },
                  create: { name: "Social" },
                },
              ],
            },
          },
        ],
      },
    },
    include: {
      posts: {
        include: {
          tags: true,
        },
      },
    },
  });
  console.log(test);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
