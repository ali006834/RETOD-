import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";
import { BannerDuoProps } from "../__generated__/types";
import { Image, Link } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";

const BannerDuo = (props: BannerDuoProps) => {
  const { leftMediaImage, leftMediaLink, rightMediaVideo, rightMediaLink, mediaGapValue, mediaGapValueMobile, titleLeft, titleRight, contentLeft, contentRight } =
    props;
  const { isMobile } = useScreen();
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Gap değerlerini hesapla
  const gapValue = mediaGapValue?.value || 0;
  const gapUnit = mediaGapValue?.unit || "px";
  const gapStyle = gapValue > 0 ? { gap: `${gapValue}${gapUnit}` } : {};

  // Mobil için gap değerini hesapla
  const gapValueMobile = mediaGapValueMobile?.value || 0;
  const gapUnitMobile = mediaGapValueMobile?.unit || "px";
  const gapStyleMobile = gapValueMobile > 0 ? { gap: `${gapValueMobile}${gapUnitMobile}` } : {};

  // Video yükleme durumunu güncelle
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  // Sol fotoğraf ve sağ video kontrolü
  if (!leftMediaImage || !rightMediaVideo) {
    return null;
  }

  // Mobil için alt alta düzen
  if (isMobile) {
    return (
      <div className={styles.mobileWrapper} style={gapStyleMobile}>
        {/* Üst Fotoğraf */}
        <div className={styles.mobileSectionContainer}>
          <div className={styles.mobileSection}>
            <Link href={leftMediaLink?.href || ""}>
              <a>
                <Image
                  image={leftMediaImage}
                  className={styles.bannerImage}
                  alt="Banner Left"
                  layout="fill"
                />
              </a>
            </Link>
          </div>
          {(titleLeft || contentLeft || leftMediaLink) && (
            <div className={styles.contentWrapper}>
              {titleLeft && (
                <h2 className={styles.title}>{titleLeft}</h2>
              )}
              {contentLeft && (
                <p className={styles.content}>{contentLeft}</p>
              )}
              {leftMediaLink?.label && (
                <Link href={leftMediaLink.href || ""}>
                  <a className={styles.link}>{leftMediaLink.label}</a>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Alt Video */}
        <div className={styles.mobileSectionContainer}>
          <div className={styles.mobileSection}>
            <Link href={rightMediaLink?.href || ""}>
              <a>
                <div className={styles.videoContainer}>
                  {/* Thumbnail - İlk başta göster */}
                  {!videoLoaded && rightMediaVideo?.thumbnailImage && (
                    <div className={styles.thumbnailContainer}>
                      <Image
                        className={styles.thumbnailImage}
                        image={rightMediaVideo.thumbnailImage}
                        alt={
                          rightMediaVideo.thumbnailImage?.altText ||
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
                    autoPlay={rightMediaVideo?.autoplay || true}
                    muted={rightMediaVideo?.muted || true}
                    loop={rightMediaVideo?.loop || true}
                    playsInline
                    onLoadedData={handleVideoLoaded}
                    onCanPlay={handleVideoLoaded}
                  >
                    <source src={rightMediaVideo?.videoSrc || ""} type="video/mp4" />
                  </video>
                </div>
              </a>
            </Link>
          </div>
          {(titleRight || contentRight || rightMediaLink) && (
            <div className={styles.contentWrapper}>
              {titleRight && (
                <h2 className={styles.title}>{titleRight}</h2>
              )}
              {contentRight && (
                <p className={styles.content}>{contentRight}</p>
              )}
              {rightMediaLink?.label && (
                <Link href={rightMediaLink.href || ""}>
                  <a className={styles.link}>{rightMediaLink.label}</a>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Desktop için mevcut yapı
  return (
    <div className={styles.wrapper} style={gapStyle}>
      {/* Sol Fotoğraf - 50% */}
      <div className={styles.sectionContainer}>
        <div className={styles.leftSection}>
          <Link href={leftMediaLink?.href || ""}>
            <a>
              <Image
                image={leftMediaImage}
                className={styles.bannerImage}
                alt="Banner Left"
                layout="fill"
              />
            </a>
          </Link>
        </div>
        {(titleLeft || contentLeft || leftMediaLink) && (
          <div className={styles.contentWrapper}>
            {titleLeft && (
              <h2 className={styles.title}>{titleLeft}</h2>
            )}
            {contentLeft && (
              <p className={styles.content}>{contentLeft}</p>
            )}
            {leftMediaLink?.label && (
              <Link href={leftMediaLink.href || ""}>
                <a className={styles.link}>{leftMediaLink.label}</a>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Sağ Video - 50% */}
      <div className={styles.sectionContainer}>
        <div className={styles.rightSection}>
          <Link href={rightMediaLink?.href || ""}>
            <a>
              <div className={styles.videoContainer}>
                {/* Thumbnail - İlk başta göster */}
                {!videoLoaded && rightMediaVideo?.thumbnailImage && (
                  <div className={styles.thumbnailContainer}>
                    <Image
                      className={styles.thumbnailImage}
                      image={rightMediaVideo.thumbnailImage}
                      alt={
                        rightMediaVideo.thumbnailImage?.altText || "Video thumbnail"
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
                  autoPlay={rightMediaVideo?.autoplay || true}
                  muted={rightMediaVideo?.muted || true}
                  loop={rightMediaVideo?.loop || true}
                  playsInline
                  onLoadedData={handleVideoLoaded}
                  onCanPlay={handleVideoLoaded}
                >
                  <source src={rightMediaVideo?.videoSrc || ""} type="video/mp4" />
                </video>
              </div>
            </a>
          </Link>
        </div>
        {(titleRight || contentRight || rightMediaLink) && (
          <div className={styles.contentWrapper}>
            {titleRight && (
              <h2 className={styles.title}>{titleRight}</h2>
            )}
            {contentRight && (
              <p className={styles.content}>{contentRight}</p>
            )}
            {rightMediaLink?.label && (
              <Link href={rightMediaLink.href || ""}>
                <a className={styles.link}>{rightMediaLink.label}</a>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(BannerDuo);
