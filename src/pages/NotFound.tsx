
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dashboard-dark p-4">
      <div className="dashboard-card p-8 max-w-md w-full text-center animate-scale-in">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-6">Oops! Page not found</p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-6 py-3 bg-dashboard-highlight text-white font-medium rounded-md hover:bg-dashboard-highlight/80 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
