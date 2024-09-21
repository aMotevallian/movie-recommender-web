"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaThumbsUp, FaThumbsDown, FaForward } from "react-icons/fa";
import { Movie } from "../../types";

const MAX_LIKES = 10;

export default function MoviePicker() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
  const [progress, setProgress] = useState(0);
  const router = useRouter(); 

  const fetchRandomMovies = async () => {
    try {
      const apiKey = "aa4aff504eed662f6a2b79e593bc3cf4";
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      setMovies(response.data.results);
      setCurrentMovie(response.data.results[0]);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  useEffect(() => {
    fetchRandomMovies();
  }, []);

  const handleAction = (action: "like" | "dislike" | "skip") => {
    if (action === "like" && currentMovie) {
      setLikedMovies([...likedMovies, currentMovie]);
      setProgress((likedMovies.length + 1) * 10); 
    }

    const nextMovieIndex = movies.indexOf(currentMovie!) + 1;
    if (nextMovieIndex < movies.length) {
      setCurrentMovie(movies[nextMovieIndex]);
    } else {
      fetchRandomMovies();
    }
  };

  useEffect(() => {
    if (progress >= 100 && likedMovies.length > 0) {
      const randomLikedMovieId =
        likedMovies[Math.floor(Math.random() * likedMovies.length)].id;

      if (randomLikedMovieId) {
        router.push(`/movies/${randomLikedMovieId}`);
      }
    }
  }, [progress, likedMovies, router]);

  if (progress >= 100) {
    return (
      <div className="text-center text-black p-8">
        <p className="mt-4">fetching suggestion...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      {currentMovie && (
        <div className="w-full max-w-md p-6 bg-gray-800 rounded-md shadow-md">
          <div className="relative flex justify-center">
            <img
              src={`https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`}
              alt={currentMovie.title}
              className="rounded-box bg-cover"
            />
          </div>
          <h2 className="text-white text-2xl font-bold text-center mt-4">
            {currentMovie.title}
          </h2>
          <p className="text-gray-400 text-center mt-2">
            {currentMovie.release_date}
          </p>

          <div className="relative w-full bg-gray-700 rounded-full h-2 mt-4">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => handleAction("dislike")}
              className="text-gray-300 hover:text-red-500"
            >
              <FaThumbsDown size={24} />
            </button>
            <button
              onClick={() => handleAction("like")}
              className="text-gray-300 hover:text-green-500"
            >
              <FaThumbsUp size={24} />
            </button>
          </div>

          <button
            onClick={() => handleAction("skip")}
            className="mt-4 text-center text-white bg-yellow-600 hover:bg-yellow-700 py-2 px-4 rounded-md"
          >
            Haven't Seen
          </button>
        </div>
      )}
    </div>
  );
}
