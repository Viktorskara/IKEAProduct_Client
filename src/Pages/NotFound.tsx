import React from "react";
import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4 text-black">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Page not found</p>
      <p className="text-gray-500 mb-8">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <NavLink
        to="/"
        className="bg-blue-600 text-black px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Go back home
      </NavLink>
    </div>
  );
}

export default NotFound;
