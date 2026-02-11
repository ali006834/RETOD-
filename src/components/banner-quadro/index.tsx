import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";
import { BannerQuadroProps } from "../__generated__/types";
import { Image, Link } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const BannerQuadro = (props: BannerQuadroProps) => {
  const {
    titleBanner,
    content1,
    content2,
    content3,
    content4,
    imageSizeSettings,
  } = props;

  const { isMobile } = useScreen();

  const contents = [content1, content2, content3, content4].filter(
    (content): content is NonNullable<typeof content> => 
      content !== undefined && content.image !== undefined
  ) as Array<NonNullable<typeof content1> & { image: NonNullable<NonNullable<typeof content1>['image']> }>;

  if (contents.length === 0) {
    return null;
  }

  const imageWidth = imageSizeSettings?.width
    ? parseInt(imageSizeSettings.width)
    : 1080;
  const imageHeight = imageSizeSettings?.height
    ? parseInt(imageSizeSettings.height)
    : 1350;

  const renderBannerContent = (content: typeof contents[0]) => {
    if (!content.image) return null;
    return (
      <Link href={content?.link?.href || ""}>
        <a className={styles.bannerLink}>
          <div className={styles.bannerWrapper}>
            <Image
              width={imageWidth}
              height={imageHeight}
              image={content.image}
              alt={content.image?.altText || content?.title || ""}
              useBlur={true}
              className={styles.bannerImage}
            />
          </div>
          {(content?.title || content?.content) && (
            <div className={styles.contentWrapper}>
              {content?.title && (
                <h3 className={styles.bannerTitle}>
                  {content.title}
                </h3>
              )}
              {content?.content && (
                <p className={styles.bannerContent}>
                  {content.content}
                </p>
              )}
            </div>
          )}
        </a>
      </Link>
    );
  };

  return (
    <div className={styles.wrapper}>
      {titleBanner && (
        <h2 className={styles.title}>{titleBanner}</h2>
      )}
      
      {/* Desktop - Grid 4 */}
      <div className={styles.desktopContainer}>
        <div className={styles.gridContainer}>
          {contents.map((content, index) => (
            <div key={index} className={styles.bannerItem}>
              {renderBannerContent(content)}
            </div>
          ))}
        </div>
      </div>

      {/* Tablet & Mobile - Swiper 2.5 preview */}
      <div className={styles.mobileContainer}>
        <Swiper
          slidesPerView={2.5}
          spaceBetween={10}
          className={styles.mobileSwiper}
        >
          {contents.map((content, index) => {
            if (!content.image) return null;
            return (
              <SwiperSlide key={index} className={styles.slide}>
                <div className={styles.bannerItem}>
                  {renderBannerContent(content)}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default observer(BannerQuadro);
