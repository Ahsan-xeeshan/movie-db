import Image from "next/image";
import Link from "next/link";

const MoreLike = ({ similar }) => {
  return (
    <div className="container mx-auto px-4 py-8 ">
      <h2 className="text-2xl font-bold mt-8 mb-4">More Like This</h2>

      <div className="flex space-x-4 overflow-x-auto pb-4">
        {similar.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform"
          >
            <Link href={`/movie/${movie.id}`}>
              <Image
                src={`${process.env.BASE_IMAGE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-lg"
                width={100}
                height={100}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreLike;
