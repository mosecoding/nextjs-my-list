"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Loader2Icon, PlusIcon, SearchIcon } from "lucide-react";
import { getSearchResults } from "@/lib/movies";
import { Input } from "./ui/input";
import { Movie } from "tmdb-ts";
import { createImage } from "@/lib/utils";
import { FaRegImage } from "react-icons/fa";
import { MovieDB } from "./list-card";
import AddMovieButton from "./add-movie-button";

interface AddMovieButtonProps {
  listId: string;
  movies: MovieDB[];
}

export default function SearchMovieButton({
  listId,
  movies,
}: AddMovieButtonProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  
  const existingMovies = new Set(movies.map((m) => m.id));

  async function handleSearch() {
    setLoading(true);
    try {
      const movies = await getSearchResults(query);
      setResults(movies?.results || []);
    } catch (error) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-dvh overflow-y-auto flex flex-col">
        <DialogHeader>
          <DialogTitle>Search a movie</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search..."
            value={query}
            className="text-sm"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={handleSearch} disabled={loading}>
            <SearchIcon />
          </Button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2Icon className="animate-spin" />
          </div>
        ) : (
          <ul className="space-y-2 mt-2">
            {results.map(({ id, poster_path, title, release_date }, index) => {
              return (
                <li key={index} className="p-2 flex justify-between gap-10">
                  <div className="flex gap-2">
                    <div className="relative aspect-[2/3] h-24 bg-accent">
                      {poster_path ? (
                        <img
                          src={createImage("w500", poster_path)}
                          alt={title}
                          className="absolute inset-0 size-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FaRegImage className="size-1/3" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 justify-center">
                      <span className="text-sm font-medium line-clamp-1">
                        {title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {release_date?.slice(0, 4)}
                      </span>
                      <AddMovieButton
                        movieId={id}
                        posterPath={poster_path}
                        title={title}
                        listId={listId}
                        isInitiallyAdded={existingMovies.has(id)} 
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}
