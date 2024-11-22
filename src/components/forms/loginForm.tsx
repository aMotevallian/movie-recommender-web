import React, { useState } from "react";
import { login } from "./../../api/userApi";
import { useRouter } from "next/navigation";  // For navigation after login
import { useSnackbar } from "../../components/snackbarContext";
import  {useAuth}  from "../../components/useAth"; // Import your useAuth hook

const LoginForm: React.FC = ({}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  let { setUser , user} = useAuth(); // Add setUser from context

  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await login(username, password);
      
      showSnackbar("Login successful!", "success");
      
      router.push("/");
      setUser(localStorage.token); // Update user context with the logged-in user
      console.log(user)

    } catch (err) {
      showSnackbar("Login failed. Invalid username or password", "error");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="justify-between flex flex-col h-full"
    >
      <div>
        <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
