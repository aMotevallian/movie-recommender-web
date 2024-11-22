import React, { useState } from "react";
import Link from "next/link";
import { Movie } from "../types";
import { useSearchParams } from "next/navigation";
const MovieItem: React.FC<{ movie: Movie }> = ({ movie }) => {
  const [hovered, setHovered] = useState(false);
  const searchParams = useSearchParams();

  const query = searchParams.get("query"); // Get the search query from the URL

  return (
    <Link href={`/movies/${movie.id}`}>
      {!query && (<div
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
        </p>{" "}
      </div>)}
      {query && (<div
        className="flex items-center space-x-4 border-b border-gray-300 py-4"
      >
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
            Genre:{" "}
            {movie.genres ? movie.genres: "Unknown"}{" "}
            {/* Add actors array in the movie type */}
          </p>
        </div>
      </div>)}
    </Link>
  );
};

export default MovieItem;
