import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";
import { BannerDuoProps } from "../__generated__/types";
import { Image, Link } from "@ikas/storefront";

const BannerDuo = (props: BannerDuoProps) => {
  const { banner_left, banner_left_link, banner_right, banner_right_link } =
    props;

  // Sol fotoğraf ve sağ video kontrolü
  if (!banner_left || !banner_right) {
    return null;
  }

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
