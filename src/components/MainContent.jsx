import axios from "axios";
import { Back } from "iconsax-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SearchNormal } from "iconsax-react";
import MovieCard from "./MovieCard";
import loading from "../assets/loading-1.gif";

export default function MainContent({
  apiKey,

  setActiveSection,
}) {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  function getSearchInput(e) {
    setSearchInput(e.target.value);
  }
  const RatedURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
  const searchURL = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&api_key=${apiKey}`;
  const [errorMsg, setErrorMsg] = useState("");
  const [URL, setURL] = useState(RatedURL);

  const [lazyLoad, setLazyLoad] = useState(true);

  useEffect(() => {
    setURL(() => (searchInput.length > 3 ? searchURL : RatedURL));
  }, [searchInput]);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        setLazyLoad(true);
        const res = await axios.get(URL, {
          signal: abortController.signal,
        });

        setRatedMovies(res.data.results.slice(0, 10));
        setLazyLoad(false);
      } catch (error) {
        if (error.name !== "CanceledError") {
          if (error.response) {
            if (
              error.response.data.status_message ===
              "The resource you requested could not be found."
            ) {
              setErrorMsg("Requested Movie Not Found");
            }
          } else if (error.request) {
            console.error(
              "No response received. Check your network connection."
            );
            setErrorMsg("No response received. Check your network connection.");
          } else {
            console.error("An error occurred:", error.message);
            setErrorMsg(`An error occurred: ${error.message}`);
          }
        }
      }
    };
    fetchData();

    return function () {
      abortController.abort();
    };
  }, [URL]);

  const handleBackButtonClick = () => {
    setURL(RatedURL);
    setSearchInput("");
  };

  if (errorMsg) {
    <ErrorMessage errorMsg={errorMsg} />;
  }

  return (
    <main className="w-[100%] my-4">
      <nav className="lg:pr-8 px-2 my-8 gap-4 flex justify-between flex-wrap">
        <div className="flex items-center gap-4">
          {URL == searchURL && (
            <button onClick={handleBackButtonClick}>
              <Back size="32" />
            </button>
          )}
          <h1 className="font-bold text-4xl">
            {URL == RatedURL
              ? "Featured Movies"
              : `Results for "${searchInput}"`}
          </h1>
        </div>
        <div className="lg:w-[30%] py-2 w-[100%] rounded-lg flex items-center px-4 border-[2px] border-[#7C2D12] gap-4">
          <input
            onChange={getSearchInput}
            value={searchInput}
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
          {ratedMovies.length > 0 ? (
            ratedMovies.map((el) => (
              <Link key={el.id} to={`/movie/${el.id}`}>
                <MovieCard
                  setActiveSection={setActiveSection}
                  key={el.id}
                  imgSrc={el.poster_path}
                  movieTitle={el["original_title"]}
                  rating={el["vote_average"]}
                  genres={el.genre_ids}
                  releaseDate={el.release_date}
                />
              </Link>
            ))
          ) : (
            <ErrorMessage
              handleBackButtonClick={handleBackButtonClick}
              errorMsg={errorMsg}
            />
          )}
        </div>
      )}
    </main>
  );
}

const ErrorMessage = ({ errorMsg, handleBackButtonClick = null }) => {
  return (
    <div className="py-8 text-center lg:pr-12 pr-2 w-[100%]">
      <h1 className="text-2xl mb-4 font-semibold ">
        {errorMsg || "Movie not found"}
      </h1>
      <Link to="/" onClick={handleBackButtonClick && handleBackButtonClick}>
        <button className="text-lg flex justify-center items-center gap-2  mx-auto">
          {" "}
          <Back size="28" color="#BE123C" /> Return home
        </button>
      </Link>
    </div>
  );
};
