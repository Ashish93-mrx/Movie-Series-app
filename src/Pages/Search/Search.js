import { useState,useEffect } from "react";
import { Button, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Singlecontent from "../../Components/SingleContent/Singlecontent";
import axios from "axios";
import Custompagination from "../../Components/Pagination/Custompagination";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },

});

const Search = () => {
  const [type, setType]=useState(0);
  const [page,setPage] = useState(1);
  const [searchText,setSearchText]=useState("");
  const [content,setContent]=useState([]);
  const [numOfPages,setNumOfPages]=useState();


const fetchSearch = async() => {
  const {data} = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`);
    //&with_genres=${genreforURL}
    setContent(data.results);
    setNumOfPages(data.total_pages);
   // console.log(data);
}

useEffect(()=>{
  window.scroll(0,0);
  fetchSearch();
  // eslint-disable-next-line 
},[type,page]);


  return (
    <>
    <ThemeProvider theme={darkTheme}>
    <div style={{display:"flex", margin:"15px 0",}}>
    
     <TextField style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
      onChange={(e)=> setSearchText(e.target.value)}
     />
   
    <Button variant="contained" style={{marginLeft:10}} 
    onClick={fetchSearch}><SearchIcon/></Button>
   
    </div>
    <Tabs value={type} indicatorColor='primary' textColor='primary'
    onChange={(event,newValue)=>{
        setType(newValue);
        setPage(1);
    }}
    style={{paddingBottom:5}}
    >
    <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
    </Tabs>
    </ThemeProvider>
    <div className="trending">
        {content && content.map((c)=>(<Singlecontent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.release_date} media_type={type ? "tv" : "movie"} vote_average={c.vote_average}/>)
        )}
        {searchText && !content && (type ? <h2>No series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages>1 && (<Custompagination setPage={setPage} />)}
      {<h6 style={{fontWeight:100,color:"#3b3e3e",display:"flex"}}>𝓐𝓼𝓱</h6>}
        {<h6 style={{fontWeight:100,color:"#3b3e3e",display:"flex"}}><a href="https://www.linkedin.com/in/ashish-n-m-2a5706256p">My LinkedIn</a></h6>}
    </>
  );
};

export default Search;
