import { Search } from '@mui/icons-material';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/movies/'; 

export const getMovies = async (genre?: string, releaseYear?: string, page: number = 1) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                genre: genre,
                release_date: releaseYear,
                page: page
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};
export async function searchMovies(query: string , page: number = 1) {
    const response =  await axios.get(BASE_URL, {
        params: {
            search: query,
            page: page
        }
    });
    return response.data;
  }
  
export const getMovieById = async (id: number) => {
    try {
        const response = await axios.get(`${BASE_URL}${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie by ID:', error);
        throw error;
    }
};
export const getRecommendationsById = async (id: number) => {
    try {
        const response = await axios.get(`${BASE_URL}${id}/recommendations/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie recommendations:', error);
        throw error;
    }
};