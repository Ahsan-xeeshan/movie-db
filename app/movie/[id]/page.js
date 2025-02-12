import MoreLike from "@/components/Movie/MoreLike";

import MovieDetails from "@/components/Movie/MovieDetails";

const {
  getMovieById,
  getCastList,
  getSimilarMovie,
} = require("@/lib/movie-data");

export async function generateMetadata(
  { params: { id }, searchParams },
  parent
) {
  const details = await getMovieById(id);

  return {
    title: details.title,
    description: details.overview.slice(0, 100),
    openGraph: {
      title: details.title,
      description: details.overview,
      images: [`${process.env.BASE_IMAGE_URL}${details.backdrop_path}`],
    },
  };
}

const page = async ({ params: { id }, searchParams }) => {
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
