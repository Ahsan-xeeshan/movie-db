import MoreLike from "@/components/Movie/MoreLike";

const { default: MovieDetails } = require("@/components/Movie/MovieDetails");
const {
  getMovieById,
  getCastList,
  getSimilarMovie,
} = require("@/lib/movie-data");

const page = async ({ params: { id } }) => {
  const details = await getMovieById(id);
  const castList = await getCastList(id);
  const similar = await getSimilarMovie(id);
  return (
    <>
      <MovieDetails details={details} castList={castList} />

      <MoreLike similar={similar} />
    </>
  );
};

export default page;
