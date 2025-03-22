import { getLists } from "@/lib/lists";
import React from "react";
import ListCard from "./list-card";

export default async function Lists() {
  const lists = await getLists();
  if (!lists) return null;

  if (lists.length === 0)
    return (
      <p className="text-center text-xl font-medium">
        You don't have any lists yet. Start creating one!
      </p>
    );

  return (
    <section className="space-y-5">
      <h2 className="text-xl font-medium">My Lists</h2>
      <div className="flex flex-col gap-5">
        {lists.map(({ id, name, movies }) => (
          <ListCard key={id} listId={id} name={name} movies={movies} />
        ))}
      </div>
    </section>
  );
}
