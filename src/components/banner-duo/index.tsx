import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";
import { BannerDuoProps } from "../__generated__/types";
import { Image, Link } from "@ikas/storefront";
import { Swiper, SwiperSlide } from "swiper/react";
import { useScreen } from "src/utils/hooks/useScreen";
import "swiper/css";

const BannerDuo = (props: BannerDuoProps) => {
  const { banner_left, banner_left_link, banner_right, banner_right_link } =
    props;
  const { isMobile } = useScreen();
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Video yükleme durumunu güncelle
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  // Sol fotoğraf ve sağ video kontrolü
  if (!banner_left || !banner_right) {
    return null;
  }

  // Mobil için Swiper slider
  if (isMobile) {
    return (
      <div className={styles.wrapper}>
        <Swiper
          slidesPerView={1.1} //
          spaceBetween={1} //
          className={styles.swiperContainer}
        >
          {/* Sol Fotoğraf */}
          <SwiperSlide>
            <div className={styles.slideSection}>
              <Link href={banner_left_link?.href || ""}>
                <a>
                  <Image
                    image={banner_left}
                    className={styles.bannerImage}
                    alt="Banner Left"
                    layout="fill"
                  />
                </a>
              </Link>
            </div>
          </SwiperSlide>

          {/* Sağ Video */}
          <SwiperSlide>
            <div className={styles.slideSection}>
              <Link href={banner_right_link?.href || ""}>
                <a>
                  <div className={styles.videoContainer}>
                    {/* Thumbnail - İlk başta göster */}
                    {!videoLoaded && banner_right?.thumbnailImage && (
                      <div className={styles.thumbnailContainer}>
                        <Image
                          className={styles.thumbnailImage}
                          image={banner_right.thumbnailImage}
                          alt={
                            banner_right.thumbnailImage?.altText ||
                            "Video thumbnail"
                          }
                          useBlur={true}
                          objectFit="contain"
                          layout="fill"
                        />
                        {/* Play button overlay */}
                        <div className={styles.playButton}>
                          <svg
                            width="60"
                            height="60"
                            viewBox="0 0 60 60"
                            fill="none"
                          >
                            <circle
                              cx="30"
                              cy="30"
                              r="30"
                              fill="rgba(0,0,0,0.5)"
                            />
                            <path d="M25 20L40 30L25 40V20Z" fill="white" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Video - Yüklendikten sonra göster */}
                    <video
                      className={`${styles.bannerVideo} ${
                        videoLoaded ? styles.videoVisible : styles.videoHidden
                      }`}
                      autoPlay={banner_right?.autoplay || true}
                      muted={banner_right?.muted || true}
                      loop={banner_right?.loop || true}
                      playsInline
                      onLoadedData={handleVideoLoaded}
                      onCanPlay={handleVideoLoaded}
                    >
                      <source
                        src={banner_right?.videoSrc || ""}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </a>
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    );
  }

  // Desktop için mevcut yapı
  return (
    <div className={styles.wrapper}>
      {/* Sol Fotoğraf - 50% */}
      <div className={styles.leftSection}>
        <Link href={banner_left_link?.href || ""}>
          <a>
            <Image
              image={banner_left}
              className={styles.bannerImage}
              alt="Banner Left"
              layout="fill"
            />
          </a>
        </Link>
      </div>

      {/* Sağ Video - 50% */}
      <div className={styles.rightSection}>
        <Link href={banner_right_link?.href || ""}>
          <a>
            <div className={styles.videoContainer}>
              {/* Thumbnail - İlk başta göster */}
              {!videoLoaded && banner_right?.thumbnailImage && (
                <div className={styles.thumbnailContainer}>
                  <Image
                    className={styles.thumbnailImage}
                    image={banner_right.thumbnailImage}
                    alt={
                      banner_right.thumbnailImage?.altText || "Video thumbnail"
                    }
                    useBlur={true}
                    objectFit="contain"
                    layout="fill"
                  />
                  {/* Play button overlay */}
                  <div className={styles.playButton}>
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                      <circle cx="30" cy="30" r="30" fill="rgba(0,0,0,0.5)" />
                      <path d="M25 20L40 30L25 40V20Z" fill="white" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Video - Yüklendikten sonra göster */}
              <video
                className={`${styles.bannerVideo} ${
                  videoLoaded ? styles.videoVisible : styles.videoHidden
                }`}
                autoPlay={banner_right?.autoplay || true}
                muted={banner_right?.muted || true}
                loop={banner_right?.loop || true}
                playsInline
                onLoadedData={handleVideoLoaded}
                onCanPlay={handleVideoLoaded}
              >
                <source src={banner_right?.videoSrc || ""} type="video/mp4" />
              </video>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default observer(BannerDuo);
