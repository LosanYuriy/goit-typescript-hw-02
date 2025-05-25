import React from "react";
import s from "./ImageCard.module.css";
import { ImageType } from "../../ApiServise/apiServise";

type ImageCardProps = {
  image: ImageType;
  openModal: (src: string, alt: string) => void;
};

const ImageCard: React.FC<ImageCardProps> = ({ image, openModal }) => {
  const handleClick = () => {
    openModal(image.urls.regular, image.alt_description);
  };

  return (
    <div onClick={handleClick}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={s.card}
      />
    </div>
  );
};

export default ImageCard;
