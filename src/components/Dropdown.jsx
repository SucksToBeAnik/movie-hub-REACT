import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDownCircle } from "react-icons/ai";
import { changeSearchType } from "../slices/dropdownSlice";

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
        <span className="inline-block w-11 text-left">{searchType === 'movie' ? "Movie" : 'Series'}</span>
      </button>
      {open && (
        <div className="mt-2 rounded border px-2 py-3 text-sm">
          {/* <span
            onClick={() => {
              handleClick();
              dispatch(changeSearchType(""));
            }}
            className="block cursor-pointer border-b p-1"
          >
            All
          </span> */}
          <span
            onClick={() => {
              handleClick();
              dispatch(changeSearchType("movie"));
            }}
            className="block cursor-pointer border-b p-1"
          >
            Movie
          </span>
          <span
            onClick={() => {
              handleClick();
              dispatch(changeSearchType("tv"));
            }}
            className="block cursor-pointer p-1"
          >
            Series
          </span>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
