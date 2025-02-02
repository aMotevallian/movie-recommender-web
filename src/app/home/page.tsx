"use client";
import React, { useEffect, useState } from "react";
import { getMovies, searchMovies } from "../../api/movies"; // Import APIs
import {
  getLatestMovies,
  getPopularMovies,
  getMoviesByGenre,
} from "../../api/movies";
import MovieCarousel from "../../components/movieCarousel";
import MovieItem from "../../components/movieItem"; // Import MovieItem component
import { Movie } from "../../types";
import { useSearchParams } from "next/navigation";

const PAGE_SIZE = 10;
const GENRES = ["comedy", "action","Science Fiction" , "Family" , "Animation" , "Adventure" , "drama", "thriller", "romance"]; // Add desired genres

export default function Home() {
  const [movies, setMovies] = useState<{ [genre: string]: Movie[] }>({});
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [latestMovies, setLatestMovies] = useState<Movie[]>([]);
  const [moviesByGenre, setMoviesByGenre] = useState<{
    [genre: string]: Movie[];
  }>({});
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("query"); // Get the search query from the URL

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);

      try {
        if (query) {
          // Fetch movies for the query
          const response = await searchMovies(query, 1); // Always fetch page 1 for top 10 results
          setSearchResults(response.results.slice(0, PAGE_SIZE)); // Limit results to top 10
        } else {
          // Fetch movies by genre when no query exists
          // const genreRequests = GENRES.map((genre) =>
          //   getMovies(genre, "2023", 1).then((response) => ({
          //     genre,
          //     newMovies: response.results,
          //   }))
          // );

          // const results = await Promise.all(genreRequests);

          // results.forEach(({ genre, newMovies }) => {
          //   setMovies((prevMovies) => ({
          //     ...prevMovies,
          //     [genre]: newMovies,
          //   }));
          // });
          const latestResponse = await getLatestMovies();
          setLatestMovies(latestResponse.results);

          // Fetch Popular Movies
          const popularResponse = await getPopularMovies();
          setPopularMovies(popularResponse.results);

          // Fetch Movies by Genre
          const genreRequests = GENRES.map((genre) =>
            getMoviesByGenre(genre).then((response) => ({
              genre,
              movies: response.results,
            }))
          );

          const results = await Promise.all(genreRequests);
          results.forEach(({ genre, movies }) => {
            setMoviesByGenre((prev) => ({ ...prev, [genre]: movies }));
          });
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  return (
    <div className="min-h-screen">
      {query ? (
        // Show search results if a query exists
        <div className="">
          <div className="flex flex-col space-y-4 pl-5 w-[600px] justify-center content-center">
            {searchResults.map((movie) => (
              <div
                key={movie.id}
                className="carousel-item h-auto max-h-72 w-auto rounded-box"
              >
                <MovieItem movie={movie} />
              </div>
            ))}
          </div>
          <div className="h-[100%] items-center flex justify-center content-center">
            {loading && <p>Loading...</p>}
            {!loading && searchResults.length === 0 && (
              <p>No results found for "{query}".</p>
            )}
          </div>
        </div>
      ) : (
        // Show genre-based carousels if no query
        // GENRES.map((genre) => (
        //   <div key={genre}>
        //     <h3 className=" text-xl py-4 font-bold pl-[10px] pb-0 text-white">
        //       {genre.charAt(0).toUpperCase() + genre.slice(1)}
        //     </h3>
        //     <MovieCarousel
        //       movies={movies[genre] || []}
        //       onLoadMore={() => {}}
        //       hasMore={false}
        //       loading={loading}
        //     />
        //   </div>
        // ))
        <div>
          {/* Latest Movies Section */}
          {/* <h2 className="text-2xl font-bold text-white pl-4 py-4">
            Latest Movies
          </h2>
          <MovieCarousel
            movies={latestMovies}
            onLoadMore={() => {}}
            loading={loading}
            hasMore={false}
          /> */}

          {/* Popular Movies Section */}
          <h2 className="text-2xl font-bold text-white pl-4 py-4">
            Popular Movies
          </h2>
          <MovieCarousel
            movies={popularMovies}
            loading={loading}
            onLoadMore={() => {}}
            hasMore={false}
          />

          {/* Genre-Based Carousels */}
          {GENRES.map((genre) => (
            <div key={genre}>
              <h3 className="text-xl py-4 font-bold pl-4 text-white">
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </h3>
              <MovieCarousel
                movies={moviesByGenre[genre] || []}
                onLoadMore={() => {}}
                hasMore={false}
                loading={loading}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
