import React from 'react';
import MovieItem from './movieItem';
import { Movie } from '../types'; 

interface MovieCarouselProps {
  movies: Movie[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
  return (
    <div className="carousel w-full rounded-box">
      {movies.map((movie) => (
        <div key={movie.id} className="carousel-item h-auto w-auto rounded-box">
          <MovieItem movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default MovieCarousel;
