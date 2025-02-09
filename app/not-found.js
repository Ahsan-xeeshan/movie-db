"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFoundPage() {
  const pathName = usePathname();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center p-6">
      <h1 className="text-8xl font-extrabold animate-bounce">404</h1>
      <p className="text-2xl mt-4">
        Oops! The page **{pathName}** you're looking for doesn't exist.
      </p>
      <p className="text-gray-400 mt-2">
        It might have been removed or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-primary/80 transition"
      >
        Return Home
      </Link>
      <div className="absolute bottom-5 text-gray-500">© 2025 MovieDB</div>
    </div>
  );
}
