"use client";
import { SearchMovie } from "@/lib/movie-data";
import Image from "next/image";
import { useEffect, useState } from "react";

const AllMovies = ({ allMovies, genres }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [editingMovieId, setEditingMovieId] = useState(null);
  const [genreMap, setGenreMap] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length > 2) {
        // Only search when user types 3+ chars
        const results = await SearchMovie(searchQuery);
        setSearchResults(results);
      } else {
        setSearchResults(allMovies);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);
  console.log(searchResults);

  useEffect(() => {
    const map = genres.reduce((map, genre) => {
      map[genre.id] = genre.name;
      return map;
    }, {});
    setGenreMap(map);
  }, [genres]);

  const addMovie = () => {
    setMovies([...movies, { id: Date.now(), movie: null }]);
  };

  const removeMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <>
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Compare Movies</h1>
          <button
            onClick={addMovie}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Add Movie +
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]"
            >
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => removeMovie(movie.id)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {!movie.movie ? (
                <div className="flex-grow flex flex-col items-center justify-center">
                  <button
                    onClick={() => {
                      setEditingMovieId(movie.id);
                      setShowModal(true);
                    }}
                    className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer"
                  >
                    Select Movie
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-5 gap-8">
                  <div className="col-span-2 h-full">
                    <Image
                      src={`${baseImageUrl}${movie.movie.poster_path}`}
                      alt={movie.movie.title}
                      className="w-full rounded-lg mb-4 object-contain max-h-full"
                      width={100}
                      height={100}
                    />
                    <h2 className="text-xl font-bold mb-2 text-center">
                      {movie.movie.title}
                    </h2>
                  </div>
                  <div className="w-full space-y-4 col-span-3">
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Rating:</span>
                      <span className="float-right">
                        {movie.movie.vote_average}/10
                      </span>
                    </div>
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Release Year:</span>
                      <span className="float-right">
                        {" "}
                        {movie.movie.release_date
                          ? movie.movie.release_date.split("-")[0]
                          : "Unknown"}
                      </span>
                    </div>
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Runtime:</span>
                      <span className="float-right">
                        {movie.movie.runtime
                          ? `"${movie.movie.runtime}" min`
                          : "Unknown"}
                      </span>
                    </div>
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Budget:</span>
                      <span className="float-right">
                        {movie.movie.budget
                          ? `$"${movie.movie.revenue}"M`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Revenue:</span>
                      <span className="float-right">
                        {movie.movie.revenue
                          ? `$"${movie.movie.revenue}"M`
                          : "N/A"}
                      </span>
                    </div>

                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Genres:</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {movie.movie.genre_ids ? (
                          movie.movie.genre_ids.map((id, index) => (
                            <span
                              key={index}
                              className="bg-zinc-700 px-2 py-1 rounded-full text-sm"
                            >
                              {genreMap[id] || "Unknown"}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400">Unknown</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Search Movie</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type movie name..."
              className="w-full bg-zinc-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <div className="max-h-96 overflow-y-auto">
              {searchResults.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => {
                    setMovies((prevMovies) =>
                      prevMovies.map((m) => {
                        if (m.id === editingMovieId) {
                          return { ...m, movie };
                        }
                        return m;
                      })
                    );
                    setShowModal(false);
                  }}
                  className="flex items-center gap-4 p-2 hover:bg-zinc-800 cursor-pointer rounded"
                >
                  <Image
                    src={`${baseImageUrl}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-16 h-24 object-cover rounded"
                    width={100}
                    height={100}
                  />
                  <div>
                    <h3 className="font-bold">{movie.title}</h3>
                    <p className="text-sm text-gray-400">
                      {movie.release_date
                        ? movie.release_date.split("-")[0]
                        : "Unknown"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllMovies;
