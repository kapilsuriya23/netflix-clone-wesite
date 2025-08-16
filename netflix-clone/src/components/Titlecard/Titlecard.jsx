import React, { useEffect, useRef, useState } from 'react'
import './Titlecard.css'
import Cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const Titlecard = ({title,category}) => {

  const [apiData, setApiData]=useState([]);
  const cardsRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2MxYTRiM2U0OTJlMWE0MzY2ZjVkOTdkNjA5ZDcyYyIsIm5iZiI6MTc1NTI3NDI2MC45NzgsInN1YiI6IjY4OWY1YzE0NGY0NjY1ZDI2MWI3MWE4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jC-s7l12FtAtUuLOPUBQ_tcpgwgoqeLk6W5QJwmdoSg'
  }
};

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));



    cardsRef.current.addEventListener("Wheel", handleWheel);
  },);

  return (
    <div className='title-card'>
      <h2>{title?title:"popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default Titlecard