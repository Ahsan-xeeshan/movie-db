"use client";
import { useAuth } from "@/app//hooks/useAuth";
import { performLogin } from "@/app/actions";
import { useRouter } from "next/navigation";

import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState("");

  const { setAuth } = useAuth();
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      console.log(formData);
      const found = await performLogin(formData);

      if (found) {
        setAuth(found);
        router.push("/");
      } else {
        setError("Please provide a valid login credential");
      }
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        required
      />
      <button
        type="submit"
        className="w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
