import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import loading from "../assets/loading-1.gif";
import ratedLogo from "../assets/18.svg";
import { Star1, Back, Slash } from "iconsax-react";

export default function MovieContent({ apiKey, setActiveSection }) {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({});
  const [lazyLoad, setLazyLoad] = useState(true);

  const [errorMsg, setErrorMsg] = useState("");

  const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        setLazyLoad(true);
        let res = await axios.get(URL, {
          signal: abortController.signal,
        });
        setMovieData(res.data);
        setLazyLoad(false);
        setErrorMsg("");
      } catch (error) {
        if (error.name !== "CanceledError") {
          if (error.response) {
            if (
              error.response.data.status_message ==
              "The resource you requested could not be found."
            )
              setErrorMsg("Requested Movie Not Found");
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

      () => {
        abortController.abort();
      };
    };
    fetchData();
  }, []);

  useEffect(() => setActiveSection(false), []);

  // Change page title when Component mounts and revert to default when component unmounts
  useEffect(() => {
    document.title = movieData.title || "Movie Box";

    return function () {
      document.title = "Movie Box";
    };
  }, [movieData.title]);

  if (errorMsg) {
    return (
      <div className="py-8 text-center lg:pr-12 pr-2 w-[100%]">
        <h1 className="text-2xl mb-4 font-semibold ">{errorMsg}</h1>
        <Link to="/">
          <button
            onClick={() => setActiveSection(true)}
            className="text-lg flex justify-center items-center gap-2  mx-auto"
          >
            {" "}
            <Back size="28" color="#BE123C" /> Return home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {lazyLoad ? (
        <div className="flex justify-center items-center w-[100%] h-[80vh]">
          <img src={loading} alt="loadig svg" />
        </div>
      ) : (
        <section className="page-transition h-[100vh] overflow-y-scroll lg:pr-12 pr-2 py-8">
          <div className="h-[50%] lgw-[80vw] w-[100%] ">
            <img
              className="movie-poster w-full h-full object-cover object-top rounded-2xl"
              src={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`}
            />
          </div>
          <div>
            <div className="my-4 px-2 flex flex-wrap gap-2 justify-between items-center">
              <div className="flex flex-wrap md:gap-8 items-center gap-2 text-2xl font-semibold">
                <h1 data-testid="movie-title">{movieData.title}</h1>
                <p>•</p>
                <p data-testid="movie-release-date">
                  {/* {movieData.release_date} */}
                  {new Date(movieData.release_date).toISOString()}
                </p>
                <p>•</p>
                <p data-testid="movie-runtime">{movieData.runtime} mins</p>
                <p className="text-lg font-medium px-2 bg-[#BE123C] inline-block text-white rounded-lg">
                  {movieData.status}
                </p>
                {movieData.adult && <Slash size="24" color="#BE123C" />}
                {/* <img src={ratedLogo} width={"100%"} /> */}
              </div>
              <div className="flex items-center gap-2">
                <Star1 size="32" color="#BE123C" variant="Bold" />
                <p className="text-xl font-semibold">
                  <span>{movieData["vote_average"].toFixed(1)}</span> |{" "}
                  <span>{(movieData["vote_count"] / 1000).toFixed(0)}K</span>
                </p>
              </div>
            </div>
          </div>
          <p className="text-base italic">{movieData.tagline}</p>
          <p data-testid="movie-overview" className="my-2  text-xl ">
            {movieData.overview}
          </p>
          <p>
            {movieData.genres.map((el, i) => (
              <span
                className="cursor-pointer px-2 bg-[#BE123C] inline-block text-white rounded-lg mr-2"
                key={i}
              >
                {el.name}{" "}
              </span>
            ))}
          </p>
        </section>
      )}
    </>
  );
}
