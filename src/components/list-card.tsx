import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createImage } from "@/lib/utils";
import DeleteListButton from "./delete-list-button";
import { FaRegImage } from "react-icons/fa";
import SearchMovieButton from "./search-movie-button";
import DeleteMovieButton from "./delete-movie.button";
import UpdateListButton from "./update-list-button";

export interface MovieDB {
  id: number;
  posterPath: string | null;
  title: string;
}

interface ListCardProps {
  listId: string;
  name: string;
  movies: MovieDB[];
}

export default function ListCard({ listId, name, movies }: ListCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between gap-10">
          <CardTitle>{name}</CardTitle>
          <div className="flex gap-1.5">
            <SearchMovieButton listId={listId} movies={movies} />
            <UpdateListButton listId={listId} prevName={name} />
            <DeleteListButton listId={listId} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 overflow-auto pb-4">
          {movies.map(({ posterPath, title, id }) => (
            <div key={id} className="relative aspect-[2/3] h-48 bg-accent">
              {posterPath ? (
                <img
                  src={createImage("w500", posterPath)}
                  alt={title}
                  className="absolute inset-0 size-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaRegImage className="size-1/3" />
                </div>
              )}
              <DeleteMovieButton movieId={id} listId={listId} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
