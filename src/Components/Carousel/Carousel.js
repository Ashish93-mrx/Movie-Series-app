import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { noPicture } from '../../config/config';
import {img_300} from "../../config/config.js";
import axios from 'axios';
import "./carousel.css";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css";

const handleDragStart = (e) => e.preventDefault();


const Carousel = ({media_type,id}) => {

  const [credits, setCredits]=useState();


  const items = credits?.map((c) => (
    <div className="carouselItem" key={c.id}>
      <LazyLoadImage
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        effect="blur"
        onDragStart={handleDragStart}
        className="carouselItem__img"
        wrapperClassName="carouselItem__wrapper"
      />
      <b className="carouselItem__txt">{c?.name}</b>
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
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US
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