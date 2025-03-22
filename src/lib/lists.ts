import { prisma } from "./prisma";

export async function getLists() {
  try {
    const lists = await prisma.list.findMany({
      include: {
        movies: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return lists;
  } catch (error) {
    return null;
  }
}
