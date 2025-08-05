import React from "react";
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
                  <video
                    autoPlay={banner_right?.autoplay || true}
                    muted={banner_right?.muted || true}
                    loop={banner_right?.loop || true}
                    playsInline
                    className={styles.bannerVideo}
                  >
                    <source
                      src={banner_right?.videoSrc || ""}
                      type="video/mp4"
                    />
                  </video>
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
            <video
              autoPlay={banner_right?.autoplay || true}
              muted={banner_right?.muted || true}
              loop={banner_right?.loop || true}
              playsInline
              className={styles.bannerVideo}
            >
              <source src={banner_right?.videoSrc || ""} type="video/mp4" />
            </video>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default observer(BannerDuo);
