import { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
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
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0, zIndex: 100 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction sx={{ color:"#1976d2" }} label="Trending" icon={<WhatshotOutlinedIcon />} />
        <BottomNavigationAction sx={{ color:"#1976d2" }} label="Movies" icon={<MovieCreationIcon />} />
        <BottomNavigationAction sx={{ color:"#1976d2" }} label="TV Series" icon={<LiveTvIcon />} />
        <BottomNavigationAction sx={{ color:"#1976d2" }} label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}

