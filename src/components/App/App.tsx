import "./App.css";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { fetchImages } from "../../ApiServise/apiServise";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import type { ImageType } from "../../ApiServise/apiServise";

const App = () => {
  type ModalImage = {
    src: string;
    alt: string;
  };
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState<ImageType[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<ModalImage>({
    src: "",
    alt: "",
  });

  useEffect(() => {
    // const savedQuery = localStorage.getItem("query");
    // const savedPage = JSON.parse(
    //   localStorage.getItem("page") || 1
    // ) as number;
    // const savedImages = JSON.parse(
    //   localStorage.getItem("images") || []
    // ) as ImageType[];
    const savedQuery = localStorage.getItem("query");
    const savedPage = Number(localStorage.getItem("page")) || 1;
    const savedImages = JSON.parse(
      localStorage.getItem("images") || "[]"
    ) as ImageType[];

    if (savedQuery) {
      setQuery(savedQuery);
      setPage(savedPage);
      setImages(savedImages);
      fetchImages(savedQuery, savedPage).then(({ total_pages }) => {
        setCanLoadMore(savedPage < total_pages);
      });
    }
  }, []);

  const handleSearchSubmit = async (searchQuery: string): Promise<void> => {
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
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreImages = async (): Promise<void> => {
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
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };
  const clearGallery = () => {
    setImages([]);
  };
  const openModal = (src: string, alt: string): void => {
    setIsModalOpen(true);
    setModalImage({ src, alt });
  };

  const closeModal = (): void => {
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
