import { useState, useEffect, useCallback } from "react";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useDebounce from "../../hooks/useDebounce";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Singlecontent from "../../Components/SingleContent/Singlecontent";
import axios from "axios";
import Custompagination from "../../Components/Pagination/Custompagination";
import Skeleton from "@mui/material/Skeleton";
import Box from '@mui/material/Box';

// Custom debounce hook
// const useDebounce = (callback, delay) => {
//   const timeoutRef = useCallback(() => {
//     let timer;
//     return (...args) => {
//       clearTimeout(timer);
//       timer = setTimeout(() => callback(...args), delay);
//     };
//   }, [callback, delay]);
//   return timeoutRef();
// };

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [loading, setLoading] = useState(false);
  // const res = useDebounce();
  const useDebouncedSearch = useDebounce();



  // const fetchSearch = async () => {
  //   if (!searchText.trim()) {
  //     setContent([]);
  //     setLoading(false);
  //     return;
  //   }

    // setLoading(true); // Show loader while fetching data
    // try {
    //   const { data } = await axios.get(
    //     `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
    //       process.env.REACT_APP_API_KEY
    //     }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    //   );
    //   setContent(data.results);
    //   setNumOfPages(data.total_pages);
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setLoading(false); // Hide loader after fetching
    // }
  // };

  // Using custom debounce hook
  // const debouncedFetchSearch = useDebounce(fetchSearch, 2000);

  useEffect(() => {
    // if (!searchText.trim()) {
    //   setContent([]);
    //   return;
    // }
    // setLoading(true);
    // debouncedFetchSearch();
    // debounceCall();
    // const useDebouncedSearch = useDebounce();
  }, [type, page]); // Run on dependencies change


  const debounceCall = useDebouncedSearch(([results, totalPages]) => {
    setContent(results);
    setNumOfPages(1);
  });
  

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => debounceCall(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginLeft: 10 }}
            // onClick={}
          >
            <SearchIcon />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>

      <div className="trending">
        {/* {loading
          ? // Show 8 skeleton placeholders while loading
            [...Array(8)].map((_, index) => (
              <Box
      sx={{
        bgcolor: '#121212',
        p: 8,
        width: '100%',
        display: 'flex',
        // flexDirection: 'row',
      }}
    >
      <Skeleton
        animation="wave"
        variant="rounded"
        width={210}
        height={270}
      />
    </Box>
            ))
          : 
            
            )
            } */}

            {/* <Box
      sx={{
        bgcolor: '#121212',
        p: 8,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Skeleton
      
        variant="rounded"
        width={210}
        height={270}
      />
    </Box>
    <h1>HIII</h1> */}

        {/* {searchText && !loading && content.length === 0 && <h2>No Results Found</h2>} */}
       { (content.length!=0) ? content.map((c) => (
              <Singlecontent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.release_date}
                media_type={type ? "tv" : "movie"}
                vote_average={c.vote_average}
              />
            ))
            :
            <h1>Results Not Found</h1>
            }
      </div>

      {numOfPages > 1 && <Custompagination setPage={setPage} />}
    </>
  );
};

export default Search;



// import { useState, useEffect, useCallback } from "react";
// import { Button, TextField } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Singlecontent from "../../Components/SingleContent/Singlecontent";
// import axios from "axios";
// import Custompagination from "../../Components/Pagination/Custompagination";
// import Skeleton from "@mui/material/Skeleton";
// import Box from '@mui/material/Box';

// // Custom debounce hook
// const useDebounce = (callback, delay) => {
//   const timeoutRef = useCallback(() => {
//     let timer;
//     return (...args) => {
//       clearTimeout(timer);
//       timer = setTimeout(() => callback(...args), delay);
//     };
//   }, [callback, delay]);

//   return timeoutRef();
// };

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

// const Search = () => {
//   const [type, setType] = useState(0);
//   const [page, setPage] = useState(1);
//   const [searchText, setSearchText] = useState("");
//   const [content, setContent] = useState([]);
//   const [numOfPages, setNumOfPages] = useState();
//   const [loading, setLoading] = useState(false);

//   const fetchSearch = async () => {
//     if (!searchText.trim()) {
//       setContent([]);
//       setLoading(false);
//       return;
//     }

//     setLoading(true); // Show loader while fetching data
//     try {
//       const { data } = await axios.get(
//         `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
//           process.env.REACT_APP_API_KEY
//         }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
//       );
//       setContent(data.results);
//       setNumOfPages(data.total_pages);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false); // Hide loader after fetching
//     }
//   };

//   // Using custom debounce hook
//   const debouncedFetchSearch = useDebounce(fetchSearch, 2000);

//   useEffect(() => {
//     if (!searchText.trim()) {
//       setContent([]);
//       return;
//     }
//     setLoading(true);
//     debouncedFetchSearch();
//   }, [searchText, type, page]); // Run on dependencies change

//   return (
//     <>
//       <ThemeProvider theme={darkTheme}>
//         <div style={{ display: "flex", margin: "15px 0" }}>
//           <TextField
//             style={{ flex: 1 }}
//             className="searchBox"
//             label="Search"
//             variant="filled"
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//           <Button
//             variant="contained"
//             style={{ marginLeft: 10 }}
//             onClick={fetchSearch}
//           >
//             <SearchIcon />
//           </Button>
//         </div>
//         <Tabs
//           value={type}
//           indicatorColor="primary"
//           textColor="primary"
//           onChange={(event, newValue) => {
//             setType(newValue);
//             setPage(1);
//           }}
//           style={{ paddingBottom: 5 }}
//         >
//           <Tab style={{ width: "50%" }} label="Search Movies" />
//           <Tab style={{ width: "50%" }} label="Search TV Series" />
//         </Tabs>
//       </ThemeProvider>

//       <div className="trending">
//         {/* {loading
//           ? // Show 8 skeleton placeholders while loading
//             [...Array(8)].map((_, index) => (
//               <Box
//       sx={{
//         bgcolor: '#121212',
//         p: 8,
//         width: '100%',
//         display: 'flex',
//         // flexDirection: 'row',
//       }}
//     >
//       <Skeleton
//         animation="wave"
//         variant="rounded"
//         width={210}
//         height={270}
//       />
//     </Box>
//             ))
//           : 
//             content.map((c) => (
//               <Singlecontent
//                 key={c.id}
//                 id={c.id}
//                 poster={c.poster_path}
//                 title={c.title || c.name}
//                 date={c.release_date}
//                 media_type={type ? "tv" : "movie"}
//                 vote_average={c.vote_average}
//               />
//             ))} */}

//             {/* <Box
//       sx={{
//         bgcolor: '#121212',
//         p: 8,
//         width: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//       }}
//     >
//       <Skeleton
      
//         variant="rounded"
//         width={210}
//         height={270}
//       />
//     </Box>
//     <h1>HIII</h1> */}

//         {/* {searchText && !loading && content.length === 0 && <h2>No Results Found</h2>} */}
//       </div>

//       {numOfPages > 1 && <Custompagination setPage={setPage} />}
//     </>
//   );
// };

// export default Search;
