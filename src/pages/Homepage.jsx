import { useState } from "react";
import Dropdown from "../components/Dropdown";
import { useNavigate } from "react-router-dom";
import {BiSearchAlt} from 'react-icons/bi'
import { useSelector } from "react-redux";

function Homepage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const searchType = useSelector(state=>state.dropdown.searchType)


  

  function handleSubmit(e){
    e.preventDefault()
    navigate(`${searchType}/${query}`)
  }


  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="relative w-full md:w-2/4 px-2">
        <input value={query} onChange={(e)=>setQuery(e.target.value)} type="text" className="rounded border shadow-md px-4 py-2 w-full inline-block pl-24" placeholder="Seacrh here..." />

        <button type="submit" className="absolute right-3.5 top-2">
          <BiSearchAlt className="text-2xl" />
        </button>
        
        <Dropdown />
      </form>
    </div>
  );
}

export default Homepage;
