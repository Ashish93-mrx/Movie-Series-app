import * as React from 'react';
// import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import Typography from '@mui/material/Typography';
// import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import "../SingleContent/Singlecontent";
import axios from 'axios';
import { useState,useEffect } from 'react';
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import "./Contentmodal.css";
import { Button } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Carousel from '../Carousel/Carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css";
import ReactPlayer from 'react-player/youtube';
import Backdrop from '@mui/material/Backdrop';



export default function ContentModal({children,media_type,id}) {
  const [open, setOpen] = React.useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content,setContent] = useState();
  const [video,setVideo] = useState();
  const theme = useTheme();

  // const handleOpen=()=> {

  // }

  const fetchData= async()=> {
      const {data} = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setContent(data);
  }

  const fetchVideo= async()=> {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
   //console.log(data);
    setVideo(data.results[0]?.key);

}

useEffect(()=>{
  fetchData();
  fetchVideo();
  // eslint-disable-next-line
},[])
  return (
    <>
      <div type="button" className="media" style={{ cursor: "pointer" }}
        color="inherit" onClick={handleOpen}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        //slots={{ backdrop: Backdrop }}
        sx={{ display: "flex",
        alignItems: "center",
        justifyContent: "center",}}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
         {content && <Box sx={{width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 5,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),}}>
            <div className='ContentModal'>
            <span style={{display: 'flex', flexDirection:'column', justifyContent:'center'}}>
              <LazyLoadImage 
              alt={content.name || content.title}
              
              className="ContentModal__portrait" src={content.poster_path?`${img_500}/${content.poster_path}`: unavailable} />
              </span>
              <img 
              alt={content.name || content.title}
              className="ContentModal__landscape"
              // effect="blur"
              src={content.backdrop_path?`${img_500}/${content.backdrop_path}`: unavailableLandscape} />
              <div className='ContentModal__about'>
                <span className='ContentModal__title'>
                    {content.name || content.title}(
                      {(
                        content.first_air_date || content.release_date || "-----"
                      ).substring(0,4)}
                    )
                </span>
                {
                  content.tagline && (
                    <i className='tagline'>{content.tagline}</i>
                  )}
                  <span className='ContentModal__description'>
                    {content.overview}
                  </span>
                  <div><Carousel media_type={media_type} id={id} /></div>
                  <Button
                    variant='contained'
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    onClick={() => setTrailerOpen(true)}
                  >
                    Watch the Trailer
                  </Button>
              </div>
            </div>
          </Box>
         }
        </Fade>
      </Modal>
      <Modal
        open={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            },
          },
        }}
      >
        <Fade in={trailerOpen}>
          <Box
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxWidth: '960px',
              aspectRatio: '16/9',
              bgcolor: 'black',
              zIndex: 2,
              borderRadius: 2,
              boxShadow: 24,
              outline: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${video}`}
              playing
              controls
              width="100%"
              height="100%"
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}



