import Home from '../Home/Home';
import Movies from '../Movies/Movies';
import Navbar from '../Navbar/Navbar';
import TvShows from '../TvShows/TvShows';
import People from '../People/People';
import About from '../About/About';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Guard from '../Guard/Guard';
import {Routes,Route,useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  let [loginUser,setLoginUser]=useState(null);
  let [isLogged,setIsLogged]=useState(false);
  let navigate=useNavigate();

  function logOut(){
    console.log('hi');
    localStorage.removeItem('token');
    setIsLogged(false);
    setLoginUser(null);
    navigate('/login');
  }

  function userData(){
    let token=localStorage.getItem('token');
    let decode=jwtDecode(token);
    setLoginUser(loginUser);
    setIsLogged(true);
  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
      userData();
    }
  })
  return (
    <>
      <Navbar isLogged={isLogged} logOut={logOut}/>
      <div className='container'>
      <Routes>
        <Route element={<Guard isLogged={isLogged}/>}>
          <Route path='/' element={<Home />}></Route>
          <Route path='home' element={<Home />} ></Route>
          <Route path='movies' element={<Movies />}></Route>
          <Route path='tv-shows' element={<TvShows />}></Route>
          <Route path='people' element={<People />} ></Route>
        </Route>
        <Route path='about' element={<About />} ></Route>
        <Route path='login' element={<Login userData={userData}/>}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      </div>
    </>
  );
}

export default App;
