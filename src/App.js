import Header from './Components/Header';
import "./App.css";
import SimpleBottomNavigation from './Components/MainNav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import { Routes,Route } from '@mui/icons-material';
import { Container } from '@mui/material';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import Search from './Pages/Search/Search';

function App() {
  return (

    <BrowserRouter>
      <>
        <Header />
        <div className="app">
          <Container>
            <Routes>
              <Route path="/" element={<Trending />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </Container>
        </div>
        <SimpleBottomNavigation style={{ position: 'fixed' }} />
      </>
    </BrowserRouter>
  );
}

export default App;