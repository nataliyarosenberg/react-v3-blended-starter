import Grid from "../Grid/Grid";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";
import GridItem from "../GridItem/GridItem";
import type { Photo } from '../../types/photo';

interface PhotosGalleryProps {
  onOpenModal: (photo: Photo) => void;
  photos: Photo[];
}

export default function PhotosGallery({ photos, onOpenModal }: PhotosGalleryProps) {
 
   return (
     <>
       {photos.length > 0 && (
         <Grid>
           {photos.map((photo) => {
             return (
             <GridItem key={photo.id}>
               <PhotosGalleryItem photo={photo} onOpenModal={onOpenModal} />
             </GridItem>
           );
           })}
         </Grid>
       )}

     </>
   );
  }

