import React, { useRef } from "react";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";
import { BannerTrioProps } from "../__generated__/types";
import { Image, Link } from "@ikas/storefront";
import NextIcon from "src/components/svg/next";
import PrevIcon from "src/components/svg/prev";
import ArrowRightIcon from "./svg/arrow-right";

const BannerTrio = (props: BannerTrioProps) => {
  const {
    banner_left,
    banner_left_link,
    bannerLeftText,
    bannerLeftTextColor,
    bannerLeftContent,
    bannerLeftContentColor,
    bannerLeftButtonText,
    bannerLeftButtonTextColor,

    banner_right,
    banner_right_link,
    bannerRightText,
    bannerRightTextColor,
    bannerRightContent,
    bannerRightContentColor,
    bannerRightButtonText,
    bannerRightButtonTextColor,

    banner_center,
    banner_center_link,
    bannerCenterText,
    bannerCenterTextColor,
    bannerCenterContent,
    bannerCenterContentColor,
    bannerCenterButtonText,
    bannerCenterButtonTextColor,
  } = props;

  const sliderRef = useRef<HTMLDivElement>(null);

  if (!banner_left || !banner_right || !banner_center) {
    return null;
  }

  const banners = [
    {
      banner: banner_left,
      link: banner_left_link,
      text: bannerLeftText,
      content: bannerLeftContent,
      buttonText: bannerLeftButtonText,
      textColor: bannerLeftTextColor,
      contentColor: bannerLeftContentColor,
      buttonTextColor: bannerLeftButtonTextColor,
    },
    {
      banner: banner_center,
      link: banner_center_link,
      text: bannerCenterText,
      content: bannerCenterContent,
      buttonText: bannerCenterButtonText,
      textColor: bannerCenterTextColor,
      contentColor: bannerCenterContentColor,
      buttonTextColor: bannerCenterButtonTextColor,
    },
    {
      banner: banner_right,
      link: banner_right_link,
      text: bannerRightText,
      content: bannerRightContent,
      buttonText: bannerRightButtonText,
      textColor: bannerRightTextColor,
      contentColor: bannerRightContentColor,
      buttonTextColor: bannerRightButtonTextColor,
    },
  ];

  const scrollToSlide = (direction: "prev" | "next") => {
    if (!sliderRef.current) return;

    const { scrollLeft, clientWidth } = sliderRef.current;
    const scrollTo =
      direction === "next"
        ? scrollLeft + clientWidth
        : scrollLeft - clientWidth;

    sliderRef.current.scrollTo({
      left: scrollTo,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.mainTitle}>{props.mainTitle}</h2>
      {/*//= web alanı */}
      <div className={styles.desktopContainer}>
        {banners.map(
          (
            {
              banner,
              link,
              text,
              buttonText,
              content,
              textColor,
              contentColor,
              buttonTextColor,
            },
            index
          ) => (
            <div key={index} className={styles.bannerWrapper}>
              <Link href={link?.href || ""}>
                <a>
                  <Image
                    width={503}
                    height={400}
                    alt={banner?.altText || ""}
                    image={banner}
                    useBlur={true}
                    className={styles.bannerImage}
                  />
                  {/*//+ Yazılar  */}
                  <div className={styles.contentOverlay}>
                    {/* Başlık */}
                    {text && (
                      <h2
                        className={styles.bannerText}
                        style={textColor ? { color: textColor } : undefined}
                      >
                        {text.toLocaleUpperCase("tr-TR")}
                      </h2>
                    )}

                    {/* İçerik */}
                    {content && (
                      <p
                        className={styles.bannerContent}
                        style={
                          contentColor ? { color: contentColor } : undefined
                        }
                      >
                        {content}
                      </p>
                    )}

                    {/* Buton */}
                    {buttonText && (
                      <button
                        className={styles.bannerButton}
                        style={{
                          color: buttonTextColor || "#fff",
                          borderColor: buttonTextColor || "#fff",
                        }}
                      >
                        {buttonText.toLocaleUpperCase("tr-TR")}
                        <ArrowRightIcon color={buttonTextColor || "#fff"} />
                      </button>
                    )}
                  </div>
                </a>
              </Link>
            </div>
          )
        )}
      </div>

      {/*//= Mobile/Tablet Alanı */}
      <div className={styles.mobileContainer}>
        <div className={styles.sliderWrapper}>
          <button
            className={styles.sliderArrowPrev}
            onClick={() => scrollToSlide("prev")}
            aria-label="Previous banner"
          >
            <PrevIcon />
          </button>

          <div className={styles.slider} ref={sliderRef}>
            {banners.map(({ banner, link, text, buttonText }, index) => (
              <div key={index} className={styles.slide}>
                <Link href={link?.href || ""}>
                  <a>
                    <Image
                      width={503}
                      height={400}
                      alt={banner?.altText || ""}
                      image={banner}
                      useBlur={true}
                      className={styles.bannerImage}
                    />
                  </a>
                </Link>
                <div className={styles.overlayContainer}>
                  <div className={styles.overlayContent}>
                    <Link href={link?.href || ""}>
                      <h2 className={styles.bannerText}>
                        {text?.toLocaleUpperCase("tr-TR")}
                      </h2>
                    </Link>
                    <Link href={link?.href || ""}>
                      <button className={styles.bannerButton}>
                        {buttonText?.toLocaleUpperCase("tr-TR")}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className={styles.sliderArrowNext}
            onClick={() => scrollToSlide("next")}
            aria-label="Next banner"
          >
            <NextIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(BannerTrio);
