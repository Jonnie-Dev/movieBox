import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SearchNormal } from "iconsax-react";
import MovieCard from "./MovieCard";
import loading from "../assets/loading-1.gif";

export default function MainContent({ apiKey }) {
  const [ratedMovies, setRatedMovies] = useState([]);
  const URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
  let [lazyLoad, setLazyLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLazyLoad(true);
        let res = await axios.get(URL);
        setRatedMovies(res.data.results.slice(0, 10));
        setLazyLoad(false);
      } catch (error) {
        if (error.response) {
          console.error("Server responded with an error:", error.response.data);
        } else if (error.request) {
          console.error("No response received. Check your network connection.");
        } else {
          console.error("An error occurred:", error.message);
        }
      }
    };
    fetchData();
  }, []);
  return (
    <main className="w-[100%] my-4">
      <nav className="lg:pr-8 px-2 my-8 gap-4 flex justify-between flex-wrap">
        <h1 className="font-bold text-4xl">Featured Movies</h1>
        <div className="lg:w-[30%] py-2 w-[100%] rounded-lg flex items-center px-4 border-[2px] border-[#7C2D12] gap-4">
          <input
            className="w-[100%] text-[#7C2D12]"
            placeholder="What do you want to watch?"
            type="text"
          />
          <SearchNormal size="24" color="#7C2D12" />
        </div>
      </nav>

      {lazyLoad ? (
        <div className="flex justify-center items-center h-[80vh]">
          <img src={loading} alt="loadig svg" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 justify-center pr-8">
          {ratedMovies.map((el) => (
            <Link key={el.id} to={`/movie/:${el.id}`}>
              <MovieCard
                key={el.id}
                imgSrc={el.poster_path}
                movieTitle={el["original_title"]}
                rating={el["vote_average"]}
                genres={el.genre_ids}
                releaseDate={el.release_date}
              />
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
