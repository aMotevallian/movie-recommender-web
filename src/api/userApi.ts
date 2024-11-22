import axios from 'axios';

const API_URL = 'http://localhost:8000'; 


export const signup = async (username: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register/`, {
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

export const login = async (username: any, password: any) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login/`, {
      username,
      password,
    }, {
      withCredentials: true, // Important to send cookies with the request
    });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
export const validateToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/validate-token/`, {
      withCredentials: true, // Ensure cookies are sent with the request
    });
    return response.data; // Return user data if token is valid
  } catch (error) {
    console.error('Error validating token:', error);
    return null; // Return null if the token is invalid
  }
};
export const logout = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout/`, {}, { withCredentials: true });
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

