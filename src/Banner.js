import React, { useEffect, useState } from 'react'
import './Banner.css';
import axios from './axios';
import requests from './Requests';

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect (() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                //here we gonna generate a random film for example from 1 to 1000 and we will show it in the banner from what we fetch from netflixOriginals
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length -1)
                ]
            )
            return request;
        }
        fetchData();
    }, []);
    
    console.log(movie);


    //we gonna use trancate function for description means when we have a bunch of text will just show (...)
     function trancate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
     }

  return (
    <header
    className='banner'
    style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
    }}>
       <div className='banner_contents'>
        <h1 className='banner_title'>
            {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className='banner_buttons'>
            <button className='banner_button'>Play</button>
            <button className='banner_button'>My List</button>
        </div>
         <h1 className='banner_description'>
            {trancate(movie?.overview, 150)}
         </h1>
       </div>
       <div className='banner--fadeBottom' />
    </header>
  )
}

export default Banner