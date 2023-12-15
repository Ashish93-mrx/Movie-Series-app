import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Singlecontent from "../../Components/SingleContent/Singlecontent";
import "./trending.css";
import Custompagination from "../../Components/Pagination/Custompagination";

const Trending = () => {
  const [page,setPage]=useState(1);
  const [content, setContent] = useState([]);

  const fetchtrend = async () =>{
    
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);

    //console.log(data.results);
    // console.log(content);
    setContent(data.results);

  };

  useEffect(()=> {
    window.scroll(0,0);
    fetchtrend();
    // eslint-disable-next-line 
  },[page]);


  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content && content.map((c)=>(<Singlecontent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type={c.media_type} vote_average={c.vote_average}/>)
        )}
      </div>
      <Custompagination setPage={setPage} />
    </div>
  );
};

export default Trending;
