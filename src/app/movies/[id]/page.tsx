"use client";
import { useEffect, useState } from "react";
import { Movie } from "../../../types";
import MovieCarousel from "../../../components/movieCarousel"; 
import { getMovieById, getRecommendationsById } from "./../../../api/movies";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
export default function MovieDetails({ params }: { params: { id: number } }) {
  const { id } = params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await getMovieById(id);
        setMovie(response);
        setLoading(false);
        
        const similarResponse = await getRecommendationsById(id);
        setSimilarMovies(similarResponse);
        setLoadingRecommendations(false);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setError("Failed to load movie details. Please try again later.");
        setLoading(false);
      }
    };

    if (id) {
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
    <div className="relative min-h-screen bg-gray-900">
      <div
        className="absolute inset-0 h-[100vh] bg-cover bg-no-repeat bg-center" 
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(30, 30, 30, 1)), url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
        }}
      ></div>

      <div className="relative h-[60vh] flex flex-col justify-end p-8"> 
        <div className="bg-black bg-opacity-70 p-6 rounded-lg text-white max-w-lg">
          <h1 className="text-4xl font-bold">{movie.title || movie.name}</h1>
          <p className="text-sm text-gray-400 mt-2">
            Release Date: {movie.release_date}
          </p>
          <p className="mt-4 max-w-lg">{movie.overview}</p>
          {movie.vote_average != 0 && (
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
          )}
        </div>
      </div>

      <div className="relative p-8 bg-gray-900 mt-10">  
        <h2 className="text-white text-2xl mb-4">Similar Movies</h2>
        {loadingRecommendations ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>        ) : (
          <MovieCarousel movies={similarMovies} onLoadMore={() => {}} hasMore={false} loading={false} />
        )}
      </div>      
    </div>
  );
}
