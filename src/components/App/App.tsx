import { useState, useEffect } from "react";
import Form from "../Form/Form";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import Modal from "../Modal/Modal";
import Section from "../Section/Section";
import Container from "../Container/Container";
import type { Photo } from "../../types/photo";
import { getPhotos } from "../../services/photos";
import css from "./App.module.css";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

   useEffect(() => {
     if (showModal) {
       document.body.style.overflow = "hidden";
       const handleEscape = (e: KeyboardEvent) => {
         if (e.key === "Escape") {
           closeModal();
         }
       };
       window.addEventListener("keydown", handleEscape);
       return () => {
         window.removeEventListener("keydown", handleEscape);
       };
     } else {
       document.body.style.overflow = "auto";
     }
   }, [showModal]);

   useEffect(() => {
     if (query === "") return;

     async function fetchPhotos() {
       try {
         setIsLoading(true);
         setIsError(false);
         const fetchedPhotos = await getPhotos(query);
         setPhotos(fetchedPhotos);
       } catch{
         toast("There was an error fetching photos. Please try again.");
         setIsError(true);
         setPhotos([]);
       } finally {
         setIsLoading(false);
       }
     }

     fetchPhotos();
   }, [query]);

   const handleSearch = (newQuery: string) => {
     setQuery(newQuery);
   };

  const handleOpenModal = (photo: Photo) => {
     setShowModal(true);
     setSelectedPhoto(photo);
     
   };

   const closeModal = () => {
     setShowModal(false);
     setSelectedPhoto(null);
  };
 
  return (
    <>
      <Form onSubmit={handleSearch} />
      <Section>
        <Container>
          {isLoading && (
            <Loader />
            // <p className={css.text}>Loading movies, please wait...</p>
          )}
          {isError && (
            <p className={css.text}>There was an error, please try again...</p>
          )}
          {!isLoading && photos.length > 0 && (
            <PhotosGallery photos={photos} onOpenModal={handleOpenModal} />
          )}
          {!isLoading && photos.length === 0 && query !== "" && (
            <Text>No photos found for your query. Try something else!</Text>
          )}
          {showModal && selectedPhoto && (
            <Modal onClose={closeModal}>
              <img
                src={selectedPhoto.src.large}
                alt={selectedPhoto.alt}
                className="max-w-full max-h-[80vh] rounded-lg shadow-xl"
              />
            </Modal>
          )}
          {/* Компоненти застосунку */}
        </Container>
        Home page
      </Section>
      <Toaster />
    </>
  );
}
