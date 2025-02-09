"use client";
import WatchDetails from "@/components/Movie/WatchDetails";
import { useAuth } from "../hooks/useAuth";

const WatchListPage = () => {
  const { auth } = useAuth();

  return (
    <>
      <WatchDetails auth={auth} />
    </>
  );
};

export default WatchListPage;
