'use client'

import React, { useState, useEffect, useRef } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { searchMovies } from '../api/movies'
import { Movie } from '@/types'
import Link from "next/link";

const Searchbar = () => {
    const [activeSearch, setActiveSearch] = useState([]) 
    const [loading, setLoading] = useState(false) 
    const searchContainerRef = useRef<HTMLFormElement>(null)
    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setActiveSearch([])
        if (query === '' || loading) {
            setActiveSearch([])
            return
        }

        setLoading(true) 

        try {
            const data = await searchMovies(query, 1) 
            setActiveSearch(data.results.slice(0, 5))
        } catch (error) {
            console.error("Error during search:", error)
        } finally {
            setLoading(false) 
        }
    }
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target as Node)
            ) {
                setActiveSearch([]) 
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
    return (
        <form ref={searchContainerRef} className=' relative '>
            <div className="relative">
                <input
                    type="search"
                    placeholder='Search...'
                    className='w-full p-4 rounded-full bg-black text-white'
                    onChange={(e) => handleSearch(e)}
                />
                <button
                    type="button"
                    className='absolute right-1 top-1/2 -translate-y-1/2 p-4 rounded-full text-white'
                >
                    <AiOutlineSearch />
                </button>
            </div>

            {activeSearch.length > 0 && (
                <div className="absolute top-16 p-4 bg-gray-900 text-white w-full rounded-xl left-0 flex flex-col gap-2 shadow-lg">
                    {activeSearch.map((movie:Movie) => (
                        <Link href={`/movies/${movie.id}`}>
                        <div key={movie.id} className="flex items-center gap-4">
                            <img
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}` : '/placeholder.png'}
                                alt={movie.title}
                                className="w-12 h-16 object-cover rounded-lg"
                            />
                            <span>{movie.title}</span>
                        </div>
                        </Link>
                    ))}
                </div>
            )}

            {loading && (
                <div className="absolute top-16 p-4 bg-slate-800 text-white w-full rounded-xl left-0 flex justify-center">
                    Loading...
                </div>
            )}
        </form>
    )
}

export default Searchbar
