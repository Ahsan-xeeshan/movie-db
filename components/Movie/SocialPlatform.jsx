"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SocialPlatform = () => {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <div className="flex gap-4">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          currentUrl
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center text-sm"
      >
        <Image
          src="http://facebook.com/favicon.ico"
          alt="Facebook"
          width={32}
          height={32}
        />
        Facebook
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
          currentUrl
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center text-sm"
      >
        <Image
          src="http://x.com/favicon.ico"
          alt="Twitter"
          width={32}
          height={32}
        />
        Twitter
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          currentUrl
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center text-sm"
      >
        <Image
          src="http://linkedin.com/favicon.ico"
          alt="LinkedIn"
          width={32}
          height={32}
        />
        LinkedIn
      </a>
    </div>
  );
};

export default SocialPlatform;
