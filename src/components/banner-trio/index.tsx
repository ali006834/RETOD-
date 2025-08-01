import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";
import { BannerTrioProps } from "../__generated__/types";
import { Image, Link } from "@ikas/storefront";
import ArrowRightIcon from "./svg/arrow-right";

const BannerTrio = (props: BannerTrioProps) => {
  const {
    banner_left,
    banner_left_link,

    banner_right,
    banner_right_link,

    banner_bg_color,
    banner_center_link,
    bannerCenterText,
    bannerCenterTextColor,
    bannerCenterContent,
    bannerCenterContentColor,
    bannerCenterButtonText,
    bannerCenterButtonTextColor,
  } = props;

  // Sol fotoğraf ve sağ video kontrolü
  if (!banner_left || !banner_right) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      {/*//= Desktop alanı */}
      <div className={styles.desktopContainer}>
        {/* Sol Fotoğraf */}
        <div className={styles.bannerWrapper}>
          <Link href={banner_left_link?.href || ""}>
            <a>
              <Image
                width={920}
                height={1150}
                alt={banner_left?.altText || ""}
                image={banner_left}
                useBlur={true}
                objectFit="fill"
                className={styles.bannerImage}
              />
            </a>
          </Link>
        </div>

        {/* Orta Yazı Alanı */}
        <div
          className={styles.centerTextWrapper}
          style={{ backgroundColor: banner_bg_color || "#f5f5f5" }}
        >
          <Link href={banner_center_link?.href || ""}>
            <a className={styles.centerTextLink}>
              {/* Başlık */}
              {bannerCenterText && (
                <h2
                  className={styles.centerText}
                  style={
                    bannerCenterTextColor
                      ? { color: bannerCenterTextColor }
                      : undefined
                  }
                >
                  {bannerCenterText}
                </h2>
              )}

              {/* İçerik */}
              {bannerCenterContent && (
                <p
                  className={styles.centerContent}
                  style={
                    bannerCenterContentColor
                      ? { color: bannerCenterContentColor }
                      : undefined
                  }
                >
                  {bannerCenterContent}
                </p>
              )}

              {/* Buton */}
              {bannerCenterButtonText && (
                <button
                  className={styles.centerButton}
                  style={{
                    color: bannerCenterButtonTextColor || "#fff",
                  }}
                >
                  {bannerCenterButtonText}
                  <ArrowRightIcon
                    color={bannerCenterButtonTextColor || "#fff"}
                  />
                </button>
              )}
            </a>
          </Link>
        </div>

        {/* Sağ Video */}
        <div className={styles.bannerWrapper}>
          <Link href={banner_right_link?.href || ""}>
            <a>
              <video
                width={606}
                height={1080}
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

      {/*//= Mobile/Tablet Alanı */}
      <div className={styles.mobileContainer}>
        {/* Sol Fotoğraf */}
        <div className={styles.mobileItem}>
          <Link href={banner_left_link?.href || ""}>
            <a>
              <Image
                width={920}
                height={1150}
                alt={banner_left?.altText || ""}
                image={banner_left}
                useBlur={true}
                className={styles.bannerImage}
              />
            </a>
          </Link>
        </div>

        {/* Orta yazı alanı */}
        <div
          className={styles.mobileTextWrapper}
          style={{ backgroundColor: banner_bg_color || "#f5f5f5" }}
        >
          <Link href={banner_center_link?.href || ""}>
            <a className={styles.centerTextLink}>
              {bannerCenterText && (
                <h2
                  className={styles.centerText}
                  style={
                    bannerCenterTextColor
                      ? { color: bannerCenterTextColor }
                      : undefined
                  }
                >
                  {bannerCenterText.toLocaleUpperCase("tr-TR")}
                </h2>
              )}
              {bannerCenterContent && (
                <p
                  className={styles.centerContent}
                  style={
                    bannerCenterContentColor
                      ? { color: bannerCenterContentColor }
                      : undefined
                  }
                >
                  {bannerCenterContent}
                </p>
              )}
              {bannerCenterButtonText && (
                <button
                  className={styles.centerButton}
                  style={{
                    color: bannerCenterButtonTextColor || "#fff",
                    borderColor: bannerCenterButtonTextColor || "#fff",
                  }}
                >
                  {bannerCenterButtonText.toLocaleUpperCase("tr-TR")}
                  <ArrowRightIcon
                    color={bannerCenterButtonTextColor || "#fff"}
                  />
                </button>
              )}
            </a>
          </Link>
        </div>

        {/* Sağ Video */}
        <div className={styles.mobileItem}>
          <Link href={banner_right_link?.href || ""}>
            <a>
              <video
                width={503}
                height={400}
                autoPlay
                muted
                loop
                playsInline
                className={styles.bannerVideo}
              >
                <source src={banner_right?.videoSrc || ""} type="video/mp4" />
              </video>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default observer(BannerTrio);
