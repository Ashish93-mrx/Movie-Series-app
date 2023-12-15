import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { noPicture } from '../../config/config';
import {img_300} from "../../config/config.js";
import axios from 'axios';
import "./carousel.css";

const handleDragStart = (e) => e.preventDefault();


const Carousel = ({media_type,id}) => {

  const [credits, setCredits]=useState();


  const items=credits?.map((c)=>(
    <div className='carouselItem'>
      <img 
      src={c.profile_path ? `${img_300}/${c.profile_path}`:noPicture}
      alt={c?.name}
      onDragStart={handleDragStart}
      className='carouselItem__img'
      />
      <b className='carouselItem__txt'>{c?.name}</b>
    </div>
  ));

const responsive = {
  0:{
    items:3,
  },
  512:{
    items:5,
  },
  1024:{
    items:7,
  },
};

  const fetchCredit=async () =>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/466420/credits?api_key=3d7a497b0cb06b8d7ce3562c6d4d1496&language=en-US
    `);
    setCredits(data.cast);
  };

useEffect(()=>{
  fetchCredit();

},[]);

  return (
    <AliceCarousel  autoPlay responsive={responsive}
    infinite
    disableDotsControls
    disableButtonsControls
    mouseTracking items={items} />
  );
}

export default Carousel;