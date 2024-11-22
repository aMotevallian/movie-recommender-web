import { useEffect, useState } from 'react';
import { validateToken } from '../api/userApi'; // Adjust the path accordingly

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("use auth")
  useEffect(() => {
    const checkUser = async () => {
      const userData = await validateToken();
      setUser(userData);
      setLoading(false);
    };

    checkUser();
  }, []);

  return { user, loading , setUser };
};
