export const getAllMovie = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_MAP_API_KEY}`
    );

    const data = await response.json();
    return data?.results;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieData = async (type) => {
  const fetchOptions =
    type === "revalidated"
      ? {
          next: {
            revalidate: 120,
          },
        }
      : {};

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?_limit=1&api_key=${process.env.MOVIE_MAP_API_KEY}`,
      fetchOptions
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();

    if (data?.results?.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      return data.results[randomIndex];
    }

    throw new Error("No movie data found");
  } catch (e) {
    console.error("Error fetching movie data:", e.message);
    return null;
  }
};

export const getTrendingMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.MOVIE_MAP_API_KEY}`
    );
    const data = await response.json();
    return data?.results;
  } catch (error) {
    console.log(error);
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_MAP_API_KEY}`
    );
    const data = await response.json();
    return data?.results;
  } catch (error) {
    console.log(error);
  }
};

export const getTopRatedMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIE_MAP_API_KEY}`
    );
    const data = await response.json();
    return data?.results;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieById = async (movie_id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.MOVIE_MAP_API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCastList = async (movie_id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${process.env.NEXT_PUBLIC_MOVIE_MAP_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data?.cast || []; // Ensure it returns an empty array instead of undefined
  } catch (error) {
    console.error("Error fetching cast list:", error);
    return []; // Return an empty array to prevent errors
  }
};

export const getSimilarMovie = async (movie_id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${process.env.NEXT_PUBLIC_MOVIE_MAP_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data?.results || []; // Ensure it returns an empty array if results is undefined
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    return []; // Return an empty array instead of undefined
  }
};

export const getGenre = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_MOVIE_MAP_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data?.genres || []; // Always return an array
  } catch (error) {
    console.error("Error fetching genres:", error);
    return []; // Ensure safe fallback
  }
};

export const SearchMovie = async (query) => {
  console.log(query);
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&api_key=${process.env.NEXT_PUBLIC_MOVIE_MAP_API_KEY}`
    );

    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error("SearchMovie Error:", error.message);
    return { error: error.message, results: [] };
  }
};
