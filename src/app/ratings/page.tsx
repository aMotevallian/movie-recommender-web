"use client";
import { useEffect, useState } from "react";
import { getRatedMovies } from "../../api/movies";
import MovieCard from "../../components/movieCard";

type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  rating: number; // اضافه‌شده برای نمایش امتیاز
};

const RatedMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRatedMovies = async () => {
      try {
        const response = await getRatedMovies();
        setMovies(response.results || []);
      } catch (error) {
        console.error("Error fetching rated movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatedMovies();
  }, []);

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-6">Rated Movies</h1>
      {loading ? (
        <p className="text-center text-white">Loading...</p>
      ) : movies.length === 0 ? (
        <p className="text-center text-gray-400">You haven't rated any movies yet.</p>
      ) : (
        <div className="flex gap-6 flex-wrap">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              rating={movie.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RatedMovies;
