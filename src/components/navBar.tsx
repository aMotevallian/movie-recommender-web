"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { useAuth } from "../components/useAth"; // Import the custom hook
import { logout } from "../api/userApi"; // Import the logout function
import {
  useSearchParams,
  useRouter,
  usePathname,
} from "next/navigation";
const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { user, loading } = useAuth(); // Get user and loading state from the custom hook
  const [search, setSearch] = useState<string>(""); // State for search input
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter()
  const links = [
    {
      id: 1,
      name: "Browse All",
      link: "/home",
    },
    {
      id: 2,
      name: "About",
      link: "/about",
    },
    {
      id: 3,
      name: "Find Your Match",
      link: "/match",
    },
  ];

  // Handle logout
  const handleLogout = async () => {
    await logout(); // Call your logout function
    window.location.reload(); // Reload the page or redirect to login page
  };
  const handleSearch = (searchItem:string) => {
    setSearch(searchItem)

    const params = new URLSearchParams(searchParam)
    if(searchItem){
      params.set("query" , searchItem)
    }else{
      params.delete("query")
    }
    replace(`${pathname}?${params.toString()}`)
  };

  // Handle enter key press for search
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && search.trim()) {
    }
  };
  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-gray-300 sticky top-0 bg-black nav z-50">
      <div className="flex items-center">
        <h1 className="text-4xl font-signature ml-2">
          <a
            className="link-underline link-underline-black"
            href=""
            target="_blank"
            rel="noreferrer"
          >
            MovieYab
          </a>
        </h1>
        <ul className="hidden md:flex ml-8 space-x-6">
          {links.map(({ id, link, name }) => (
            <li
              key={id}
              className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-400 hover:scale-105 hover:text-white duration-200 link-underline"
            >
              <Link href={link}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)} // Update search state
            onKeyDown={handleKeyPress} // Trigger search on Enter key press
            className="bg-black border-white text-gray-300 pl-10 pr-4 py-2 w-72 rounded-md focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* Conditional Login/Logout Button */}
        {loading ? (
          <div>Loading...</div>
        ) : user ? (
          <button
            onClick={handleLogout}
            className="bg-black hover:text-white hover:scale-105 text-gray-400 px-4 py-2 cursor-pointer capitalize font-medium duration-200 link-underline"
          >
            Logout
          </button>
        ) : (
          <Link
            href={"/register"}
            className="bg-black hover:text-white hover:scale-105 text-gray-400 px-4 py-2 cursor-pointer capitalize font-medium duration-200 link-underline"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* Mobile Menu */}
      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} href={link}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
