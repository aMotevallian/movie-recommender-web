import React, { useState } from 'react';
import Link from 'next/link'; 
import { Movie } from '../types';

const MovieItem: React.FC<{ movie: Movie }> = ({ movie }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/movies/${movie.id}`}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex flex-col p-2 overflow-ellipsis rounded-box items-center cursor-pointer"
      >
        {!hovered && (
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt={movie.title || movie.name}
            className="object-cover rounded-box"
          />
        )}
        {hovered && (
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
          className={`text-center ${hovered ? 'w-96' : 'w-40'} transition-all duration-300`}
          style={{ 
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis' 
          }}
        >
          {movie.title || movie.name}
        </p>      </div>
    </Link>
  );
};

export default MovieItem;
