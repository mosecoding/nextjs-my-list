"use client";

import React, { useState } from "react";
import { addMovieToList } from "@/app/actions";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";

interface AddMovieButtonProps {
  movieId: number;
  posterPath: string | null;
  title: string;
  listId: string;
  isInitiallyAdded: boolean;
}

export default function AddMovieButton({
  movieId,
  listId,
  title,
  posterPath,
  isInitiallyAdded,
}: AddMovieButtonProps) {
  const [isAdded, setIsAdded] = useState(isInitiallyAdded);
  const [isPending, setIsPending] = useState(false);

  async function handleAddMovieToList() {
    setIsPending(true);
    try {
      const res = await addMovieToList({ listId, movieId, posterPath, title });
      if (res?.added) {
        setIsAdded(true);
      } else if (res?.removed) {
        setIsAdded(false);
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Button
      variant={isAdded ? "destructive" : "secondary"}
      className="text-xs size-fit px-2.5 py-1 rounded-sm"
      onClick={handleAddMovieToList}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : isAdded ? (
        "Remove"
      ) : (
        "Add"
      )}
    </Button>
  );
}
