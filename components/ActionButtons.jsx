"use client";
import { addWishToWatch, wishToWatchList } from "@/app/actions";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ActionButtons = ({ id, poster, title, releaseTime }) => {
  const movieId = id;
  const { auth } = useAuth();
  const router = useRouter();
  const [wishList, setWishList] = useState(false);

  useEffect(() => {
    const checkWatchList = async () => {
      if (auth) {
        const exists = await wishToWatchList(movieId, auth?.id);
        setWishList(exists);
      }
    };
    checkWatchList();
  }, [auth, movieId]);

  const toggleInterest = async () => {
    if (auth) {
      addWishToWatch(movieId, auth?.id, title, releaseTime, poster);
      setWishList(true);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-4">
        {wishList ? (
          <div className="text-center">
            <button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-checks"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 12l5 5l10 -10" />
                <path d="M2 12l5 5m5 -5l5 -5" />
              </svg>
              Added to Watch List
            </button>
          </div>
        ) : (
          <div className="text-center">
            <button
              className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg"
              onClick={toggleInterest}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-file-plus"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                <path d="M12 11l0 6" />
                <path d="M9 14l6 0" />
              </svg>
              Add to Wacth List
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionButtons;
