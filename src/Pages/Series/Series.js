import axios from "axios";
import { useEffect, useState } from "react";
import Singlecontent from "../../Components/SingleContent/Singlecontent";
import Custompagination from "../../Components/Pagination/Custompagination";
import Genres from "../../Components/Genres";
import useGenres from "../../hooks/useGenre";
import CustomShimmerCard from "../../Components/Shimmer/CustomShimmerCard";


const Series = () => {

  const[page, setPage]=useState(1);
 const [content,setContent]=useState([]);
 const [numOfPages,setNumOfPages]=useState();
 const [selectedgenres,setSelectedgenres]=useState([]);
 const [genres, setGenres] = useState([]);
 const genreforURL=useGenres(selectedgenres);
 


  const fetchSeries = async ()=>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
    //&with_genres=${genreforURL}
    setContent(data.results);
    setNumOfPages(data.total_pages);
   // console.log(data);
  };

  useEffect(()=>{
    window.scroll(0,0);
    fetchSeries();
    // eslint-disable-next-line 
  },[page,genreforURL]);


  return (
    <div>
      <span className="pageTitle">TV series</span>
      <Genres 
        type='tv' selectedgenres={selectedgenres}
        setSelectedgenres={setSelectedgenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content ? content.map((c)=>(<Singlecontent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.release_date} media_type={"tv"} vote_average={c.vote_average}/>)
        ) : (
        <div className="trending" style={{ display: 'flex', flexWrap: 'wrap' }}>
    {Array.from({ length: 8 }).map((_, index) => (
      <CustomShimmerCard key={index} />
    ))}
  </div>)}
      </div>
      {numOfPages>1 && (<Custompagination setPage={setPage} />)}
    </div>
    
  );
};

export default Series;