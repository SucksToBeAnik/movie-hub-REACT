import Lottie from 'lottie-react'
import SearchBar from "../components/SearchBar"
import movie from '../assets/movie.json'




function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center w-full md:w-3/5 mx-auto p-2">

      <div className='flex flex-col md:flex-row items-center justify-center my-4'>
        <h1 className='basis-2/4 text-3xl md:text-6xl font-bold bg-gradient-to-b from-blue-600 to-blue-300 bg-clip-text text-transparent text-center md:text-left'>What are you watching today?</h1>
      <Lottie animationData={movie} className='h-2/4 text-blue-400' />
      </div>

      <SearchBar />
    </div>
  )
}

export default Homepage

