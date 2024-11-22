"use client";
import React, { useState } from "react";
import LoginForm from "../../components/forms/loginForm";
import RegisterForm from "../../components/forms/signUpForm";
import bgImg from "../../../public/assets/netflixBG.jpg";

const AuthTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImg.src})`, // `bgImg.src` works with Next.js' image imports
      }}
    >
      <div className="p-8 shadow-2xl rounded-lg w-96 h-[500px] bg-black/80 flex flex-col justify-between">
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 font-semibold rounded-l-lg ${
              activeTab === "login" ? "bg-gray-800 text-white" : "bg-black"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 font-semibold rounded-r-lg ${
              activeTab === "signup" ? "bg-gray-800 text-white" : "bg-black"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Signup
          </button>
        </div>

        <div className="h-full">
          {activeTab === "login" ? (
            <LoginForm />
          ) : (
            <RegisterForm setActiveTab={setActiveTab} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthTabs;
