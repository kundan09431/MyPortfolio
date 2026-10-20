import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen pt-36 pb-20 px-4 flex flex-col items-center justify-center text-center">
      <div className="p-4 rounded-3xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-6">
        <AlertTriangle size={48} />
      </div>

      <h1 className="text-6xl sm:text-8xl font-black gradient-text">404</h1>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-4">
        Page Not Found
      </h2>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mt-2 mb-8">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition hover:scale-105 active:scale-95"
      >
        <Home size={18} />
        <span>Return to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
