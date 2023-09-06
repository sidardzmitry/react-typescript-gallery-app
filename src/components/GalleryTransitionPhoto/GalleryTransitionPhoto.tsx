import { FC, useRef, useMemo, useLayoutEffect, useState } from "react";
import { CommonClassProps, Photo } from "../../types/types";

import cl from "classnames";
import styles from "./GalleryTransitionPhoto.module.scss";

interface GalleryTransitionPhotoProps extends CommonClassProps {
  photos: Photo[];
  indexActivePhoto: number;
}

type RefT = React.MutableRefObject<HTMLDivElement | null>;

const getPhotoByRef = (ref: RefT, index: number): HTMLElement | null => (
  ref.current!.querySelector(`img:nth-of-type(${index + 1})`)
);

const hidePhoto = (element: HTMLElement | null) => {
  if(!element) {
    return;
  }

  element.dataset.active = 'false';

  if(element.previousSibling) {
    //@ts-ignore
    element.previousSibling.dataset.active = 'false';
  }

  if(element.nextSibling) {
    //@ts-ignore
    element.nextSibling.dataset.active = 'false';
  }
}

const showPhoto = (element: HTMLElement | null) => {
  if(!element) {
    return;
  }

  element.dataset.active = 'true';

  if(element.previousSibling) {
    //@ts-ignore
    element.previousSibling.dataset.active = 'prepared';
  }

  if(element.nextSibling) {
    //@ts-ignore
    element.nextSibling.dataset.active = 'prepared';
  }

}

export const GalleryTransitionPhoto: FC<GalleryTransitionPhotoProps> = ({
  photos,
  indexActivePhoto,
  className,
}: GalleryTransitionPhotoProps) => {

  const [prevActiveIndexPhoto, setActivePrevIndexPhoto] = useState(indexActivePhoto);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return
    }

    const activePhoto = getPhotoByRef(containerRef, prevActiveIndexPhoto);
    const nextActivePhoto = getPhotoByRef(containerRef, indexActivePhoto);


    if(prevActiveIndexPhoto !== indexActivePhoto) {
      hidePhoto(activePhoto);
      showPhoto(nextActivePhoto);
    } else {
      showPhoto(activePhoto)
    }

    setActivePrevIndexPhoto(indexActivePhoto);

  }, [indexActivePhoto])


  return useMemo(() => (
      <div
        className={cl(className, styles.galleryTransitionPhoto)}
        ref={containerRef}
      >
        {photos.map((photo, id) => (
          <img
            key={photo.id}
            className={styles.galleryTransitionPhotoImage}
            data-active={id === indexActivePhoto}
            src={photo.src}
            alt={photo.description}
            loading="lazy"
          />
        ))}
      </div>
      ),[]);
};
