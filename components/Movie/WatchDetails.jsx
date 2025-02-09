"use client";
import { detailWatch, removeMovie } from "@/app/actions";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const WatchDetails = ({ auth }) => {
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const [watchList, setWatchList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth?.id) return;

    const fetchWatchList = async () => {
      try {
        setLoading(true);
        const results = await detailWatch(auth?.id);
        setWatchList(results);
      } catch (error) {
        console.error("Error fetching watch list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchList();
  }, [auth?.id]);

  const handleRemove = async (id) => {
    try {
      if (!id) throw new Error("Movie ID is required");

      const response = await removeMovie(id);
      if (response.success) {
        setWatchList((prevList) =>
          prevList.filter((movie) => movie._id !== id)
        );
      }
      return response;
    } catch (error) {
      console.error("Error removing movie:", error.message);
      return { success: false, message: error.message };
    }
  };

  return (
    <div className="container mx-auto pt-24 pb-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white">Watch Later</h1>
        <p className="text-light/70 mt-2">
          Movies you&apos;ve saved to watch in the future
        </p>
      </header>

      {loading ? (
        <p className="text-light/70 text-center">Loading...</p>
      ) : watchList.length === 0 ? (
        <div id="emptyState" className="text-center py-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mx-auto text-moviedb-gray mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
          <h2 className="text-2xl font-bold text-light mb-2">
            Your Watch Later list is empty
          </h2>
          <p className="text-light/70 mb-6">
            Explore movies and add them to your list to watch later
          </p>
          <Link
            href="/"
            className="bg-primary text-dark px-6 py-2 rounded-full hover:bg-primary/80 transition"
          >
            Explore Movies
          </Link>
        </div>
      ) : (
        <div
          id="watchLaterList"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {watchList.map((movie) => (
            <Link
              href={`/movie/${movie.movieId}`}
              key={movie._id}
              className="bg-moviedb-black rounded-lg overflow-hidden shadow-lg group relative"
            >
              <Image
                src={`${baseImageUrl}${movie.poster}`}
                alt={movie.title}
                className="w-full h-[450px] object-cover"
                width={300}
                height={450}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h2 className="text-xl font-bold text-light mb-2">
                  {movie.title}
                </h2>
                <div className="flex justify-between items-center">
                  <span className="text-primary">
                    {" "}
                    {movie.releaseTime.split("-")[0]}
                  </span>
                  <button
                    onClick={() => handleRemove(movie._id)}
                    className="bg-moviedb-red text-light px-3 py-1 rounded-full hover:bg-moviedb-red/80 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchDetails;
