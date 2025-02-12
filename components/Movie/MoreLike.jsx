import Image from "next/image";
import Link from "next/link";

const MoreLike = ({ similar }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mt-8 mb-4">More Like This</h2>

      {/* Grid Layout for better UI */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {similar.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer hover:scale-105 transition-transform"
          >
            <Link href={`/movie/${movie.id}`}>
              <div className="relative w-full aspect-[2/3]">
                <Image
                  src={
                    movie.poster_path
                      ? `${process.env.BASE_IMAGE_URL}${movie.poster_path}`
                      : "/default-movie.jpg" // Default image for missing posters
                  }
                  alt={movie.title}
                  className="rounded-lg object-cover"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  priority={false}
                  loading="lazy"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreLike;
