
import type { Photo } from "../../types/photo";

import styles from "./PhotosGalleryItem.module.css";

interface PhotosGalleryItemPrps{
  photo: Photo;
  onOpenModal: (photo: Photo) => void;
}
export default function PhotosGalleryItem({
  photo,
  onOpenModal
}: PhotosGalleryItemPrps) {
  const handleClick = () => {
    onOpenModal(photo);
  };
  return (
    
      <div
        onClick={handleClick}
        className={styles.thumb}
        style={{
          backgroundColor: "avg_color",
          borderColor: "avg_color",
        }}
      >
        <img src={photo.src.large} alt={photo.alt} loading="lazy" className={styles.image} />
      </div>
 
  );
}
