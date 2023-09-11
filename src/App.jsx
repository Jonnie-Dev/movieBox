import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar";
import MainContent from "./components/MainContent";

const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  return (
    <div className="font-dm-sans flex lg:gap-12 gap-2">
      <SideBar />
      <MainContent />
    </div>
  );
}

export default App;
