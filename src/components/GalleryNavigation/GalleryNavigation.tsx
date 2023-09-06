import { FC } from "react";
import { CommonClassProps } from "../../types/types";

import cl from "classnames";
import styles from "./GalleryNavigation.module.scss";

import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from 'react-icons/md';

interface GalleryNavigationProps extends CommonClassProps {
  disabledPrev?: boolean;
  disabledNext?: boolean;
  onPrevClick: () => void;
  onNextClick: () => void;
}

export const GalleryNavigation: FC<GalleryNavigationProps> = ({
  disabledPrev,
  disabledNext,
  onPrevClick,
  onNextClick,
  className,
}: GalleryNavigationProps) => {

  return (
    <div className={cl(className, styles.galleryNavigation)}>

      <button
        disabled={disabledPrev}
        className={cl(
          styles.galleryNavigationBtn,
          styles.galleryNavigationBtnLeft
        )}
        onClick={onPrevClick}
      >
        <MdOutlineKeyboardArrowLeft />
      </button>

      <button
        disabled={disabledNext}
        className={cl(
          styles.galleryNavigationBtn,
          styles.galleryNavigationBtnRight
        )}
        onClick={onNextClick}
      >
        <MdOutlineKeyboardArrowRight />
      </button>
      
    </div>
  );
};
