import imdb from "../assets/imdb.svg";
import tomato from "../assets/tomato.svg";

const genreList = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export default function MovieCard({
  imgSrc = "image path",
  movieTitle = "movie title",
  rating = "rating / 10",
  genres = "genres",
  releaseDate = "Release Date",
}) {
  const randomRating = Math.floor(Math.random() * 31) + 70;

  return (
    <div className="flex gap-2 flex-col justify-center items-start">
      <img
        className="lg:w-[300px] w-[200px]"
        src={`https://image.tmdb.org/t/p/w500/${imgSrc}`}
        alt={`${movieTitle} poster image`}
      />
      <p className="font-medium text-[16px] text-[#858b95]">
        Release date: <span>{releaseDate}</span>
      </p>
      <h2 className="font-bold text-lg">{movieTitle}</h2>
      <div className="flex justify-between w-full">
        <div className="flex gap-2">
          <img src={imdb} alt="IMDB Logo" />
          <p>{`${(rating * 10).toFixed(1)}/100`}</p>
        </div>
        <div className="flex gap-2">
          <img src={tomato} alt="Tomatoes Logo" />
          <p>{`${randomRating}%`}</p>
        </div>
      </div>
      <p className="font-medium text-[16px] text-[#858b95]">
        {genres.map((el) => genreList[el]).join(", ")}
      </p>
    </div>
  );
}
