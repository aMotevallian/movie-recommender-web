import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/recommendation/';

export const getMovieRecommendations = async (movieId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}${movieId}/`);
    return response.data; // Array of recommended movies
  } catch (error) {
    console.error("Failed to fetch recommendations:", error);
    throw error;
  }
};

export const getUserRecommendations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}user/ub_recommendations/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    return response.data; // Array of recommended movies for the user
  } catch (error) {
    console.error("Failed to fetch user recommendations:", error);
    throw error;
  }
};

export const getHybridRecommendations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}user/hybridRecommendations/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    return response.data; // Array of hybrid recommended movies
  } catch (error) {
    console.error("Failed to fetch hybrid recommendations:", error);
    throw error;
  }
};
