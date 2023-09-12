import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar";
import MainContent from "./components/MainContent";
import MovieContent from "./components/MovieContent";

const apiKey = import.meta.env.VITE_API_KEY;
function App() {
  return (
    <div className="font-dm-sans flex lg:gap-12 gap-2">
      <Routes>
        <Route path="/" element={<SideBar />}>
          <Route
            index={true}
            element={
              <>
                <div className="h-[100vh] w-[100%] overflow-y-scroll">
                  <MainContent apiKey={apiKey} />
                </div>
              </>
            }
          />
          <Route path={`/movie/:id`} element={<MovieContent />} />
        </Route>
        <Route path="*" element={<></>} />
      </Routes>
    </div>
  );
}

export default App;
