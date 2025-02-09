import Image from "next/image";
import ActionButtons from "../ActionButtons";

const MovieDetails = ({ details, castList }) => {
  const date = new Date(details.release_date);

  const options = { day: "2-digit", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  return (
    <div id="movieDetails" className="min-h-screen pt-20 mb-8">
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src={`${process.env.BASE_IMAGE_URL}${details.backdrop_path}`}
            alt={details.title}
            className="w-full h-full object-cover"
            width={100}
            height={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70"></div>
        </div>

        <div className="relative container mx-auto px-4 pt-32">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <Image
                src={`${process.env.BASE_IMAGE_URL}${details.poster_path}`}
                alt={details.title}
                className="w-full rounded-lg shadow-lg"
                width={100}
                height={100}
              />
            </div>

            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-4">{details.title}</h1>

              <div className="flex items-center mb-4 space-x-4">
                <span className="text-green-500"> {formattedDate} </span>
                <span>| </span>
                <span>{details.runtime} min</span>
              </div>

              <p className="text-lg mb-6">{details.overview}</p>

              <div className="mb-6">
                <h3 className="text-gray-400 mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {details?.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                    >
                      {genre?.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-gray-400 mb-2">Cast</h3>
                <div className="flex flex-wrap gap-4">
                  {castList.slice(0, 5).map((cast) => {
                    if (
                      cast.known_for_department === "Acting" &&
                      cast.profile_path
                    ) {
                      return (
                        <div key={cast.id} className="text-center">
                          <Image
                            src={
                              cast.profile_path
                                ? `${process.env.BASE_IMAGE_URL}${cast.profile_path}`
                                : "/default-avatar.jpg"
                            }
                            alt={cast.name}
                            className="w-24 h-24 rounded-full object-cover mb-2"
                            width={100}
                            height={100}
                          />
                          <p className="text-sm">{cast.name}</p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>

              <ActionButtons
                id={details.id}
                title={details.title}
                poster={details.poster_path}
                releaseTime={details.release_date}
              />

              <div className="mb-6">
                <h3 className="text-gray-400 mb-2">Share on social media</h3>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`https://facebook.com/${encodeURIComponent(
                      details.title
                    )}`}
                    className="text-center cursor-pointer"
                  >
                    <Image
                      src="http://facebook.com/favicon.ico"
                      alt="Facebook"
                      className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                      width={100}
                      height={100}
                    />
                    <p className="text-sm">Facebook</p>
                  </a>

                  <a
                    href={`https://x.com/${encodeURIComponent(details.title)}`}
                    className="text-center cursor-pointer"
                  >
                    <Image
                      src="http://x.com/favicon.ico"
                      alt="Facebook"
                      className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                      width={100}
                      height={100}
                    />
                    <p className="text-sm">X</p>
                  </a>

                  <a
                    href={`https://linkedin.com/${encodeURIComponent(
                      details.title
                    )}`}
                    className="text-center cursor-pointer"
                  >
                    <Image
                      src="http://linkedin.com/favicon.ico"
                      alt="Facebook"
                      className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                      width={100}
                      height={100}
                    />
                    <p className="text-sm">Linkedin</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
