import Hero from "@/components/Home/Hero";
import Popular from "@/components/Home/Popular";
import TopRated from "@/components/Home/TopRated";
import Trending from "@/components/Home/Trending";
import {
  getMovieData,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "@/lib/movie-data";

export default async function Home() {
  const movieData = await getMovieData("revalidated");
  const movies = await getTrendingMovies();
  const popular = await getPopularMovies();
  const topMovies = await getTopRatedMovies();

  return (
    <>
      <Hero movieData={movieData} />
      <div className="container mx-auto px-4 py-8">
        <Trending movies={movies} />
        <Popular popular={popular} />
        <TopRated topMovies={topMovies} />
      </div>
    </>
  );
}
