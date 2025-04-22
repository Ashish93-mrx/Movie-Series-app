import { useRef } from "react";
import axios from "axios";

const searchFunction = async (searchText, type, page) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchText}&page=1&include_adult=false`
    );
    return [data.results, data.total_pages];
  } catch (error) {
    console.error(error);
    return [[], 0];
  }
};

const useDebounce = () => {
  const timeoutRef = useRef(null);

  const debounceFunction = (callback, delay = 2000) => {
    return (...args) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(async () => {
        const result = await searchFunction(...args);
        callback(result); 
      }, delay);
    };
  };

  return debounceFunction;
};

export default useDebounce;
