export async function searchMovie(query){
    const key = import.meta.env.VITE_TMDB_KEY

    let fecthUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${key}`
    if(!query) fecthUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=${key}`
           
    try{
        const res = await fetch(fecthUrl);

        if(!res.ok) throw new Error('There was an errror while fetching your content')

        const data = await res.json()


        return data
    }catch(e){
        throw new Error(e.message || e.data)
    }
}