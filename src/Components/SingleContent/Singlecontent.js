import { Badge } from "@mui/material";
import { img_300, unavailable } from "../../config/config";
import "./singlecontent.css";
import ContentModal from "../Cotentmodel/ContentModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Singlecontent = ({ id, poster, title, name, date, media_type, vote_average }) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge
        badgeContent={(vote_average != 0) ? vote_average.toFixed(1) : 'Yet to release'}
        color={(vote_average < 6) ? "primary" : "secondary"}
      />
      
      <LazyLoadImage
        className="poster"
        alt={title}
        effect="blur"
        src={poster ? `${img_300}${poster}` : unavailable}
      />

      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </ContentModal>
  );
};

export default Singlecontent;
