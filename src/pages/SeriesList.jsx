import { searchSeries } from "../utils/series";
import { useLoaderData } from "react-router-dom";
import { AiOutlineStar,AiOutlineEye } from "react-icons/ai";
import {BsFillCollectionPlayFill} from 'react-icons/bs'

import { useDispatch } from "react-redux";
import {
  setCollectionIsOpen,
  setSelectedContent,
} from "../slices/collectionSlice";



function SeriesList() {
  const seriesList = useLoaderData();

  if (seriesList.length === 0)
    return <p>Input valid keywords to get better results.</p>;

  return (
    <section>
        <div className="flex justify-center">
        <h1 className="text-3xl md:4xl text-center my-6 p-2 shadow inline-block">TV Series</h1>
        </div>
    <div className="my-5 p-2 grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-10 lg:grid-cols-5">
      {seriesList.map((series) => (
        <Series key={series.id} series={series} />
      ))}
    </div>
    </section>
  );
}

export default SeriesList;

function Series({ series }) {

  const dispatch = useDispatch()


  return (
    <div className="grid grid-rows-[auto_1fr_auto] rounded p-2 shadow">
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}
          alt={`${series.name}`}
          className="rounded"
        />
        <div className="absolute top-2 right-2 bg-yellow-500 text-white rounded p-1 flex items-center justify-center">
          <span className="text-xs ">{series.vote_average}</span>
          <AiOutlineStar className="text-xs " />
        </div>
      </div>
      <div>
        <h1 className="text-md py-2 font-semibold">{series.name}</h1>
        <p className="py-2 text-xs text-black/60 md:text-base line-clamp-4">
          {series.overview ? series.overview : 'This movie has no description'}
        </p>
      </div>
      <div className="flex items-center justify-around text-md py-2">
      <button
          onClick={() => {
            dispatch(setSelectedContent(series));
            dispatch(setCollectionIsOpen());
          }}
          
          className="rounded px-2 py-1 shadow-md hover:scale-105"
        >
          <BsFillCollectionPlayFill />
        </button>
        <button className="rounded px-2 py-1 shadow-md hover:scale-105">
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
