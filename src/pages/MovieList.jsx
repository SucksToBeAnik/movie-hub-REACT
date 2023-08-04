import { searchMovie } from "../utils/movie";
import { useLoaderData } from "react-router-dom";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { AiOutlineStar, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  setCollectionIsOpen,
  setSelectedContent,
  fetchCollections
} from "../slices/collectionSlice";
import { useEffect } from "react";

function MovieList() {
  const movies = useLoaderData();
  const dispatch = useDispatch()

  useEffect(function(){
    dispatch(fetchCollections())
  },[dispatch])


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
        <p className="line-clamp-4 py-2 text-xs text-black/60 md:text-base">
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
        <button onClick={()=>dispatch(setSelectedContent(movie))} className="rounded px-2 py-1 shadow-md hover:scale-105">
          <AiOutlineEye />
        </button>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const query = params.query || "";
  const data = await searchMovie(query);


  return data.results;
}
