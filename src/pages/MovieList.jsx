import { searchMovie } from "../utils/movie";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { AiOutlineStar, AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  setCollectionIsOpen,
  setSelectedContent,
  fetchCollections,
  emptyCollectionList,
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
  const isSignedIn = useSelector((store) => store.auth.isSignedIn);

  const [page, setPage] = useState(data.page);

  useEffect(
    function () {
      if (isSignedIn) {
        dispatch(fetchCollections());
      } else {
        dispatch(emptyCollectionList());
      }
    },
    [dispatch, isSignedIn],
  );

  if (!movies) return <p>Input valid keywords to get better results.</p>;

  return (
    <section className="mb-16">
      <div className="flex justify-center">
        <h1 className="md:4xl mb-2 mt-10 lg:mt-6 inline-block rounded-md bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text p-2 text-center text-3xl font-bold uppercase tracking-widest text-transparent shadow">
          Movies
        </h1>
      </div>
      <div className="my-5 grid grid-cols-2 gap-5 p-2 md:grid-cols-3 md:gap-10 lg:grid-cols-5">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 my-2 flex items-center justify-center gap-2 text-3xl text-white">
        <Link
          onClick={() => {
            if (page > 1) setPage((p) => p - 1);
          }}
          className={`rounded-full bg-blue-400 p-1 shadow-md md:p-2 ${
            page === 1 && "hidden"
          }`}
          to={`/movie/${page - 1}/${query}`}
        >
          <BiSkipPrevious />
        </Link>

        <span className="rounded-full  border-b-2 bg-white/90 px-3 py-1 text-sm font-semibold text-blue-400 shadow-md">
          {page}
        </span>

        <Link
          onClick={() => setPage((p) => p + 1)}
          className={`rounded-full bg-blue-400 p-1 shadow-md md:p-2 ${
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
        <p className="mb-2 line-clamp-4 text-xs text-black/60 md:text-base">
          {movie.overview ? movie.overview : "This movie has no description"}
        </p>
      </div>
      <div className="text-md flex items-center justify-around py-2">
        <button
          onClick={() => {
            dispatch(setSelectedContent(movie));
            dispatch(setCollectionIsOpen());
          }}
        >
          <AiOutlinePlusCircle className="rounded-full bg-blue-400 text-2xl text-white shadow-xl transition-all hover:scale-105" />
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
