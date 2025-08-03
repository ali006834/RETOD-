import React, { useState } from "react";
import { ProductDetailProps } from "src/components/__generated__/types";
import { observer } from "mobx-react-lite";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import styles from "./style.module.css";
import ImagePopUp from "./imagePopUp";
import { Image } from "@ikas/storefront";
import { FavoriteButton } from "../detail/favorite-button";

const Slider = (props: ProductDetailProps) => {
  const { product } = props;

  if (!product?.selectedVariant?.images) {
    return null;
  }

  const [showImagePopUp, setShowImagePopUp] = useState(false);
  const [imageId, setImageId] = useState<any>("");

  return (
    <div className={styles.slider_wrapper}>
      <div className="product_swiper">
        <div className={styles.web_image}>
          {product?.selectedVariant.images?.map((image, index) => {
            return (
              <div key={index}>
                <div
                  onClick={() => {
                    setImageId(image.imageId);
                    setShowImagePopUp(!showImagePopUp);
                  }}
                  className={styles.image_wrapper}
                >
                  <img
                    src={image.image?.src}
                    alt={image.image?.altText || ""}
                  />
                </div>
              </div>
            );
          })}
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
            {product?.selectedVariant.images?.map((image, index) => {
              return (
                <SwiperSlide key={index}>
                  <div
                    onClick={() => {
                      setImageId(image.imageId);
                      setShowImagePopUp(!showImagePopUp);
                    }}
                    className={styles.image_wrapper}
                  >
                    <img
                      src={image.image?.src}
                      alt={image.image?.altText || ""}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className={styles.favorite}>
          <FavoriteButton {...props} />
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
