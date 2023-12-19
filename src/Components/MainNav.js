import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/movies');
        break;
      case 2:
        navigate('/series');
        break;
      case 3:
        navigate('/search');
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0, backgroundColor: '#2d313a', zIndex: 100 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction label="Trending" icon={<WhatshotOutlinedIcon />} />
        <BottomNavigationAction label="Movies" icon={<MovieCreationIcon />} />
        <BottomNavigationAction label="TV Series" icon={<LiveTvIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}
