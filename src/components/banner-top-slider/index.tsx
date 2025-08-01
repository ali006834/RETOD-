import React, { useRef, useState, useMemo } from "react";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";
import { BannerTopSliderProps } from "../__generated__/types";
import { Image, Link } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import NextIcon from "src/components/svg/next";
import PrevIcon from "src/components/svg/prev";
import "swiper/css";
import "swiper/css/navigation";

type MediaItem = {
  type: "image" | "video";
  priorityOrder: number;
  data: any;
  isMobile?: boolean;
};

const BannerTop = (props: BannerTopSliderProps) => {
  const { imageList, imageListMobile, videoList, videoListMobile } = props;
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const { isMobile } = useScreen();
  const [progress, setProgress] = useState(0);

  // Tüm medya öğelerini birleştir ve sıralama işlemi..
  const allMediaItems = useMemo(() => {
    const items: MediaItem[] = [];

    // Video listelerini ekle
    const videos = isMobile ? videoListMobile : videoList;
    if (Array.isArray(videos)) {
      videos.forEach((video) => {
        if (video) {
          let priority = 99;
          if (
            typeof video.priorityOrder === "string" &&
            !isNaN(Number(video.priorityOrder))
          ) {
            priority = Number(video.priorityOrder);
          } else if (typeof video.priorityOrder === "number") {
            priority = video.priorityOrder;
          }
          items.push({
            type: "video",
            priorityOrder: priority,
            data: video,
          });
        }
      });
    }

    // Resim listelerini ekle
    const images = isMobile ? imageListMobile : imageList;
    if (Array.isArray(images)) {
      images.forEach((image) => {
        if (image) {
          let priority = 99;
          if (
            typeof image.priorityOrder === "string" &&
            !isNaN(Number(image.priorityOrder))
          ) {
            priority = Number(image.priorityOrder);
          } else if (typeof image.priorityOrder === "number") {
            priority = image.priorityOrder;
          }
          items.push({
            type: "image",
            priorityOrder: priority,
            data: image,
          });
        }
      });
    }

    return items;
  }, [isMobile, imageList, imageListMobile, videoList, videoListMobile]);

  // Öncelik sırasına göre sırala
  const sortedMedia = useMemo(() => {
    return [...allMediaItems].sort(
      (a, b) => a?.priorityOrder - b?.priorityOrder
    );
  }, [allMediaItems]);

  // Eğer hiçbir içerik yoksa null dön
  if (sortedMedia.length === 0) {
    return null;
  }

  return (
    <div className={styles.bannerContainer}>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper: SwiperClass) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
        onSlideChange={(swiper: SwiperClass) => {
          setProgress((swiper.realIndex + 1) / swiper.slides.length);
        }}
        onInit={(swiper: SwiperClass) => {
          setProgress((swiper.realIndex + 1) / swiper.slides.length);
        }}
        loop={true}
        className={styles.swiperContainer}
      >
        {sortedMedia.map((item, index) => {
          if (item.type === "video") {
            return (
              <SwiperSlide key={`video-${index}`} className={styles.slide}>
                <Link href={item.data?.videoLink?.href || "/"}>
                  <div className={styles.videoContainer}>
                    <video
                      className={styles.video}
                      src={item.data?.videoCDT?.videoSrc || ""}
                      autoPlay={item.data?.videoCDT?.autoplay || false}
                      loop={item.data?.videoCDT?.loop || false}
                      muted={item.data?.videoCDT?.muted || false}
                      controls={item.data?.videoCDT?.controls || false}
                      playsInline
                    ></video>

                    {/* Text overlay - sol alt */}
                    {(item.data?.titleCDT ||
                      item.data?.contentCDT ||
                      item.data?.btnTextCDT) && (
                      <div className={styles.textOverlay}>
                        {item.data?.titleCDT && (
                          <h2 className={styles.title}>{item.data.titleCDT}</h2>
                        )}
                        {item.data?.contentCDT && (
                          <p className={styles.content}>
                            {item.data.contentCDT}
                          </p>
                        )}
                        {item.data?.btnTextCDT && (
                          <span className={styles.btnText}>
                            {item.data.btnTextCDT}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              </SwiperSlide>
            );
          } else {
            return (
              <SwiperSlide
                key={item.data?.imageLink?.href || index}
                className={styles.slide}
              >
                <Link href={item.data?.imageLink?.href || "/"}>
                  {item.data?.imageCDT ? (
                    <div className={styles.imageWrapper}>
                      <Image
                        className={styles.image}
                        image={item.data?.imageCDT}
                        alt={item.data?.imageCDT?.altText || ""}
                        useBlur={true}
                        objectFit="contain"
                        layout="fill"
                      />

                      {/* Text overlay - sol alt */}
                      {(item.data?.titleCDT ||
                        item.data?.contentCDT ||
                        item.data?.btnTextCDT) && (
                        <div className={styles.textOverlay}>
                          {item.data?.titleCDT && (
                            <h2 className={styles.title}>
                              {item.data.titleCDT}
                            </h2>
                          )}
                          {item.data?.contentCDT && (
                            <p className={styles.content}>
                              {item.data.contentCDT}
                            </p>
                          )}
                          {item.data?.btnTextCDT && (
                            <span className={styles.btnText}>
                              {item.data.btnTextCDT}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={styles.placeholder}>No Image</div>
                  )}
                </Link>
              </SwiperSlide>
            );
          }
        })}

        {/* Oklar */}
        <div ref={navigationPrevRef} className={styles.navigationPrev}>
          <PrevIcon />
        </div>
        <div ref={navigationNextRef} className={styles.navigationNext}>
          <NextIcon />
        </div>
      </Swiper>

      {/* Scrollbar - Kaydırma çubuğu  */}
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};

export default observer(BannerTop);
