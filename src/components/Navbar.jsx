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

  function handleLinkClick() {
    if (isOpen) {
      setIsOpen(() => false);
    }
  }

  return (
    <section className="relative h-28">
      <nav className="fixed z-40 flex w-full items-center justify-between bg-white p-5 shadow-md">
        <div className="grid w-full grid-cols-[1fr_1fr_1fr] gap-y-4 xl:grid-cols-[auto_1fr]">
          <div
            onClick={handleLinkClick}
            className="col-span-2 cursor-pointer gap-1 self-center justify-self-start rounded-sm border-b border-black px-2 py-1 uppercase text-black transition-all hover:border-blue-400 hover:bg-blue-400 hover:text-white xl:col-span-1"
          >
            <Link to="/" className="flex items-center justify-center gap-2">
              <AiOutlineHome className="inline" />

              <span className="hidden md:inline">Home</span>
            </Link>
          </div>

          <div className="order-last col-start-1 col-end-4 justify-self-center xl:col-start-2 xl:col-end-2">
            <SearchBar className="shadow-none md:w-full xl:order-none" />
          </div>

          <div className="text-md justify-self-end xl:hidden">
            <button onClick={() => setIsOpen((s) => !s)}>
              {!isOpen ? <RxHamburgerMenu /> : <ImCancelCircle />}
            </button>
          </div>

          {/* <div className="basis-full h-0 md:basis-0"></div> */}
        </div>

        <div
          className={`${
            !isOpen && "hidden"
          } absolute right-0 top-[60px] z-10 flex h-screen basis-1/2 flex-col items-start justify-start gap-5 rounded bg-white p-2 shadow-xl xl:static xl:flex xl:h-auto xl:flex-row xl:items-center xl:justify-between xl:gap-10 xl:shadow-none`}
        >
          <NavLink
            handleLinkClick={handleLinkClick}
            to="/movie"
            icon={<BiMoviePlay className="text-md" />}
            name="Movies"
          />
          <NavLink
            handleLinkClick={handleLinkClick}
            to="/tv"
            icon={<PiTelevisionSimpleBold className="text-md" />}
            name="TV Series"
          />
          <NavLink
            handleLinkClick={handleLinkClick}
            to="/collections"
            icon={<BsFillCollectionPlayFill className="text-md" />}
            name="Collections"
          />
          <NavLink
            handleLinkClick={handleLinkClick}
            to="/reviews"
            icon={<BsPencilSquare className="text-md" />}
            name="Reviews"
          />
        </div>
      </nav>
    </section>
  );
}

function NavLink({ icon, to, name, handleLinkClick }) {
  return (
    <div onClick={handleLinkClick} className="flex cursor-pointer items-center justify-center gap-1 rounded-sm border-b border-black px-2 py-1 uppercase text-black transition-all hover:border-blue-400 hover:bg-blue-400 hover:text-white">
      {icon}
      <Link to={to} className="whitespace-nowrap">
        {name}
      </Link>
    </div>
  );
}

export default Navbar;
