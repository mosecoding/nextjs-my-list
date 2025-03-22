import { TMDB } from "tmdb-ts";

const tmdb = new TMDB(process.env.NEXT_PUBLIC_TMDB_API_KEY!!);

export async function getTrendingMovies() {
  try {
    const movies = await tmdb.trending.trending("movie", "day");
    return movies;
  } catch (error) {
    return null;
  }
}

export async function getSearchResults(query: string) {
  try {
    const movies = await tmdb.search.movies({ query });
    return movies;
  } catch (error) {
    return null;
  }
}
