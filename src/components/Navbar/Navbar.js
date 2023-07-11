import React from 'react';
import { Link } from 'react-router-dom';
import style from './Navbar.module.css';

export default function Navbar({isLogged,logOut}) {

  return (
    <nav className={`navbar navbar-expand-lg w-100 ${style.navbg}`}>
   <div className="container-fluid">
    <a className="navbar-brand" href="#">Noxe</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent"> 
    {isLogged &&
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="tv-shows">TvShows</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="people">People</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="about">About</Link>
        </li>
        </ul>
    }
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <div className='social-links d-flex align-items-center'>
          <i className="fa-brands fa-facebook me-1 "></i>
          <i className="fa-brands fa-instagram me-1"></i>
          <i className="fa-brands fa-youtube me-1"></i>
          </div>
          {!isLogged ?
          <>
            <li className="nav-item">
              <Link className="nav-link" to="login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="register">Register</Link>
            </li>
          </>
          :
         
        <li className="nav-item">
          <a className={`nav-link ${style.hoverLink}`} onClick={logOut}>Logout</a>
        </li>
          }
        </ul>
     
    </div>
  </div>
</nav>
  )
}

