import Lottie from "lottie-react";
import SearchBar from "../components/SearchBar";
import movie from "../assets/movie.json";

function Homepage() {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center p-2 md:w-3/5">
      <div className="my-4 flex flex-col items-center justify-center md:flex-row">
        <h1 className="basis-2/4 bg-gradient-to-b from-blue-600 to-blue-300 bg-clip-text text-center text-transparent text-3xl font-bold  md:text-left md:text-6xl">
          What are you watching today?
        </h1>
        <Lottie animationData={movie} className="h-2/4 text-blue-400" />
      </div>

      <SearchBar />
    </div>
  );
}

export default Homepage;
