import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users';  // Adjust if using a different port or domain

// Signup function
// In userApi.ts
export const signup = async (username: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/signup/`, {
    username,
    email,  // Add email
    password,
  });
  return response.data;
};


// Login function
export const login = async (username: string,  password: string) => {
    const response = await axios.post(`${API_URL}/login/`, {
    username,
    password,
    });
    return response.data;
};

// Optional: Test token function
// export const testToken = async (token) => {
//   try {
//     const response = await axios.get(`${API_URL}/test-token/`, {
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };
