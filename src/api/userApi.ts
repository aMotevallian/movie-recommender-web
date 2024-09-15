import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Django Backend URL

// Signup Function
export const signup = async (username: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/register/`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

// Login Function
export const login = async (username: any, password: any) => {
  try {
    const response = await axios.post(`${API_URL}/api/login/`, {
      username,
      password,
    });
    localStorage.setItem('token', response.data.token); // Save token for future requests
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
