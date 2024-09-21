"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [nav, setNav] = useState(false);

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

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-gray-300 sticky top-0 bg-gray-800 nav z-50">
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
            className="bg-gray-700 text-gray-300 pl-10 pr-4 py-2 w-72 rounded-md focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* Login Button */}
        <Link href={'/register'} className=" bg-gray-800 hover:text-white hover:scale-105 text-gray-400 px-4 py-2 cursor-pointer capitalize font-medium duration-200 link-underline">
          Login
        </Link>
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
