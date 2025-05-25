import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";
import React from "react";
import { ImageType } from "../../ApiServise/apiServise";
type ImageGalleryType = {
  images: ImageType[];
  openModal: (url: string, alt: string) => void;
};
const ImageGallery: React.FC<ImageGalleryType> = ({ images, openModal }) => {
  return (
    <ul className={s.list}>
      {images.map((image: ImageType) => (
        <li className={s.item} key={image.id}>
          <ImageCard image={image} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
