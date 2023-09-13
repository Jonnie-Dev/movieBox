import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import loading from "../assets/loading-1.gif";
import { Star1, Back } from "iconsax-react";

export default function MovieContent({ apiKey }) {
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
      } catch (error) {
        if (error.response) {
          if (
            error.response.data.status_message ==
            "The resource you requested could not be found."
          )
            setErrorMsg("Requested Movie Not Found");
        } else if (error.request) {
          console.error("No response received. Check your network connection.");
          setErrorMsg("No response received. Check your network connection.");
        } else {
          console.error("An error occurred:", error.message);
          setErrorMsg(`An error occurred: ${error.message}`);
        }
      }

      () => {
        abortController.abort();
      };
    };
    fetchData();
  }, []);

  if (errorMsg) {
    return (
      <div className="py-8 text-center lg:pr-12 pr-2 w-[100%]">
        <h1 className="text-2xl mb-4 font-semibold ">{errorMsg}</h1>
        <Link to="/">
          <button className="text-lg flex justify-center items-center gap-2  mx-auto">
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
        <section className="h-[100vh] overflow-y-scroll lg:pr-12 pr-2 py-8">
          <div className="h-[50%] lgw-[80vw] w-[100%] ">
            <img
              className="w-full h-full object-cover object-top rounded-2xl"
              src={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`}
            />
          </div>
          <div>
            <div className="my-4 px-2 flex flex-wrap gap-2 justify-between items-center">
              <div className="flex flex-wrap md:gap-8 items-center gap-2 text-2xl font-semibold">
                <h1 className="">{movieData.title}</h1>
                <p>•</p>
                <p className="">{movieData.release_date}</p>
                <p>•</p>
                <p>{movieData.runtime} mins</p>
                <p className="text-lg font-medium px-2 bg-[#BE123C] inline-block text-white rounded-lg">
                  {movieData.status}
                </p>
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
          <p className="mb-2 text-base italic">{movieData.tagline}</p>
          <p className="text-xl ">{movieData.overview}</p>
        </section>
      )}
    </>
  );
}
