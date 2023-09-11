import logo from "../assets/tv.svg";
// import { useState, useEffect } from "react";
import { Home2, Calendar, Video, Play } from "iconsax-react";
export default function SideBar() {
  const active =
    "text-[#BE123C] bg-[#ff8eaa3b] border-r-[6px] border-r-[#BE123C] font-bold";

  return (
    <section className="flex [&>*]:flex [&>*]:cursor-pointer flex-col gap-12 py-8 lg:w-[15vw]  w-[20%] border-r-4 h-[100vh] ">
      <div className=" lg:[&>p]:block [&>p]:hidden px-4 justify-start items-center gap-2">
        <img src={logo} alt="movie box logo" />
        <p className="font-bold text-xl">MovieBox</p>
      </div>
      <nav className="lg:[&>*>p]:block text-lg font-medium flex-col gap-8 [&>*>p]:hidden [&>div]:flex lg:[&>div]:px-8 [&>div]:px-4 [&>div]:justify-start [&>div]:items-center [&>div]:p-[1rem] [&>div]:gap-4">
        <div className={`${active}`}>
          <Home2 size="28" />
          <p>Home</p>
        </div>
        <div>
          <Video size="28" />
          <p>Movies</p>
        </div>
        <div>
          <Play size="28" />
          <p>TV Series</p>
        </div>
        <div>
          <Calendar size="28" />
          <p>Upcoming</p>
        </div>
      </nav>
    </section>
  );
}
