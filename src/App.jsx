import './App.css'
import SearchIcon from '../public/search.svg'
import { useState,useEffect } from 'react'
import MovieCard from './MovieCard'

 const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=fd328979'

 const movie={
  "Title": "CR: Enter the Matrix",
  "Year": "2009",
  "imdbID": "tt1675286",
  "Type": "game",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMTExMzY3NTQ1NjleQTJeQWpwZ15BbWU3MDAyMjk2NzM@._V1_SX300.jpg"
}
 
function App() {
  const [movie, setMovies] = useState([])
  const [search, setSearch] = useState('')

   const searchMovie = async (title) =>{
      const response = await fetch(`${API_URL}&s=${title}`)
      const data = await response.json()
      setMovies(data.Search)
   }

   useEffect(()=>{
      searchMovie('The Matrix')
   },[])

  return (
    <>
      <div className="app">
        <h1>MovieLand</h1>
        <div className="search">
          <input 
           placeholder="Search for a movie"
           value={search}
           onChange={(e)=>setSearch(e.target.value)}
           />
          <img 
          src={SearchIcon}
           alt="search"
           onClick={()=>searchMovie(search)}
            />
        </div>

        {movie?.length > 0 
          ?(
            <div className='container'>
              {
                movie.map((movie)=>{
                  return <MovieCard movie={movie} />
                })
              }
           </div>
          ) : (
             <div className='empty'>
              <h2>No movies found</h2>
            </div>
          ) }
         
      </div>  
    </>
  )
}

export default App
