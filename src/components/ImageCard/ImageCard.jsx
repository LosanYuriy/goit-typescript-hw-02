import s from "./ImageCard.module.css";
const ImageCard = ({ image, openModal }) => {
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
