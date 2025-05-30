import axios from "axios";
import { useEffect, useState } from "react";
import Singlecontent from "../../Components/SingleContent/Singlecontent";
import Custompagination from "../../Components/Pagination/Custompagination";
import Genres from "../../Components/Genres";
import useGenres from "../../hooks/useGenre";
import ShimmerCard from "../../Components/Shimmer/ShimmerCard";
import CustomShimmerCard from "../../Components/Shimmer/CustomShimmerCard";

const Movies = () => {
 const[page, setPage]=useState(1);
 const [content,setContent]=useState([]);
 const [numOfPages,setNumOfPages]=useState();
 const [selectedgenres,setSelectedgenres]=useState([]);
 const [genres, setGenres] = useState([]);
 const [loading, SetLoading] = useState(true);
 const genreforURL=useGenres(selectedgenres);
 


  const fetchMovies = async ()=>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
    setContent(data.results);
    setNumOfPages(data.total_pages);
    SetLoading(false);
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
      {loading ? (
        <div className="trending" style={{ display: 'flex', flexWrap: 'wrap' }}>
    {Array.from({ length: 8 }).map((_, index) => (
      <CustomShimmerCard key={index} />
    ))}
  </div>
      ) : (
        content.map((c) => (
          <Singlecontent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type="movie"
            vote_average={(c.vote_average > 0) ? c.vote_average : 'Not yet released'}
          />
        ))
      )}
      </div>
      {numOfPages>1 && (
        <Custompagination setPage={setPage} numOfPages={numOfPages} />)}
    </div>
  );
};

export default Movies;
