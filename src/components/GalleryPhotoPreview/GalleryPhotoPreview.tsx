import { FC, useEffect, useMemo, useRef } from "react";

import cl from "classnames";
import styles from "./GalleryPhotoPreview.module.scss";
import { CommonClassProps, Photo } from "../../types/types";

interface GalleryPhotoPreviewProps extends CommonClassProps {
  activePhotoIndex: number;
  photos: Photo[];
  setNewPhoto: (id: number) => void;
}

export const GalleryPhotoPreview: FC<GalleryPhotoPreviewProps> = ({
  activePhotoIndex,
  photos,
  className,
  setNewPhoto,
}: GalleryPhotoPreviewProps) => {
  const previewRefContainer = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!previewRefContainer.current) {
      return;
    }

    previewRefContainer.current.style.transform = `translate3d(-${
      activePhotoIndex * 164
    }px, 0, 0)`;
  }, [activePhotoIndex]);

  return (
    <div className={cl(styles.galleryPhotoPreview, className)}>
      {useMemo(() => (
          <ul
            className={styles.galleryPhotoPreviewList}
            ref={previewRefContainer}
          >
            {photos.map((photo, id) => (
              <li key={photo.id} className={styles.galleryPhotoPreviewItem}>
                <button className={styles.galleryPhotoPreviewBtn} onClick={() => setNewPhoto(id)}>
                <img
                  src={photo.preview}
                  alt={photo.description}
                  className={styles.galleryPhotoPreviewImage}
                />
                </button>
              </li>
            ))}
          </ul>
        ),[])}

      <div className={styles.galleryPhotoPreviewCover}>
        {activePhotoIndex + 1} / {photos.length}
      </div>
    </div>
  );
};
