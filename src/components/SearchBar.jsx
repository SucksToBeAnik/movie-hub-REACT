import { useState } from "react";
import Dropdown from "../components/Dropdown";
import { useNavigate } from "react-router-dom";
import {BiSearchAlt} from 'react-icons/bi'
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

function SearchBar({className=''}) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const searchType = useSelector(state=>state.dropdown.searchType)


  

  function handleSubmit(e){
    e.preventDefault()
    navigate(`${searchType}/${query}`)
  }

  const formClass = twMerge("relative w-full shadow-md",className)



  return (
      <form onSubmit={handleSubmit} className={formClass}>
        <input value={query} onChange={(e)=>setQuery(e.target.value)} type="text" className="rounded border px-4 py-2 w-full inline-block pl-24 focus:outline-none" placeholder="Seacrh here..." />

        <button type="submit" className="absolute right-3.5 top-2">
          <BiSearchAlt className="text-2xl" />
        </button>
        
        <Dropdown />
      </form>
  );
}

export default SearchBar
