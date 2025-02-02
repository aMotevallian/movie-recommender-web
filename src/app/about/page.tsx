import React from "react";

const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] px-6 py-12 bg-gray-900 text-white">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-400">About Movie Recommender</h1>
        <p className="text-lg text-gray-300 mb-6">
          Welcome to <span className="text-blue-300 font-semibold">Movie Recommender</span>, 
          your personal guide to discovering the best movies!
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-300 mb-2">🎯 Smart Recommendations</h2>
            <p className="text-gray-400">We analyze your ratings and suggest movies you’ll love.</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-300 mb-2">🔀 Hybrid AI System</h2>
            <p className="text-gray-400">Combining **collaborative filtering** and **content-based filtering** for better accuracy.</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-300 mb-2">⚡ Find Your Match</h2>
            <p className="text-gray-400">Rate movies and get instant personalized recommendations.</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-300 mb-2">🎥 Endless Discoveries</h2>
            <p className="text-gray-400">Explore a vast collection of movies suited to your taste.</p>
          </div>
        </div>

        <p className="mt-8 text-gray-400">
          Start rating movies and find your next favorite film today! 🚀
        </p>
      </div>
    </div>
  );
};

export default About;
