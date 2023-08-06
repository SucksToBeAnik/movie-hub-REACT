export async function searchMovie(query,page){
    const key = import.meta.env.VITE_TMDB_KEY

    let fecthUrl = `https://api.themoviedb.org/3/search/movie?page=${page}&query=${query}&api_key=${key}`
    if(!query) fecthUrl = `https://api.themoviedb.org/3/movie/popular?page=${page}&language=en-US&api_key=${key}`
           
    try{
        const res = await fetch(fecthUrl);

        if(!res.ok) throw new Error('There was an errror while fetching your content')

        const data = await res.json()

        console.log(data)


        return data
    }catch(e){
        throw new Error(e.message || e.data)
    }
}