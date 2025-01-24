import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Movie } from "../types";
import { useSearchParams } from "next/navigation";
import { toggleWatchLater, getWatchLaterStatus } from "../api/movies"; // Adjust the path if needed

const MovieItem: React.FC<{ movie: Movie }> = ({ movie }) => {
  const [hovered, setHovered] = useState(false);
  const [saved, setSaved] = useState(false);
  const searchParams = useSearchParams();

  const query = searchParams.get("query"); // Get the search query from the URL

  // Fetch "Watch Later" status on component mount
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await getWatchLaterStatus(movie.id);
        setSaved(status.saved); // Update the saved state based on the backend response
      } catch (error) {
        console.error("Failed to fetch Watch Later status:", error);
      }
    };

    fetchStatus();
  }, [movie.id]);

  // Handle save button click
  const handleSave = async (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent navigation

    try {
      const response = await toggleWatchLater(movie.id); // Call backend API to toggle status
      setSaved((prev) => !prev); // Toggle saved state locally
      alert(response.message); // Optional: Show feedback message
    } catch (error) {
      console.error("Failed to toggle Watch Later status:", error);
    }
  };

  return (
    <Link href={`/movies/${movie.id}`}>
      {!query && (
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="flex flex-col p-2 overflow-ellipsis rounded-box items-center cursor-pointer"
        >
          {(!hovered || query) && (
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title || movie.name}
              className="object-cover rounded-box"
            />
          )}
          {hovered && !query && (
            <div className="relative inset-0 z-10">
              <img
                src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
                alt={movie.title || movie.name}
                className="object-cover rounded-box"
              />
              <div className="text-xs absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white text-center rounded-box">
                <p className="mb-4 w-3/4">{movie.overview}</p>
                <p>Release Date: {movie.release_date}</p>
              </div>
              <button
                onClick={handleSave}
                className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white text-sm p-2 rounded-full hover:bg-opacity-90"
                title={saved ? "Remove from Watch Later" : "Save to Watch Later"}
              >
                {saved ? "✓" : "★"} {/* Star or checkmark */}
              </button>
            </div>
          )}
          <p
            className={`text-center ${hovered ? "w-96" : "w-40"} transition-all duration-300`}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {movie.title || movie.name}
          </p>
        </div>
      )}
      {query && (
        <div className="flex items-center space-x-4 border-b border-gray-300 py-4">
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt={movie.title || movie.name}
            className="object-cover rounded w-32 h-48 cursor-pointer"
          />
          {/* Movie Details */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 hover:underline cursor-pointer">
              {movie.title || movie.name}
            </h3>
            <p className="text-gray-600">Release Date: {movie.release_date}</p>
            <p className="text-gray-600">
              Genre: {movie.genres ? movie.genres : "Unknown"}
            </p>
          </div>
        </div>
      )}
    </Link>
  );
};

export default MovieItem;
