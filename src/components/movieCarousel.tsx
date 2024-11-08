import React from "react";
import MovieItem from "./movieItem";
import { Movie } from "../types";
import { IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
interface MovieCarouselProps {
  movies: Movie[];
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({
  movies,
  onLoadMore,
  hasMore,
  loading,
}) => {
  return (
    <div className="carousel w-full rounded-box flex gap-4">
      {movies.map((movie) => (
        <div key={movie.id} className="carousel-item h-auto max-h-72 w-auto rounded-box">
          <MovieItem movie={movie} />
        </div>
      ))}

      {hasMore && !loading && (
        <div className="carousel-item h-auto w-auto rounded-box flex items-center justify-center">
          <IconButton
            onClick={onLoadMore}
            color="primary"
            size="large"
            className="w-12 h-12"
          >
            <ArrowForwardIcon fontSize="large" />
          </IconButton>
        </div>
      )}

      {loading && (
        <div className="carousel-item h-auto w-auto rounded-box flex items-center justify-center">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
    </div>
  );
};

export default MovieCarousel;
