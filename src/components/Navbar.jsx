import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { BsFillCollectionPlayFill, BsPencilSquare } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { useSelector } from "react-redux";

import {PiTelevisionSimpleBold} from 'react-icons/pi'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  const searchType = useSelector(state=>state.dropdown.searchType)

  return (
    <nav className="relative flex items-center justify-between p-5">
      <div>
        <NavLink
          to="/"
          icon={<AiOutlineHome className="text-md" />}
          name="Home"
        />
      </div>

      <div className="text-md">
        <button onClick={() => setIsOpen((s) => !s)} className="md:hidden">
          {!isOpen ? <RxHamburgerMenu /> : <ImCancelCircle />}
        </button>
      </div>

      <div
        className={`${
          !isOpen && "hidden"
        } absolute right-0 top-[72px] z-10 flex h-screen basis-1/2 flex-col items-start justify-start gap-10 rounded p-2 md:static md:flex md:h-auto md:flex-row md:items-center md:justify-between`}
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
  );
}

function NavLink({ icon, to, name }) {
  return (
    <div className="flex cursor-pointer items-center justify-center gap-1 rounded-sm border-b border-black px-2 py-1 uppercase text-black transition-all hover:border-blue-400 hover:bg-blue-400 hover:text-white">
      {icon}
      <Link to={to}>{name}</Link>
    </div>
  );
}

export default Navbar;
