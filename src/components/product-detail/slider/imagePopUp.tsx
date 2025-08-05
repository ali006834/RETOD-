import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";

import { ProductDetailProps } from "src/components/__generated__/types";
import CloseSvg from "src/components/svg/close";
import styles from "./style.module.css";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Zoom, Navigation, Pagination, Mousewheel } from "swiper/modules";
import { Image } from "@ikas/storefront";

type ActiveImageIdType = string | null;

function useActiveImage() {
  const [id, set] = useState<ActiveImageIdType>(null);
  return { id, set };
}

const ImagePopUp = ({
  showImagePopUp,
  setShowImagePopUp,
  props,
  imageId,
}: {
  showImagePopUp: boolean;
  setShowImagePopUp: (showImagePopUp: boolean) => void;
  props: ProductDetailProps;
  imageId: any;
}) => {
  const activeImage = useActiveImage();

  const activeIndex = props?.product?.selectedVariant?.images?.findIndex(
    (image) => image.imageId === imageId
  );

  useEffect(() => {
    if (showImagePopUp) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [showImagePopUp]);

  useEffect(() => {
    const mainImageId = imageId;
    mainImageId && activeImage.set(mainImageId);
  }, [props?.product?.selectedVariant]);

  const swiperRef = useRef(null) as any;

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (!swiperInstance) return;

    let currentScale = swiperInstance.zoom.scale; // Geçerli zoom ölçeği

    if (swiperInstance) {
      swiperInstance.zoom.enable(); // Zoom'u etkinleştirme

      const handleMousewheelZoom = (event: any) => {
        if (swiperInstance.el && event.deltaY) {
          if (event.deltaY < 0) {
            swiperInstance.zoom.in();
            if (event.target.tagName === "IMG") {
              currentScale++;

              const scaleValue = `scale(${currentScale})`;

              const transformStyle = `translate3d(0, 0, 0) ${scaleValue}`;

              event.target.style.transform = `${transformStyle}`;
            }
          } else {
            swiperInstance.zoom.out();
            currentScale = 1;
            event.target.style.transform = `translate3d(0, 0, 0) scale(1)`;
          }
        }
      };

      const preventDrag = (event: any) => {
        event.preventDefault(); // Varsayılan sürükleme davranışını engelleme
      };

      swiperInstance.el?.addEventListener("wheel", handleMousewheelZoom);
      swiperInstance.el?.addEventListener("mousedown", preventDrag); // Sürüklemeyi engelleme
      swiperInstance.el?.addEventListener("dragstart", preventDrag); // Sürüklemeyi engelleme

      return () => {
        if (swiperInstance && swiperInstance.el) {
          swiperInstance.el.removeEventListener("wheel", handleMousewheelZoom);
          swiperInstance.el.removeEventListener("mousedown", preventDrag);
          swiperInstance.el.removeEventListener("dragstart", preventDrag);
        }
        if (swiperInstance.zoom) {
          swiperInstance.zoom.disable(); // Zoom'u devre dışı bırak
        }
      };
    }
  }, []);

  return (
    <div className={styles.popup_container}>
      <div className={styles.close} onClick={() => setShowImagePopUp(false)}>
        <CloseSvg />
      </div>

      <div className={styles.image_pop}>
        <Swiper
          zoom={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Zoom, Navigation, Pagination]}
          className="mySwiper"
          initialSlide={activeIndex}
          loop={true}
          ref={swiperRef}
        >
          {props?.product?.selectedVariant?.images?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="swiper-zoom-container">
                  <div className={styles.image_figure}>
                    {item.isVideo == true ? (
                      <div
                        style={{
                          aspectRatio: "1080 / 1920",
                          height: "90%",
                          overflow: "hidden",
                        }}
                      >
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            margin: "auto",
                          }}
                        >
                          <source src={item.image?.src} type="video/mp4" />
                        </video>
                      </div>
                    ) : (
                      <div
                        style={{
                          aspectRatio: "1080 / 1620",
                          height: "90%",
                          objectFit: "contain",
                          overflow: "hidden",
                          margin: "auto",
                        }}
                      >
                        <Image
                          width={1080}
                          height={1620}
                          layout="responsive"
                          objectFit="cover"
                          useBlur={true}
                          image={item.image as any}
                          alt={
                            props?.product?.selectedVariant?.product?.name ||
                            "Product image"
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default observer(ImagePopUp);
