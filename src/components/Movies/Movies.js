import React ,{useEffect,useState}from 'react';
import axios from 'axios';

export default function Movies() {
  let [moviesTrends,setMoviesTrends]=useState([]);
  let baseimgUrl='https://image.tmdb.org/t/p/original/';

  async function getMovieData(){
    let {data}= await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=53cd2ef28544696627eb8d92d614d3df`);
    setMoviesTrends(data.results);
  }
  useEffect(()=>{
    getMovieData();

  },[])
  return (
    <div className='row my-5'>
      {moviesTrends.map((movie)=>
        <div className='col-md-3'>
          <div className='movie' key={movie.id}>
            <h3>{movie.title}</h3>
            <div className='image'>
                <img src={baseimgUrl+movie.poster_path} className='w-100'/>
            </div>
          </div>
        </div>
        )}
    </div>
  )
}
