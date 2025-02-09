import AllMovies from "@/components/Movie/AllMovies";
import { getAllMovie, getGenre } from "@/lib/movie-data";

const ComparePage = async () => {
  const allMovies = await getAllMovie();
  const genres = await getGenre();

  return (
    <section>
      <AllMovies allMovies={allMovies} genres={genres} />
    </section>
  );
};

export default ComparePage;
