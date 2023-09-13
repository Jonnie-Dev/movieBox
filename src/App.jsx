import { Route, Routes, Link, useParams } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import { Back } from "iconsax-react";
import SideBar from "./components/SideBar";
import MainContent from "./components/MainContent";
import MovieContent from "./components/MovieContent";

const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [activeSection, setActiveSection] = useState("true");
  const RatedURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
  return (
    <div className="font-dm-sans  flex lg:gap-12 gap-2">
      <Routes>
        <Route
          path="/"
          element={
            <SideBar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          }
        >
          <Route
            index={true}
            element={
              <>
                <div className="h-[100vh] w-[100%] overflow-y-scroll">
                  <MainContent
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    apiKey={apiKey}
                  />
                </div>
              </>
            }
          />
          <Route
            path={`/movie/:id`}
            element={
              <MovieContent
                RatedURL={RatedURL}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                apiKey={apiKey}
              />
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <>
              <div className="h-[100vh] flex justify-center items-center  py-8 text-center lg:pr-12 pr-2 w-[100%]">
                <div>
                  <h1 className="text-3xl mb-4 font-semibold">ERROR 404</h1>
                  <h2 className="text-xl mb-4 font-semibold ">
                    Page not found
                  </h2>
                  <Link to="/">
                    <button className="text-lg flex justify-center items-center gap-2  mx-auto">
                      {" "}
                      <Back size="28" color="#BE123C" /> Return home
                    </button>
                  </Link>
                </div>
              </div>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
