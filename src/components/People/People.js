import React ,{useEffect,useState}from 'react';
import axios from 'axios';

export default function People() {
  let [people,setPeople]=useState([]);
  let baseimgUrl='https://image.tmdb.org/t/p/original/';

  async function getData(){
    let {data}= await axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=53cd2ef28544696627eb8d92d614d3df`);
    setPeople(data.results);
  }
  useEffect(()=>{
    getData();

  },[]);

  return (
    <div className='row my-5'>
      {people.map((data)=>
        <div className='col-md-3'>
          <div className='tv' key={data.id}>
            <h3>{data.name}</h3>
            <div className='image'>
                <img src={baseimgUrl+data.profile_path} className='w-100'/>
            </div>
          </div>
        </div>
        )}
    </div>
  )
}
