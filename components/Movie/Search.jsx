"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 2) {
        SearchMovie(query).then(setSearchResults).catch(console.error);
      } else {
        setSearchResults([]); // Clear if query is too short
      }
    }, 500); // Wait 500ms before making a request

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <main className="container mx-auto px-4 pt-24 pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Search Results for &quot;{query}&quot;
        </h1>
        <p className="text-gray-400">{searchResults.length} result(s) found</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {searchResults.length > 0 ? (
          searchResults.map((movie) => (
            <Link
              href={`/movie/${movie.id}`}
              key={movie.id}
              className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover"
                height={300}
                width={200}
              />
              <div className="p-4">
                <h3 className="font-bold mb-2">{movie.title}</h3>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
                  <span>⭐ {movie.vote_average?.toFixed(1) || "N/A"}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            No results found.
          </p>
        )}
      </div>
    </main>
  );
};

export default Search;
