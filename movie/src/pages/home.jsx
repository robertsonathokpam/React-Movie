import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import "../css/Home.css";
import { useEffect } from 'react';
import {searchMovies,getPopularMovies} from '../services/api';

function Home() {

    const [searchQuery, setSearchQuery]=useState("");
    const [movies, setMovies]=useState([]);// this store the movies data which we get from api
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState(null); 

   /* const movie=[ {id:1, tzitle:"The Batman",release_Date:"2022-03-04"},
        {id:2, title:"The Flash",release_Date:"2023-06-16"},
        {id:3, title:"The Avengers",release_Date:"2012-05-04"},
        {id:4, title:"The Dark Knight",release_Date:"2008-07-18"}
    ];
    */
    // const movies=searchMovies(); //writing like this create a issue because
    
    useEffect( ()=>{
        const loadPopularMovies=async()=>{
            setLoading(true);
            try{
                setError(null);
                const popularMovies=await getPopularMovies();//this will fetch the data from api
                setMovies(popularMovies);//this will set the data in movies state
            }catch(err){
                console.log(err);
                setError("Failed to fetch popular movies");
            }finally{
               setLoading(false);
            }
        }
        loadPopularMovies();           
    }, [] );


    const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    if (loading) return

    setLoading(true)
    try {       
        const searchResults = await searchMovies(searchQuery) //this will fetch the data from api
        setMovies(searchResults) //this will set the data in movies state
        setError(null)
    } catch (err) {
        console.log(err)
        setError("Failed to search movies...")
    } finally {
        setLoading(false)
    }
  };

    return (
       <div className="home">
  
        <form className="search-form" onSubmit={handleSearch}>
            <input type="text" placeholder="Search movies..." className="search-input" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
            <button type="submit" className="search-button">Search</button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {loading ?<div className="loading" >Loading...</div> : (<div className="movie-grid">
          {movies.map(
            (m) => (
            // m.title.toLowerCase().startsWith(searchQuery) && 
             <MovieCard key={m.id} movie={m} />
           ))}
        </div>) }

       </div>
    )
}

export default Home;