"use client";
import Link from "next/link";
import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

type MovieCardProps = {
  id: number;
  title: string;
  posterPath: string;
  rating?: number;
  isInWatchlist?: boolean; // وضعیت واچ لیست
  onWatchlistToggle?: (id: number, isInWatchlist: boolean) => void; // تابع برای مدیریت افزودن/حذف از واچ لیست
};

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  posterPath,
  rating,
  isInWatchlist = false,
  onWatchlistToggle,
}) => {
  const [saved, setSaved] = useState<boolean>(isInWatchlist);

  const handleWatchlistToggle = () => {
    setSaved(!saved);
    if (onWatchlistToggle) {
      onWatchlistToggle(id, !saved);
    }
  };

  const truncateTitle = (str: string, num: number) => {
    return str.length > num ? str.slice(0, num) + "..." : str;
  };

  return (
    <div className="group w-44 rounded-lg shadow-lg bg-gray-900 hover:scale-105 transition-transform duration-300 flex flex-col justify-center items-center relative">
      <Link href={`/movies/${id}`} className="block w-full">
        <img
          src={`https://image.tmdb.org/t/p/w300/${posterPath}`}
          alt={title}
          className="object-cover rounded-box w-full"
        />
      </Link>

      {/* دکمه واچ‌لیست بالا سمت راست */}
      {isInWatchlist && (
        <button
          className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white text-sm p-2 rounded-full hover:bg-opacity-90 transition"
          onClick={handleWatchlistToggle}
          title={saved ? "Remove from Watchlist" : "Add to Watchlist"}
        >
          {saved ? (
            <FaStar className="text-yellow-500" />
          ) : (
            <FaRegStar className="text-gray-400" />
          )}
        </button>
      )}
      <div className="p-3 w-full">
        <h2 className="text-lg font-bold text-white truncate" title={title}>
          {truncateTitle(title, 16)}
        </h2>

        {/* ستاره‌های ریتینگ */}
        {rating && (
          <div className="flex items-center justify-center mt-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`${
                  index < rating ? "text-yellow-500" : "text-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
