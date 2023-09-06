import { FC, useState } from "react";
import { Photo } from "../../types/types";

import styles from "./GalleryArt.module.scss";

import { GalleryPhotoPreview } from "../GalleryPhotoPreview";
import { GalleryTransitionPhoto } from "../GalleryTransitionPhoto";
import { GalleryNavigation } from "../GalleryNavigation";

interface GalleryArtProps {
  photos: Photo[];
}

export const GalleryArt: FC<GalleryArtProps> = ({
  photos,
}: GalleryArtProps) => {

  const [indexActivePhoto, setIndexActivePhoto] = useState(0);

  const prevPhoto = photos[indexActivePhoto - 1];
  const nextPhoto = photos[indexActivePhoto + 1];

  if (!photos.length) {
    return null;
  }

  return (
    <div className={styles.galleryArt}>
      <div className={styles.galleryArtContainer}>
        <GalleryTransitionPhoto
          photos={photos}
          indexActivePhoto={indexActivePhoto}
          className={styles.galleryArtMainPhoto}
        />
        <GalleryNavigation
          className={styles.galleryArtNavigation}
          disabledPrev={!prevPhoto}
          disabledNext={!nextPhoto}
          onPrevClick={() => {
            setIndexActivePhoto(indexActivePhoto - 1);
          }}
          onNextClick={() => {
            setIndexActivePhoto(indexActivePhoto + 1);
          }}
        />
      </div>

      <GalleryPhotoPreview
        activePhotoIndex={indexActivePhoto}
        photos={photos}
        className={styles.galleryArtPreview}
        setNewPhoto={setIndexActivePhoto}
      />

    </div>
  );
};
