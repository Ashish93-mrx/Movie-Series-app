import axios from "axios";
import { useEffect, useState } from "react";
import Singlecontent from "../../Components/SingleContent/Singlecontent";
import Custompagination from "../../Components/Pagination/Custompagination";
import Genres from "../../Components/Genres";
import useGenres from "../../hooks/useGenre";

const Movies = () => {
 const[page, setPage]=useState(1);
 const [content,setContent]=useState([]);
 const [numOfPages,setNumOfPages]=useState();
 const [selectedgenres,setSelectedgenres]=useState([]);
 const [genres, setGenres] = useState([]);
 const genreforURL=useGenres(selectedgenres);
 


  const fetchMovies = async ()=>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=3d7a497b0cb06b8d7ce3562c6d4d1496&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(()=>{
    window.scroll(0, 0);
    fetchMovies();
    // eslint-disable-next-line 
  },[genreforURL, page]);

  return (
    <div>
      <span className="pageTitle">Movies</span>
      <Genres 
        type='movie' 
        selectedgenres={selectedgenres}
        setSelectedgenres={setSelectedgenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content && 
        content.map((c)=>(
          <Singlecontent 
          key={c.id} 
          id={c.id} 
          poster={c.poster_path} 
          title={c.title || c.name} 
          date={c.first_air_date || c.release_date} 
          media_type="movie" 
          vote_average={c.vote_average}/>)
        )}
      </div>
      {numOfPages>1 && (
        <Custompagination setPage={setPage} numOfPages={numOfPages} />)}
    </div>
  );
};

export default Movies;
