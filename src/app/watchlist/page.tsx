"use client";
import { useEffect, useState } from "react";
import { getWatchlist, toggleWatchLater } from "../../api/movies";
import MovieCard from "../../components/movieCard";

type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
};

const Watchlist: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await getWatchlist();
        setMovies(response.results || []);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const handleWatchlistToggle = async (movieId: number) => {
    try {
      await toggleWatchLater(movieId);
      setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
    } catch (error) {
      console.error("Error toggling watchlist:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-6">Your Watchlist</h1>
      {loading ? (
        <p className="text-center text-white">Loading...</p>
      ) : movies.length === 0 ? (
        <p className="text-center text-gray-400">Your watchlist is empty.</p>
      ) : (
        <div className="flex gap-6 flex-wrap">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              isInWatchlist={true}
              onWatchlistToggle={handleWatchlistToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
