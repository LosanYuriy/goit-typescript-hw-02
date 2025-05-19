import "./App.css";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { fetchImages } from "./ApiServise/apiServise";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState({
    src: "",
    alt: "",
  });

  useEffect(() => {
    const savedQuery = localStorage.getItem("query");
    const savedPage = JSON.parse(localStorage.getItem("page")) || 1;
    const savedImages = JSON.parse(localStorage.getItem("images")) || [];

    if (savedQuery) {
      setQuery(savedQuery);
      setPage(savedPage);
      setImages(savedImages);
      fetchImages(savedQuery, savedPage).then(({ total_pages }) => {
        setCanLoadMore(savedPage < total_pages);
      });
    }
  }, []);

  const handleSearchSubmit = async (searchQuery) => {
    setImages([]);
    setQuery(searchQuery);
    setError(null);
    setPage(1);
    setIsEmpty(false);
    setCanLoadMore(false);
    setIsLoading(true);

    try {
      const { images: newImages, total_pages } = await fetchImages(
        searchQuery,
        1
      );
      if (!newImages.length) {
        setIsEmpty(true);
        return;
      }
      setImages(newImages);
      setCanLoadMore(1 < total_pages);
      localStorage.setItem("query", searchQuery);
      localStorage.setItem("page", JSON.stringify(1));
      localStorage.setItem("images", JSON.stringify(newImages));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreImages = async () => {
    const nextPage = page + 1;
    setIsLoading(true);

    try {
      const { images: newImages, total_pages } = await fetchImages(
        query,
        nextPage
      );
      if (!newImages.length) {
        setIsEmpty(true);
        return;
      }
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      setPage(nextPage);
      setCanLoadMore(nextPage < total_pages);
      localStorage.setItem("page", JSON.stringify(nextPage));
      localStorage.setItem("images", JSON.stringify(updatedImages));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const clearGallery = () => {
    setImages([]);
  };
  const openModal = (src, alt) => {
    setIsModalOpen(true);
    setModalImage({ src, alt });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage({ src: "", alt: "" });
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Toaster />
      {!error && !isEmpty && !images.length && (
        <ErrorMessage message="Start your search for images!" />
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage message="Oops! Something went wrong." />}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isEmpty && (
        <ErrorMessage message="No images found for your search query." />
      )}
      {canLoadMore && images.length > 0 && !isLoading && (
        <LoadMoreBtn
          onClick={loadMoreImages}
          disabled={isLoading}
          onClear={clearGallery}
        />
      )}
      <ImageModal
        isOpen={isModalOpen}
        src={modalImage.src}
        alt={modalImage.alt}
        onClose={closeModal}
      />
    </>
  );
};
export default App;
