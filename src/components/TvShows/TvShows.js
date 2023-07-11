import React,{useEffect,useState} from 'react';
import axios from 'axios';

export default function TvShows() {

  let [tvTrends,setTvTrends]=useState([]);
  let baseimgUrl='https://image.tmdb.org/t/p/original/';

  async function getMovieData(){
    let {data}= await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=53cd2ef28544696627eb8d92d614d3df`);
    setTvTrends(data.results);
  }
  useEffect(()=>{
    getMovieData();

  },[])

  return (
    <div className='row my-5'>
       {tvTrends.map((tv)=>
        <div className='col-md-3'>
          <div className='tv' key={tv.id}>
            <h3>{tv.name}</h3>
            <div className='image'>
                <img src={baseimgUrl+tv.poster_path} className='w-100'/>
            </div>
          </div>
        </div>
        )}
    </div>
  )
}
