import { Search } from '@mui/icons-material';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/movies/'; 

export const getMovies = async (genre?: string, releaseYear?: string, page: number = 1) => {
    try {
      let url = `${BASE_URL}?page=${page}`;
      if (genre) {
        url = `${BASE_URL}genre/${genre}/?page=${page}`;
      } else if (releaseYear) {
        url = `${BASE_URL}year/${releaseYear}/?page=${page}`;
      }
  
      const response = await axios.get(url);
      return response.data; // Contains `results`, `count`, and pagination info
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      throw error;
    }
  };
  export async function searchMovies(query: string, page: number = 1) {
    try {
      const url = `${BASE_URL}search/?q=${query}&page=${page}`;
      const response = await axios.get(url);
      return response.data; // Contains `results`, `count`, and pagination info
    } catch (error) {
      console.error("Failed to search movies:", error);
      throw error;
    }
  }
  export const getMovieById = async (id: number) => {
    try {
      const url = `${BASE_URL}${id}/`;
      const response = await axios.get(url);
      return response.data; // Contains movie details
    } catch (error) {
      console.error("Failed to fetch movie by ID:", error);
      throw error;
    }
  };
  export const getLatestMovies = async (page: number = 1) => {
    try {
      const url = `${BASE_URL}latest/?page=${page}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch latest movies:", error);
      throw error;
    }
  };
  
  export const getPopularMovies = async (page: number = 1) => {
    try {
      const url = `${BASE_URL}popular/?page=${page}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch popular movies:", error);
      throw error;
    }
  };
  export const getMoviesByGenre = async (genre: string, page: number = 1) => {
    try {
      const url = `${BASE_URL}genre/${genre}/?page=${page}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch movies for genre: ${genre}`, error);
      throw error;
    }
  };
  export const toggleWatchLater = async (movieId: number) => {
    try {
      const response = await axios.post(
        `${BASE_URL}toggle-watch-later/`,
        { movie_id: movieId },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`, // Add the token to the Authorization header
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to toggle Watch Later status:", error);
      throw error;
    }
  };

  export const getWatchLaterStatus = async (movieId: number) => {
    try {
      const response = await axios.get(`${BASE_URL}watch-later-status/${movieId}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch Watch Later status:", error);
      throw error;
    }
  };
  export const getRandomUnratedMovies = async () => {
    try {
        const response = await axios.get(`${BASE_URL}random-unrated-movies/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
            },
        });
        return response.data.results; // Returns a list of random unrated movies
    } catch (error) {
        console.error("Failed to fetch random unrated movies:", error);
        throw error;
    }
};

export const rateMovie = async (movieId: number, rating: number) => {
    try {
        const response = await axios.post(
            `${BASE_URL}rate/`,
            { movie_id: movieId, rating },
            {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            }
        );
        return response.data; // Response from the rate API
    } catch (error) {
        console.error("Failed to rate the movie:", error);
        throw error;
    }
};
export const getWatchlist = async (page: number = 1) => {
  try {
      const response = await axios.get(`${BASE_URL}watch-later/`, {
          headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
          },
      });
      return response.data; // Contains `results`, `count`, and pagination info
  } catch (error) {
      console.error("Failed to fetch watchlist:", error);
      throw error;
  }
};

export const getRatedMovies = async (page: number = 1) => {
  try {
      const response = await axios.get(`${BASE_URL}rated-movies/`, {
          headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
          },
      });
      return response.data; // Contains `results`, `count`, and pagination info
  } catch (error) {
      console.error("Failed to fetch rated movies:", error);
      throw error;
  }
};
