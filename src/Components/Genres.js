import axios from 'axios'
import React, { useEffect } from 'react'
import { Chip } from '@mui/material';

const Genres = ({
        selectedgenres,
        setSelectedgenres,
        genres,
        setGenres,
        type,
        setPage,

}) => {


    const handleAdd=(genre)=>{
        setSelectedgenres([...selectedgenres, genre]);
        setGenres(genres.filter((g)=> g.id!==genre.id));
        setPage(1);
    };

    const handleRemove=(genre)=>{
        setSelectedgenres(selectedgenres.filter((g)=> g.id!==genre.id));
        setGenres([...genres, genre]);
        
        setPage(1);
    };

    const fetchGenres = async () =>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=3d7a497b0cb06b8d7ce3562c6d4d1496&language=en-US`);
        setGenres(data.genres)
    };

     useEffect(()=>{
        fetchGenres();

        return ()=>{
            setGenres([]);
        };
     },[]);
  return (
    <div style={{padding: "6px 0"}}>
    {selectedgenres && selectedgenres.map((genre)=> (
        <Chip 
        color='primary' 
            label={genre.name}
            style={{margin:2,backgroundColor:'green'}}
            size="small"
            key={genre.id}
            clickable
            //size="small"
            onDelete={() => handleRemove(genre)}
        />
      ))}
     {genres && genres.map((genre)=> (
        <Chip 
        color='primary' 
            label={genre.name}
            style={{margin:2,backgroundColor:'grey',fontWeight:600}}
            size="small"
            key={genre.id}
            clickable
            //size="small"
            onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  )
}

export default Genres
