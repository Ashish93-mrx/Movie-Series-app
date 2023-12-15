import * as React from 'react';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useEffect } from 'react';
//import { makeStyles } from '@mui/material';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom";

// const useStyles = makeStyles({
//     root: {
//         width: 500,
//         position:"fixed",
//         bottom:0,
//         backgroundColor: "#2d313a",
//         zIndex:100,
//     },
// });

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const history=useNavigate()

  useEffect(() => {
    if (value === 0) {
      history("/");
    } else if (value === 1) {
      history("/movies");
    } else if (value === 2) {
      history("/series");
    } else if (value === 3) {
      history("/search");
    }
  }, [value, history]);

  return (
    <Box sx={{ width: 1000 }} style={{
        width: "100%",
        position:"fixed",
        bottom:0,
        backgroundColor: "#2d313a",
        zIndex:100,
    }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        // showLabels
        // className={ClassNames.root}
      >
        <BottomNavigationAction label="Trending" icon={<WhatshotOutlinedIcon />} />
        <BottomNavigationAction label="Movies" icon={<MovieCreationIcon />} />
        <BottomNavigationAction label="TV Series" icon={< LiveTvIcon/>} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}