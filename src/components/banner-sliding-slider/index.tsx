import React from "react";
import Slider from "react-slick";
import { BannerSlidingSliderProps } from "../__generated__/types";
import styles from "./style.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image, Link } from "@ikas/storefront";

const SlidingSlider = (props: BannerSlidingSliderProps) => {
  const {
    imageSliders,
    titleBanner,

    lowerTitle,
    lowerContent,
    lowerBtnText,
    lowerBtnLink,
  } = props;
  const boxRef = React.useRef<HTMLDivElement>(null);

  const settings = {
    dots: true, // Slaytın altında küçük navigasyon noktalarını gösterir (hangi slaytta olduğunu belirtir).
    arrows: false, // Önceki ve sonraki slayta geçmek için okları gizler.
    infinite: true, // Sonsuz döngü sağlar, yani son slayttan sonra tekrar başa döner.
    speed: 500, // Slayt geçiş hızı (milisaniye cinsinden). 500ms = 0.5 saniye.
    slidesToShow: 1, // Aynı anda kaç slaytın gösterileceğini belirler. Burada sadece 1 slayt görünecek.
    slidesToScroll: 1, // Her geçişte kaç slayt kaydırılacağını belirler. Burada 1'er 1'er kaydırılıyor.
    autoplay: true, // Slaytların otomatik olarak değişmesini sağlar.
    autoplaySpeed: 3000, // Otomatik geçiş süresi (milisaniye cinsinden). 3000ms = 3 saniyede bir değişir.
  };

  // Extract the actual array from MobX proxy if needed
  const slides = imageSliders
    ? Array.isArray(imageSliders)
      ? imageSliders
      : [...imageSliders]
    : [];

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!boxRef.current) return;

    const children = boxRef.current.querySelectorAll(`.${styles.slideItem}`);
    children.forEach((child) => {
      child.classList.remove(styles.activeSlide);
    });

    const target = e.currentTarget as HTMLElement;
    target.classList.add(styles.activeSlide);
  };

  return (
    <div className={styles.container}>
      {/*//= Masaüstü Gösterimi */}
      <div className={styles.desktopContainer}>
        {slides.length > 0 && (
          <>
            {titleBanner && (
              <div className={styles.titleContainer}>
                <h2 className={styles.title}>{titleBanner}</h2>
              </div>
            )}
            <div className={styles.slidesGrid} ref={boxRef}>
              {slides.map((slide) => {
                const src =
                  typeof slide?.imageSlider?.getSrc === "function"
                    ? slide?.imageSlider?.getSrc
                    : slide?.imageSlider?.src;
                const alt =
                  slide?.imageSlider?.altText || titleBanner || "Slide image";

                return (
                  <div
                    className={styles.slideItem}
                    key={slide?.imageSlider?.id}
                    onMouseEnter={handleMouseEnter}
                  >
                    <div className={styles.imageContainer}>
                      <div className={styles.imagePlaceholder} />
                      <img
                        alt={alt}
                        height={769}
                        width={1500}
                        src={slide?.imageSlider?.src}
                        loading="lazy"
                        decoding="async"
                        className={styles.slideImage}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Alt Bölüm - Lower Section */}
      {(lowerTitle || lowerContent || lowerBtnText) && (
        <div className={styles.lowerSection}>
          <div className={styles.lowerGrid}>
            {/* Sağ Alan - Right Area */}
            <div className={styles.lowerRight}>
              {lowerTitle && (
                <h3 className={styles.lowerTitle}>{lowerTitle}</h3>
              )}
            </div>

            {/* Sol Alan - Left Area */}
            <div className={styles.lowerLeft}>
              {lowerContent && (
                <div className={styles.lowerContent}>{lowerContent}</div>
              )}
              {lowerBtnText && lowerBtnLink && (
                <div className={styles.lowerButton}>
                  <Link href={lowerBtnLink}>{lowerBtnText}</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/*//= Mobile Gösterimi */}
      <div className={styles.mobileContainer}>
        {slides.length > 0 && (
          <Slider {...settings}>
            {slides.map((slide) => {
              const src =
                typeof slide?.imageSlider?.getSrc === "function"
                  ? slide?.imageSlider?.getSrc
                  : slide?.imageSlider?.src;
              const alt =
                slide?.imageSlider?.altText || titleBanner || "Slide image";

              return (
                <div
                  key={slide?.imageSlider?.id}
                  className={styles.mobileSlide}
                >
                  <img
                    alt={alt}
                    height={769}
                    width={1500}
                    src={slide?.imageSlider?.src}
                    loading="lazy"
                    decoding="async"
                    className={styles.mobileImage}
                  />
                </div>
              );
            })}
          </Slider>
        )}

        {/* Alt Bölüm - Mobile Lower Section */}
        {(lowerTitle || lowerContent || lowerBtnText) && (
          <div className={styles.lowerSectionMobile}>
            <div className={styles.lowerGridMobile}>
              {/* Sol Alan - Right Area */}
              <div className={styles.lowerRightMobile}>
                {lowerTitle && (
                  <h3 className={styles.lowerTitle}>{lowerTitle}</h3>
                )}
              </div>

              {/* Sağ Alan - Left Area */}
              <div className={styles.lowerLeftMobile}>
                {lowerContent && (
                  <div className={styles.lowerContent}>{lowerContent}</div>
                )}
                {lowerBtnText && lowerBtnLink && (
                  <div className={styles.lowerButton}>
                    <Link href={lowerBtnLink}>{lowerBtnText}</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlidingSlider;
