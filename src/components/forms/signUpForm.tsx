import React, { useState } from "react";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Signing up with", {
      username,
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <form
      onSubmit={handleSignup}
      className="justify-between flex flex-col h-full"
    >
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
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      <div className="mb-4">
        <label className="block text-gray-700">Confirm Password:</label>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded-lg"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
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
