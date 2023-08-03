import { searchMovie } from "../utils/movie"
import { useLoaderData } from "react-router-dom"
import {BsFillCollectionPlayFill} from 'react-icons/bs'
import { AiOutlineStar,AiOutlineEye } from "react-icons/ai";
import IconButton from "../components/IconButton";


function MovieList() {
    const movies = useLoaderData()

    console.log(movies)


    if(!movies) return <p>Input valid keywords to get better results.</p>

    return (
        <section>
        <div className="flex justify-center">
        <h1 className="text-3xl md:4xl text-center my-6 p-2 shadow inline-block">Movies</h1>
        </div>
    <div className="my-5 p-2 grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-10 lg:grid-cols-5">
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
    </section>
    )
}

export default MovieList;

function Movie({movie}){
    return <div className="grid grid-rows-[auto_1fr_auto] rounded p-2 shadow">
    <div className="relative">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={`${movie.title}`}
        className="rounded"
      />
      <div className="absolute top-2 right-2 bg-yellow-500 text-white rounded p-1 flex items-center justify-center">
        <span className="text-xs ">{movie.vote_average}</span>
        <AiOutlineStar className="text-xs " />
      </div>
    </div>
    <div>
      <h1 className="text-md py-2 font-semibold">{movie.name}</h1>
      <p className="py-2 text-xs text-black/60 md:text-base line-clamp-4">
        {movie.overview ? movie.overview : 'This movie has no description'}
      </p>
    </div>
    <div className="flex flex-col items-start justify-around text-md md:flex-row md:items-center py-2">
      <IconButton icon={<BsFillCollectionPlayFill />}></IconButton>
      <IconButton icon={<AiOutlineEye />}></IconButton>
    </div>
  </div>
}

export async function loader({params}){

    const query = params.query || ''
    const data = await searchMovie(query)

    console.log(data)


    return data.results
}
