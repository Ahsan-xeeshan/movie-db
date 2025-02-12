import MovieDetails from "@/components/Movie/MovieDetails";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load MoreLike component
const MoreLike = dynamic(() => import("@/components/Movie/MoreLike"), {
  suspense: true, // Suspense ব্যবহার করে Lazy Load করা হবে
});

const {
  getMovieById,
  getCastList,
  getSimilarMovie,
} = require("@/lib/movie-data");

export async function generateMetadata({ params: { id } }) {
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

const page = async ({ params: { id } }) => {
  const details = await getMovieById(id);
  const castList = await getCastList(id);
  const similar = await getSimilarMovie(id);

  return (
    <>
      <MovieDetails details={details} castList={castList} />
      <Suspense fallback={<p>Loading similar movies...</p>}>
        <MoreLike similar={similar} />
      </Suspense>
    </>
  );
};

export default page;
