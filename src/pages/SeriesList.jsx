import { searchSeries } from "../utils/series";
import { useLoaderData, useParams, Link } from "react-router-dom";
import { AiOutlineStar, AiOutlineEye } from "react-icons/ai";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCollectionIsOpen,
  setSelectedContent,
  fetchCollections,
} from "../slices/collectionSlice";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";

function SeriesList() {
  const data = useLoaderData();
  const seriesList = data.results;
  const params = useParams();
  const query = params.query || "";

  const total_pages = data.total_pages;
  const [page, setPage] = useState(data.page);

  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(fetchCollections());
    },
    [dispatch],
  );

  if (seriesList.length === 0)
    return <p>Input valid keywords to get better results.</p>;

  return (
    <section>
      <div className="flex justify-center">
        <h1 className="md:4xl my-6 inline-block p-2 text-center text-3xl shadow">
          TV Series
        </h1>
      </div>
      <div className="my-5 grid grid-cols-2 gap-5 p-2 md:grid-cols-3 md:gap-10 lg:grid-cols-5">
        {seriesList.map((series) => (
          <Series key={series.id} series={series} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-3xl text-white my-2">
        
          <Link onClick={() => {
            if (page > 1) setPage((p) => p - 1);
          }}
          className={`rounded-full bg-blue-400 p-2 shadow-md ${
            page === 1 && "hidden"
          }`} to={`/tv/${page - 1}/${query}`}>
            <BiSkipPrevious />
          </Link>
        
          <span className="text-base font-semibold rounded-full shadow-md p-2 border-b-2 text-blue-400">{page}</span>

        
          <Link onClick={() => setPage((p) => p + 1)}
          className={`rounded-full bg-blue-400 p-2 shadow-md ${
            page === total_pages && "hidden"
          }`} to={`/tv/${page + 1}/${query}`}>
            <BiSkipNext />
          </Link>
        
      </div>
    </section>
  );
}

export default SeriesList;

function Series({ series }) {
  const dispatch = useDispatch();

  return (
    <div className="grid grid-rows-[auto_1fr_auto] rounded p-2 shadow">
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}
          alt={`${series.name}`}
          className="rounded"
        />
        <div className="absolute right-2 top-2 flex items-center justify-center rounded bg-yellow-500 p-1 text-white">
          <span className="text-xs ">{series.vote_average}</span>
          <AiOutlineStar className="text-xs " />
        </div>
      </div>
      <div>
        <h1 className="text-md py-2 font-semibold">{series.name}</h1>
        <p className="line-clamp-4 mb-2 text-xs text-black/60 md:text-base">
          {series.overview ? series.overview : "This movie has no description"}
        </p>
      </div>
      <div className="text-md flex items-center justify-around py-2">
        <button
          onClick={() => {
            dispatch(setSelectedContent(series));
            dispatch(setCollectionIsOpen());
          }}
          className="rounded px-2 py-1 shadow-md hover:scale-105"
        >
          <BsFillCollectionPlayFill />
        </button>
        <button
          onClick={() => dispatch(setSelectedContent(series))}
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

  const data = await searchSeries(query, page);

  console.log(data);

  return data;
}
