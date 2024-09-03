"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Movie } from '../../../types'; 

export default function MovieDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (id) {
      const fetchMovieDetails = async () => {
        try {
          const apiKey = 'aa4aff504eed662f6a2b79e593bc3cf4';
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
          setMovie(response.data);
        } catch (error) {
          console.error('Failed to fetch movie details:', error);
        }
      };

      fetchMovieDetails();
    }
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-center text-white text-3xl py-6">{movie.title || movie.name}</h1>
      <div className="flex flex-col items-center">
        <img src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`} alt={movie.title || movie.name} />
        <p className="text-white text-center py-4">{movie.overview}</p>
        <p className="text-white text-center">Release Date: {movie.release_date}</p>
      </div>
    </div>
  );
}
