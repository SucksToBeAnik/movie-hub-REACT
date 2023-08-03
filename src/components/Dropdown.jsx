import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDownCircle } from "react-icons/ai";
import { changeSearchType } from "../slices/dropdownSlice";
import { BiMoviePlay } from "react-icons/bi";
import { PiTelevisionSimpleBold } from "react-icons/pi";

function Dropdown() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const searchType = useSelector((state) => state.dropdown.searchType);

  function handleClick() {
    setOpen((state) => !state);
  }
  return (
    <div className="absolute left-3.5 top-1.5">
      <button
        type="reset"
        onClick={handleClick}
        className="space-x-1 rounded border bg-blue-400 px-2 py-1 text-sm text-white"
      >
        <AiFillDownCircle className="inline-block" />
        <span className="inline-block w-11 text-left">
          {searchType === "movie" ? "Movie" : "Series"}
        </span>
      </button>
      {open && (
        <div className="mt-2 rounded border bg-white px-2 py-3 text-sm">
          <div
            onClick={() => {
              handleClick();
              dispatch(changeSearchType("movie"));
            }}
            className="flex cursor-pointer items-center justify-center gap-1 border-b p-1 transition-all hover:scale-105"
          >
            <BiMoviePlay />
            <span>Movie</span>
          </div>

          <div
            onClick={() => {
              handleClick();
              dispatch(changeSearchType("tv"));
            }}
            className="flex cursor-pointer items-center justify-center gap-1 p-1 transition-all hover:scale-105"
          >
            <PiTelevisionSimpleBold />
            <span>Series</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
