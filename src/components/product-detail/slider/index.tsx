import React, { useState, useEffect } from "react";
import { ProductDetailProps } from "src/components/__generated__/types";
import { observer } from "mobx-react-lite";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import styles from "./style.module.css";
import ImagePopUp from "./imagePopUp";
import { Image } from "@ikas/storefront";

const Slider = (props: ProductDetailProps) => {
  const { product, isWidthVideo } = props;

  if (!product?.selectedVariant?.images) {
    return null;
  }

  // Tüm görselleri al
  const allImages = product.selectedVariant?.images ?? [];

  // isWidthVideo true ise hem video hem fotoğraf, değilse sadece fotoğraflar
  const displayImages = isWidthVideo
    ? allImages
    : allImages.filter((item) => !item.image?.isVideo);

  const [showImagePopUp, setShowImagePopUp] = useState(false);
  const [imageId, setImageId] = useState<any>("");
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 1200);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const imageElements = displayImages
      ?.map((_, index) => document.getElementById(`main-image-${index}`))
      .filter(Boolean);

    if (!imageElements?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.id.split("-")[2]);
            setActiveImageIndex(index);
          }
        });
      },
      {
        root: null, // Viewport'u kullan
        threshold: 0.5,
      }
    );

    imageElements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      imageElements.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, [displayImages, styles.main_images]);

  const scrollToImage = (index: number) => {
    const imageElement = document.getElementById(`main-image-${index}`);
    if (imageElement) {
      imageElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setActiveImageIndex(index);
    }
  };

  return (
    <div className={styles.slider_wrapper}>
      <div className="product_swiper">
        <div className={styles.web_image}>
          <div className={styles.gallery_container}>
            {/* Ana fotoğraflar - Alt alta dizili */}
            <div className={styles.main_images}>
              {displayImages?.map((image, index) => {
                return (
                  <div
                    key={index}
                    id={`main-image-${index}`}
                    className={styles.main_image_item}
                  >
                    <div
                      onClick={() => {
                        setImageId(image.imageId);
                        setShowImagePopUp(!showImagePopUp);
                      }}
                      className={styles.image_wrapper}
                    >
                      {image.image?.isVideo ? (
                        <video
                          playsInline
                          autoPlay
                          loop
                          muted
                          controls={false}
                          src={image.image.src}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <img
                          src={image.image?.src}
                          alt={image.image?.altText || ""}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Thumbnail Swiper - Sağ tarafta */}
            <div className={styles.thumbs_swiper}>
              <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                direction={isSmallScreen ? "horizontal" : "vertical"}
                slidesPerView={isSmallScreen ? "auto" : 4}
                spaceBetween={10}
                watchSlidesProgress={true}
                freeMode={false}
                grabCursor={false}
                allowTouchMove={true}
                className="thumbs-swiper"
              >
                {displayImages?.map((image, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div
                        className={`${styles.thumb_wrapper} ${
                          activeImageIndex === index ? styles.active_thumb : ""
                        }`}
                        onClick={() => scrollToImage(index)}
                      >
                        {image.image?.isVideo ? (
                          <video
                            playsInline
                            autoPlay
                            loop
                            muted
                            controls={false}
                            src={image.image.src}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <img
                            src={image.image?.src}
                            alt={image.image?.altText || ""}
                          />
                        )}
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>

        {/* mobile */}
        <div className={styles.mobile_image}>
          <Swiper
            modules={[Navigation]}
            loop={true}
            className="mySwiper"
            navigation={true}
            slidesPerView={2}
            spaceBetween={1}
            breakpoints={{
              140: {
                slidesPerView: 1,
                spaceBetween: 1,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 1,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 1,
              },
            }}
          >
            {displayImages?.map((image, index) => {
              return (
                <SwiperSlide key={index}>
                  <div
                    onClick={() => {
                      setImageId(image.imageId);
                      setShowImagePopUp(!showImagePopUp);
                    }}
                    className={styles.image_wrapper}
                  >
                    {image.image?.isVideo ? (
                      <video
                        playsInline
                        autoPlay
                        loop
                        muted
                        controls={false}
                        src={image.image.src}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={image.image?.src}
                        alt={image.image?.altText || ""}
                      />
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="pop-swiper-container">
          {showImagePopUp && (
            <ImagePopUp
              showImagePopUp={showImagePopUp}
              setShowImagePopUp={setShowImagePopUp}
              imageId={imageId}
              props={props}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default observer(Slider);
