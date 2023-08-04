import { searchSeries } from "../utils/series";
import { useLoaderData } from "react-router-dom";
import { AiOutlineStar, AiOutlineEye } from "react-icons/ai";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setCollectionIsOpen,
  setSelectedContent,
  fetchCollections
} from "../slices/collectionSlice";

function SeriesList() {
  const seriesList = useLoaderData();

  console.log(seriesList)

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
        <p className="line-clamp-4 py-2 text-xs text-black/60 md:text-base">
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
        <button onClick={()=>dispatch(setSelectedContent(series))} className="rounded px-2 py-1 shadow-md hover:scale-105">
          <AiOutlineEye />
        </button>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const query = params.query || "";
  const data = await searchSeries(query);

  return data.results;
}
