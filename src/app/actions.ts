"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createList(name: string) {
  try {
    await prisma.list.create({
      data: {
        name,
      },
    });

    revalidatePath("/lists");
    return { success: true, message: "List created" };
  } catch (error) {
    return { success: false, message: "Failed to create the list." };
  }
}

export async function deleteList(id: string) {
  try {
    await prisma.list.delete({
      where: { id },
    });
    revalidatePath("/lists");
    return { success: true, message: "List deleted" };
  } catch (error) {
    return { success: false, message: "Failed to delete list" };
  }
}

export async function addMovieToList(data: {
  listId: string;
  movieId: number;
  title: string;
  posterPath: string | null;
}) {
  try {
    const existingMovie = await prisma.movie.findFirst({
      where: {
        id: data.movieId,
        listId: data.listId,
      },
    });

    if (existingMovie) {
      await prisma.movie.delete({
        where: { id_listId: { id: data.movieId, listId: data.listId } },
      });

      revalidatePath("/lists");
      return { success: true, removed: true };
    } else {
      const newMovie = await prisma.movie.create({
        data: {
          id: data.movieId,
          title: data.title,
          posterPath: data.posterPath,
          listId: data.listId,
        },
      });

      revalidatePath("/lists");
      return { success: true, added: true, movie: newMovie };
    }
  } catch (error) {
    return { success: false, message: "Failed to add movie in list." };
  }
}

export async function removeMovieFromList(listId: string, movieId: number) {
  try {
    await prisma.movie.delete({
      where: { id_listId: { id: movieId, listId } },
    });

    revalidatePath("/lists");
    return { success: true, message: "Movie removed from list" };
  } catch (error) {
    return { success: false, message: "Failed to remove movie from list." };
  }
}

export async function updateList(listId: string, newName: string) {
  try {
    await prisma.list.update({
      where: { id: listId },
      data: { name: newName },
    });

    revalidatePath("/lists");
    return { success: true, message: "List name updated successfully" };
  } catch (error) {
    return { success: false, message: "Failed to update list name." };
  }
}