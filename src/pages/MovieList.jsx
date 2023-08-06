import { searchMovie } from "../utils/movie";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { AiOutlineStar, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  setCollectionIsOpen,
  setSelectedContent,
  fetchCollections,
} from "../slices/collectionSlice";
import { useEffect, useState } from "react";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";

function MovieList() {
  const data = useLoaderData();
  const dispatch = useDispatch();
  const movies = data.results;
  const params = useParams();
  const query = params.query || "";
  const total_pages = data.total_pages;

  const [page, setPage] = useState(data.page);

  useEffect(
    function () {
      dispatch(fetchCollections());
    },
    [dispatch],
  );

  if (!movies) return <p>Input valid keywords to get better results.</p>;

  return (
    <section>
      <div className="flex justify-center">
        <h1 className="md:4xl my-6 inline-block p-2 text-center text-3xl shadow">
          Movies
        </h1>
      </div>
      <div className="my-5 grid grid-cols-2 gap-5 p-2 md:grid-cols-3 md:gap-10 lg:grid-cols-5">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-3xl text-white my-2">
        <Link
          onClick={() => {
            if (page > 1) setPage((p) => p - 1);
          }}
          className={`rounded-full bg-blue-400 p-2 shadow-md ${
            page === 1 && "hidden"
          }`}
          to={`/movie/${page - 1}/${query}`}
        >
          <BiSkipPrevious />
        </Link>

        <span className="rounded-full  border-b-2 p-2 text-base font-semibold text-blue-400 shadow-md">
          {page}
        </span>

        <Link
          onClick={() => setPage((p) => p + 1)}
          className={`rounded-full bg-blue-400 p-2 shadow-md ${
            page === total_pages && "hidden"
          }`}
          to={`/movie/${page + 1}/${query}`}
        >
          <BiSkipNext />
        </Link>
      </div>
    </section>
  );
}

export default MovieList;

function Movie({ movie }) {
  const dispatch = useDispatch();

  return (
    <div className="grid grid-rows-[auto_1fr_auto] rounded p-2 shadow">
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={`${movie.title}`}
          className="rounded"
        />
        <div className="absolute right-2 top-2 flex items-center justify-center rounded bg-yellow-500 p-1 text-white">
          <span className="text-xs ">{movie.vote_average}</span>
          <AiOutlineStar className="text-xs " />
        </div>
      </div>
      <div>
        <h1 className="text-md py-2 font-semibold">{movie.name}</h1>
        <p className="line-clamp-4 mb-2 text-xs text-black/60 md:text-base">
          {movie.overview ? movie.overview : "This movie has no description"}
        </p>
      </div>
      <div className="text-md flex items-center justify-around py-2">
        <button
          onClick={() => {
            dispatch(setSelectedContent(movie));
            dispatch(setCollectionIsOpen());
          }}
          className="rounded px-2 py-1 shadow-md hover:scale-105"
        >
          <BsFillCollectionPlayFill />
        </button>
        <button
          onClick={() => dispatch(setSelectedContent(movie))}
          className="rounded px-2 py-1 shadow-md hover:scale-105"
        >
          <AiOutlineEye />
        </button>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const query = params.query || "";
  const page = params.page;
  const data = await searchMovie(query, page);

  return data;
}
