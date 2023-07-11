import React,{useEffect,useState} from 'react';
import axios from 'axios';
import style from './Home.module.css';

export default function Home() {

  let [moviesTrends,setMoviesTrends]=useState([]);
  let [tvTrends,setTvTrends]=useState([]);
  let baseimgUrl='https://image.tmdb.org/t/p/original/';

  async function getMovieData(mediaType, callback){
    let {data}= await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=53cd2ef28544696627eb8d92d614d3df`);
    callback(data.results);
  }
  useEffect(()=>{
    getMovieData('movie',setMoviesTrends);
    getMovieData('tv',setTvTrends);

  },[])
  return (
    <>
      <div className='row'>

        <div className="col-md-4 d-flex align-items-center">
        <div className='w-100'>
          <div className={`w-50 mb-3 ${style.brdr}`}></div>
            <h4>Trending</h4>
            <h4>Movies</h4>
            <h4>To Watch Now</h4>
            <p className='secondColor'>Lorem ipsum dolor sit amet.</p>
          <div className={style.brdr}></div>
          </div>
        </div>

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
      {/* tv shows */}
      <div className='row'>

        <div className="col-md-4 d-flex align-items-center">
        <div className='w-100'>
          <div className={`w-50 mb-3 ${style.brdr}`}></div>
            <h4>Trending</h4>
            <h4>Tv shows</h4>
            <h4>To Watch Now</h4>
            <p className='secondColor'>Lorem ipsum dolor sit amet.</p>
          <div className={style.brdr}></div>
          </div>
        </div>

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
    </>
  )
}
