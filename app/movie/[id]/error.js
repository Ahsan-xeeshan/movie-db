"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-100 px-6">
      <div className="bg-gray-100 shadow-lg rounded-2xl p-6 max-w-md text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-4">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
