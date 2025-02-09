"use client";
import Search from "@/components/Movie/Search";
import { Suspense } from "react";

const SearchPage = () => {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <Search />
    </Suspense>
  );
};

export default SearchPage;
