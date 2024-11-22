import React, { useState } from "react";
import { signup } from "./../../api/userApi";
import { useRouter } from "next/navigation"; // For navigation after login
import { useSnackbar } from "../../components/snackbarContext";
import { TextField } from "@mui/material";
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      showSnackbar("Passwords do not match", "error");
      return;
    }
    try {
      const res = await signup(username, email, password);

      showSnackbar("Signup successful!", "success");
      setActiveTab("login");
    } catch (err) {
      showSnackbar("Signup failed. Please try again.", "error");
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="justify-between flex flex-col h-full"
    >
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
