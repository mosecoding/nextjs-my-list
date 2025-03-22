"use client";

import { removeMovieFromList } from "@/app/actions";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Loader2Icon, XIcon } from "lucide-react";

interface DeleteMovieButtonProps {
  movieId: number;
  listId: string;
}

export default function DeleteMovieButton({
  listId,
  movieId,
}: DeleteMovieButtonProps) {
  const [isPending, setIsPending] = useState(false);

  async function handleRemoveMovieFromList() {
    setIsPending(true);

    const response = await removeMovieFromList(listId, movieId);

    setIsPending(false);

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }

  return (
    <Button
      className="absolute top-1 right-1 rounded-full p-0 size-8"
      onClick={handleRemoveMovieFromList}
      disabled={isPending}
    >
      {isPending ? <Loader2Icon className="animate-spin" /> : <XIcon />}
    </Button>
  );
}
