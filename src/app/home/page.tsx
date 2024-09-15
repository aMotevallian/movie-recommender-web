"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCarousel from '../../components/movieCarousel';
import { Movie } from '../../types';

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const apiKey = 'aa4aff504eed662f6a2b79e593bc3cf4';
        const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`);
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.error('Failed to fetch trending movies:', error);
      }
    }

    fetchTrendingMovies();
  }, []);

  return (
    <div className="min-h-screen">
      <h1 className=" text-black text-2xl py-6 m-1">Trending Movies</h1>
      <MovieCarousel movies={trendingMovies} />
      <h1 className=" text-black text-2xl py-6 m-1">Trending Movies</h1>
      <MovieCarousel movies={trendingMovies} />
      <h1 className=" text-black text-2xl py-6 m-1">Trending Movies</h1>
      <MovieCarousel movies={trendingMovies} />
      <h1 className=" text-black text-2xl py-6 m-1">Trending Movies</h1>
      <MovieCarousel movies={trendingMovies} />
    </div>
  );
}
