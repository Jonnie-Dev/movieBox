import { SearchNormal } from "iconsax-react";
import MovieCard from "./MovieCard";

export default function MainContent() {
  return (
    <main className="w-[100%]">
      <nav className="lg:pr-8 px-2 my-8 gap-4 flex justify-between flex-wrap">
        <h1 className="font-bold text-4xl">Featured Movie</h1>
        <div className="lg:w-[30%] py-2 w-[100%] rounded-lg flex items-center px-4 border-[2px] border-[#7C2D12] gap-4">
          <input
            className="w-[100%] text-[#7C2D12]"
            placeholder="What do you want to watch?"
            type="text"
          />
          <SearchNormal size="24" color="#7C2D12" />
        </div>
      </nav>
      <div>
        This is where we will render all our cards
        <MovieCard />
      </div>
    </main>
  );
}
