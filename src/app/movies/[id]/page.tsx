"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "../../../types";
import Carousel from "../../../components/movieCarousel"; // Assuming your custom carousel component

export default function MovieDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchMovieDetails = async () => {
        try {
          const apiKey = "aa4aff504eed662f6a2b79e593bc3cf4";
          const movieDetails = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
          );
          setMovie(movieDetails.data);

          // Fetch similar movies
          const similarMovies = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`
          );
          setSimilarMovies(similarMovies.data.results);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch movie details:", error);
          setError("Failed to load movie details. Please try again later.");
          setLoading(false);
        }
      };

      fetchMovieDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!movie) {
    return <div className="text-white text-center">Movie not found.</div>;
  }

  return (
    <div className="relative min-h-screen">
      {/* Backdrop Image and Fade */}
      <div
        className="absolute inset-0 h-3/4 bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(30, 30, 30, 1)), url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
        }}
      >
      </div>

      {/* Movie Information */}
      <div className="relative h-3/4 flex flex-col justify-end p-8">
        <div className="bg-black bg-opacity-70 p-6 rounded-lg text-white max-w-md">
          <h1 className="text-4xl font-bold">{movie.title || movie.name}</h1>
          <p className="text-sm text-gray-400 mt-2">Release Date: {movie.release_date}</p>
          <p className="mt-4">{movie.overview}</p>
          <div className="flex items-center mt-4">
            <span className="text-yellow-400 text-2xl font-bold mr-2">
              {movie.vote_average.toFixed(1)}
            </span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.round(movie.vote_average / 2) ? "⭐" : "☆"}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Movie Carousel for Similar Movies */}
      <div className="relative p-8 bg-gray-900">
        <h2 className="text-white text-2xl mb-4">Similar Movies</h2>
        <Carousel movies={similarMovies} />
      </div>
    </div>
  );
}
