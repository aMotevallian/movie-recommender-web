"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { Movie } from "../../types";
import {rateMovie ,getRandomUnratedMovies } from "../../api/movies"
import {getHybridRecommendations} from "../../api/recommendations"

import withAuth from "../HOC/withAuth";
import "./../../styles/matchFinder.css"
function MoviePicker() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);
  const [progress, setProgress] = useState(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchRandomMovies = async () => {
    setLoading(true); 
    try {
      const response = await getRandomUnratedMovies()

      const firstMovie = response[0];
      // await fetchImage(firstMovie.poster_path);
      setMovies(response);
      setHoverRating(0);
      setSelectedRating(0);
      const imageUrl = `https://image.tmdb.org/t/p/w500/${firstMovie.poster_path}`;
      setCurrentMovie({ ...firstMovie, imageUrl }); 
      
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally{
      setLoading(false)
    }
  };
  const handleRateMovie = async (movieId: number, rating: number) => {
    // setLoading(true); 
    try {
      await rateMovie(movieId, rating);
      setRatedMovies([...ratedMovies, currentMovie!]);
      setProgress((prev) => prev + 10);
      fetchRandomMovies(); 
    } catch (error) {
      console.error("Failed to rate the movie:", error);
    } finally {
      // setLoading(false); 
    }
  };

  const handleSkipMovie = async () => {
    fetchRandomMovies(); // Fetch the next movie without rating
  };

  const ratingFeedback = [
    "Terrible",
    "Bad",
    "Not great, but not bad",
    "Good",
    "Amazing",
  ];

  useEffect(() => {
    fetchRandomMovies();
  }, []);

  useEffect(() => {
    if (progress >= 100 && ratedMovies.length > 0) {
      const fetchRecommendations = async () => {
        try {
          const recommendations = await getHybridRecommendations();
          if (recommendations && recommendations.length > 0) {
            const recommendedMovieId = recommendations[0].id; // Get the first recommended movie's ID
            router.push(`/movies/${recommendedMovieId}`); // Navigate to the movie's detail page
          } else {
            console.warn("No recommendations found.");
          }
        } catch (error) {
          console.error("Failed to fetch recommendations:", error);
        }
      };
      fetchRecommendations();
    }
  }, [progress, ratedMovies, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading ? (
        //  <div className="w-full max-w-md p-6 border-white border-[1px] bg-gray-800 rounded-md shadow-md">
        <div className="flex flex-col items-center justify-center">
          <div className="spinner"></div>
          <p className="text-white mt-2">Loading...</p>
        </div>
        // </div>
      ) : (
        currentMovie && (
          <div className="w-full max-w-md p-6 border-white border-[1px] bg-gray-800 rounded-md shadow-md">
            <div className="relative flex justify-center">
              <img
                id="movie-image"
                src={currentMovie.imageUrl}
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
  
            <div className="flex justify-center mt-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`text-4xl cursor-pointer transition ${
                    star <= (hoverRating || selectedRating)
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => {
                    setSelectedRating(star);
                    handleRateMovie(currentMovie.id, star);
                  }}
                />
              ))}
            </div>
  
            <div className="min-h-[24px] mt-2 text-center">
              {hoverRating > 0 && (
                <p className="text-yellow-300">
                  {ratingFeedback[hoverRating - 1]}
                </p>
              )}
              {selectedRating > 0 && hoverRating === 0 && (
                <p className="text-yellow-300">
                  {ratingFeedback[selectedRating - 1]}
                </p>
              )}
            </div>
  
            <div className="relative w-full bg-gray-700 rounded-full h-2 mt-4">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleSkipMovie}
                className="mt-6 text-center text-white bg-red-600 hover:bg-red-700 py-3 px-6 rounded-lg text-lg font-bold mx-auto"
              >
                Haven't seen this movie!
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
  
}

export default withAuth(MoviePicker);
