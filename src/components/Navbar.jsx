import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { BsFillCollectionPlayFill, BsPencilSquare } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

import { PiTelevisionSimpleBold } from "react-icons/pi";
import SearchBar from "./SearchBar";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative h-28">
      <nav className="fixed z-50 flex w-full items-center justify-between bg-white p-5 shadow-md">


        <div className="grid w-full grid-cols-[1fr_1fr_1fr] xl:grid-cols-[auto_1fr] gap-y-4">
          <div className="col-span-2 xl:col-span-1 justify-self-start self-center cursor-pointer gap-1 rounded-sm border-b border-black px-2 py-1 uppercase text-black transition-all hover:border-blue-400 hover:bg-blue-400 hover:text-white">
            <Link
              to="/"
              className="flex items-center justify-center gap-2"
            >
              <AiOutlineHome className="inline" />

              <span className="hidden md:inline">Home</span>
            </Link>
          </div>

          <div className="col-start-1 col-end-4 xl:col-start-2 xl:col-end-2 justify-self-center order-last">
            <SearchBar className="shadow-none xl:order-none md:w-full" />
          </div>

          <div className="text-md xl:hidden justify-self-end">
            <button onClick={() => setIsOpen((s) => !s)}>
              {!isOpen ? <RxHamburgerMenu /> : <ImCancelCircle />}
            </button>
          </div>

          {/* <div className="basis-full h-0 md:basis-0"></div> */}
        </div>

        <div
          className={`${
            !isOpen && "hidden"
          } absolute right-0 top-[72px] z-10 flex h-screen basis-1/2 flex-col items-start justify-start gap-5 rounded bg-white p-2 shadow-xl xl:static xl:flex xl:h-auto xl:flex-row xl:items-center xl:justify-between xl:gap-10 xl:shadow-none`}
        >
          <NavLink
            to="/movie"
            icon={<BiMoviePlay className="text-md" />}
            name="Movies"
          />
          <NavLink
            to="/tv"
            icon={<PiTelevisionSimpleBold className="text-md" />}
            name="TV Series"
          />
          <NavLink
            to="/collections"
            icon={<BsFillCollectionPlayFill className="text-md" />}
            name="Collections"
          />
          <NavLink
            to="/reviews"
            icon={<BsPencilSquare className="text-md" />}
            name="Reviews"
          />
        </div>
      </nav>
    </section>
  );
}

function NavLink({ icon, to, name }) {
  return (
    <div className="flex cursor-pointer items-center justify-center gap-1 rounded-sm border-b border-black px-2 py-1 uppercase text-black transition-all hover:border-blue-400 hover:bg-blue-400 hover:text-white">
      {icon}
      <Link to={to} className="whitespace-nowrap">
        {name}
      </Link>
    </div>
  );
}

export default Navbar;
