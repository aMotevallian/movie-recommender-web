import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation after login
import { useSnackbar } from "../../components/snackbarContext";
import CustomTextField from "../customTextField";
import { useAuth } from "../../components/authContext";
import { login as loginApi } from "../../api/userApi";
const LoginForm: React.FC = ({}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { login } = useAuth();  // Use the login function from context

  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginApi(username, password);
      login(data.token, username);
      showSnackbar("Login successful!", "success");
      console.log(`Bearer ${localStorage.getItem("token")}`);

      router.push("/");

    } catch (err) {
      showSnackbar("Login failed. Invalid username or password", "error");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="justify-between flex flex-col h-full"
    >
      <div className="flex flex-col h-full gap-9">
        <CustomTextField
          id="Username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <CustomTextField
          id="password"
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
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
