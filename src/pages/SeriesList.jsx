import { searchSeries } from "../utils/series";
import { useLoaderData, useParams, Link } from "react-router-dom";
import { AiOutlineStar, AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCollectionIsOpen,
  setSelectedContent,
  fetchCollections,
  emptyCollectionList,
} from "../slices/collectionSlice";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";

function SeriesList() {
  const data = useLoaderData();
  const seriesList = data.results;
  const params = useParams();
  const query = params.query || "";
  const isSignedIn = useSelector((store) => store.auth.isSignedIn);

  const total_pages = data.total_pages;
  const [page, setPage] = useState(data.page);

  const dispatch = useDispatch();

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

  if (seriesList.length === 0)
    return <p>Input valid keywords to get better results.</p>;

  return (
    <section className="mb-16">
      <div className="flex justify-center">
        <h1 className="md:4xl mb-4 mt-6 inline-block rounded-md bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text p-2 text-center text-3xl font-bold uppercase tracking-widest text-transparent shadow">
          TV Series
        </h1>
      </div>
      <div className="my-5 grid grid-cols-2 gap-5 p-2 md:grid-cols-3 md:gap-10 lg:grid-cols-5">
        {seriesList.map((series) => (
          <Series key={series.id} series={series} />
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
          to={`/tv/${page - 1}/${query}`}
        >
          <BiSkipPrevious />
        </Link>

        <span className="rounded-full border-b-2 bg-white/90 px-3 py-1 text-sm font-semibold text-blue-400 shadow-md">
          {page}
        </span>

        <Link
          onClick={() => setPage((p) => p + 1)}
          className={`rounded-full bg-blue-400 p-1 shadow-md md:p-2 ${
            page === total_pages && "hidden"
          }`}
          to={`/tv/${page + 1}/${query}`}
        >
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
        <p className="mb-2 line-clamp-4 text-xs text-black/60 md:text-base">
          {series.overview ? series.overview : "This movie has no description"}
        </p>
      </div>
      <div className="text-md flex items-center justify-center py-2">
        <button
          onClick={() => {
            dispatch(setSelectedContent(series));
            dispatch(setCollectionIsOpen());
          }}
        >
          <AiOutlinePlusCircle className="rounded-full bg-blue-400 text-2xl text-white shadow-md transition-all hover:scale-105" />
        </button>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const query = params.query || "";
  const page = params.page;

  const data = await searchSeries(query, page);

  return data;
}
