import React, { useState, useRef } from "react";
import { ProductDetailProps } from "src/components/__generated__/types";
import { observer } from "mobx-react-lite";
import { Image } from "@ikas/storefront";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/thumbs";
import { Thumbs, FreeMode } from "swiper/modules";
import styles from "./style.module.css";
import ImagePopUp from "./imagePopUp";
import { FavoriteButton } from "../detail/favorite-button";
import NextIcon from "src/components/svg/next";
import PrevIcon from "src/components/svg/prev";
import { useScreen } from "src/utils/hooks/useScreen";

const ProfessionalSlider = (props: ProductDetailProps) => {
  const { product } = props;
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [showImagePopUp, setShowImagePopUp] = useState(false);
  const [activeImageId, setActiveImageId] = useState("");
  const mainSwiperRef = useRef<any>(null);
  const { isMobile, isTablet } = useScreen();

  const handleImageClick = (imageId: string) => {
    setActiveImageId(imageId);
    setShowImagePopUp(true);
  };

  const handleNext = () => {
    mainSwiperRef.current?.swiper.slideNext();
  };

  const handlePrev = () => {
    mainSwiperRef.current?.swiper.slidePrev();
  };

  return (
    <div className={styles.slider_wrapper}>
      {/* Thumbnail Slider */}
      <div className={styles.thumbnail_container}>
        <Swiper
          onSwiper={setThumbsSwiper}
          direction={isMobile || isTablet ? "horizontal" : "vertical"}
          spaceBetween={10}
          slidesPerView={isMobile ? 3 : isTablet ? 4 : 4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className={styles.thumbs_swiper}
        >
          {product?.selectedVariant.images?.map((image, index) => (
            <SwiperSlide key={index} className={styles.thumbnail_slide}>
              <div
                className={`${styles.thumbnail} ${
                  activeImageId === image.imageId ? styles.active_thumbnail : ""
                }`}
                onClick={() => {
                  setActiveImageId(image.imageId ?? "");
                  mainSwiperRef.current?.swiper.slideTo(index);
                }}
              >
                <Image
                  image={image.image!}
                  width={80}
                  height={100}
                  objectFit="cover"
                  alt={`Thumbnail ${index + 1}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Image Slider */}
      <div className={styles.main_slider_container}>
        <Swiper
          ref={mainSwiperRef}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Thumbs]}
          className={styles.main_swiper}
          onSlideChange={(swiper: SwiperClass) => {
            const activeImage =
              product?.selectedVariant.images?.[swiper.activeIndex];
            setActiveImageId(activeImage?.imageId || "");
          }}
        >
          {product?.selectedVariant.images?.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => handleImageClick(image.imageId ?? "")}
                style={{ cursor: "zoom-in" }}
                className={styles.imageArea}
              >
                <Image
                  useBlur
                  image={image.image!}
                  width={1200}
                  height={1550}
                  objectFit="cover"
                  alt="image"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}

        <button className={styles.nav_button_prev} onClick={handlePrev}>
          {isMobile || isTablet ? (
            <PrevIcon height="30px" width="30px" />
          ) : (
            <PrevIcon height="50px" width="50px" />
          )}
        </button>

        <button className={styles.nav_button_next} onClick={handleNext}>
          {isMobile || isTablet ? (
            <NextIcon height="30px" width="30px" />
          ) : (
            <NextIcon height="50px" width="50px" />
          )}
        </button>

        <div className={styles.favorite}>
          <FavoriteButton {...props} />
        </div>
      </div>

      {/* ImagePopUp */}
      {showImagePopUp && (
        <ImagePopUp
          showImagePopUp={showImagePopUp}
          setShowImagePopUp={setShowImagePopUp}
          imageId={activeImageId}
          props={props}
        />
      )}
    </div>
  );
};

export default observer(ProfessionalSlider);
