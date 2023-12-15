import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
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



export default function ContentModal({children,media_type,id}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content,setContent] = useState();
  const [video,setVideo] = useState();
  const theme = useTheme();

  // const handleOpen=()=> {

  // }

  const fetchData= async()=> {
      const {data} = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=3d7a497b0cb06b8d7ce3562c6d4d1496&language=en-US`
      );
      setContent(data);
  }

  const fetchVideo= async()=> {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=3d7a497b0cb06b8d7ce3562c6d4d1496&language=en-US`
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
        // slotProps={{
        //   backdrop: {
        //     timeout: 500,
        //   },
        // }}
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
              <img 
              alt={content.name || content.title}
              className="ContentModal__portrait" src={content.poster_path?`${img_500}/${content.poster_path}`: unavailable} />
              <img 
              alt={content.name || content.title}
              className="ContentModal__landscape" src={content.backdrop_path?`${img_500}/${content.backdrop_path}`: unavailable} />
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
                  startIcon={<YouTubeIcon/>}
                  color="secondary"
                  target="__blank"
                  href={`https://www.youtube.com/watch?v=${video}`}
                  >
                  Watch the Trailer
                  </Button>
              </div>
            </div>
          </Box>
         }
        </Fade>
      </Modal>
    </>
  );
}



