import React from "react";

function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80)",
      }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg max-w-2xl text-center shadow-lg backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to the Home Page
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          This is the home page content.
        </p>
        <div className="space-y-2 text-gray-600 text-lg">
          <p>🔹 First Register</p>
          <p>🔹 Second Login</p>
          <p>🔹 Third CRUD Your Expenses</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
