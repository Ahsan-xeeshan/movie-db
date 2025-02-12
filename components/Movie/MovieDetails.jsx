import Image from "next/image";
import ActionButtons from "../ActionButtons";
import SocialPlatform from "./SocialPlatform";

const MovieDetails = ({ details, castList }) => {
  if (!details) {
    return (
      <p className="text-center text-gray-400 mt-10">
        Movie details not available.
      </p>
    );
  }

  const formattedDate = new Date(details.release_date).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div id="movieDetails" className="min-h-screen pt-20 mb-8">
      <div className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={`${process.env.BASE_IMAGE_URL || ""}${details.backdrop_path}`}
            alt={details.title}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70"></div>
        </div>

        <div className="relative container mx-auto px-4 pt-32">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Movie Poster */}
            <div className="md:w-1/3">
              <Image
                src={`${process.env.BASE_IMAGE_URL || ""}${
                  details.poster_path
                }`}
                alt={details.title}
                className="w-full rounded-lg shadow-lg"
                width={500}
                height={750}
                loading="lazy"
              />
            </div>

            {/* Movie Information */}
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-4">{details.title}</h1>

              <div className="flex items-center mb-4 space-x-4 text-gray-400">
                <span>{formattedDate}</span>
                <span>|</span>
                <span>{details.runtime} min</span>
              </div>

              <p className="text-lg mb-6">
                {details.overview || "No description available."}
              </p>

              {/* Genres */}
              {details.genres?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-gray-400 mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {details.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Cast List */}
              {castList?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-gray-400 mb-2">Cast</h3>
                  <div className="flex flex-wrap gap-4">
                    {castList.slice(0, 5).map((cast) =>
                      cast.known_for_department === "Acting" &&
                      cast.profile_path ? (
                        <div key={cast.id} className="text-center">
                          <Image
                            src={`${process.env.BASE_IMAGE_URL || ""}${
                              cast.profile_path
                            }`}
                            alt={cast.name}
                            className="w-24 h-24 rounded-full object-cover mb-2"
                            width={96}
                            height={96}
                            loading="lazy"
                          />
                          <p className="text-sm">{cast.name}</p>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <ActionButtons
                id={details.id}
                title={details.title}
                poster={details.poster_path}
                releaseTime={details.release_date}
              />

              {/* Social Media Share Links */}
              <div className="mt-6">
                <h3 className="text-gray-400 mb-2">Share on social media</h3>
                <SocialPlatform />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
