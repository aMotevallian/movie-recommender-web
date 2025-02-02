import React, { useState } from "react";
import { signup } from "./../../api/userApi";
import { useRouter } from "next/navigation"; // For navigation after login
import { useSnackbar } from "../../components/snackbarContext";
import CustomTextField from "../customTextField";

interface RegisterFormProps {
  setActiveTab: (tab: "login" | "signup") => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ setActiveTab }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const isValidUsername = (username: string) => /^[a-zA-Z0-9]{3,}$/.test(username);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPassword = (password: string) => /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidUsername(username)) {
      setError("Username must be at least 3 characters and contain only letters and numbers.");
      showSnackbar("Invalid username!", "error");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      showSnackbar("Invalid email format!", "error");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password must be at least 8 characters long and contain both letters and numbers.");
      showSnackbar("Weak password!", "error");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      showSnackbar("Passwords do not match!", "error");
      return;
    }

    try {
      await signup(username, email, password);
      showSnackbar("Signup successful!", "success");
      setActiveTab("login");
    } catch (err) {
      showSnackbar("Signup failed. Please try again.", "error");
    }
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col h-full justify-between">
      <CustomTextField
        id="username"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <CustomTextField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <CustomTextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <CustomTextField
        id="confirm-password"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <button
        type="submit"
        className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300"
      >
        Signup
      </button>
    </form>
  );
};

export default RegisterForm;
