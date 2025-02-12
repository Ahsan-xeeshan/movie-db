import { ImageResponse } from "next/og";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "MOVIE DB";
  const description = searchParams.get("description") || "No Description Found";
  const image =
    searchParams.get("image") || "https://via.placeholder.com/600x300";

  return new ImageResponse(
    (
      <div tw="w-full flex flex-col items-center justify-center">
        <div
          tw="flex flex-col w-full h-[400px] bg-gray-500"
          style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
        >
          <img src={image} alt="movie" width="600" height="300" tw="hidden" />
        </div>
        <div tw="flex flex-col bg-gray-200 w-full h-[200px] p-5">
          <h3 tw="text-2xl">{title}</h3>
          <p tw="text-xl">{description}</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
