import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";
import { FeaturedProductShowcaseProps } from "../__generated__/types";
import { IkasProduct, Image, Link } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const BannerSingle = (props: FeaturedProductShowcaseProps) => {
  const {
    products,
    headerText,
    titleText,
    contentText,
    btnText,
    btnLink,
    isWidthVideo,
  } = props;

  if (!products) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Left side - Grid 8 (text content) */}
        <div className={styles.contentContainer}>
          {headerText && <div className={styles.headerText}>{headerText}</div>}
          {titleText && <h2 className={styles.titleText}>{titleText}</h2>}
          {contentText && <p className={styles.contentText}>{contentText}</p>}
          {/* Desktop button */}
          <div className={styles.desktopButton}>
            {btnText && btnLink && (
              <Link href={btnLink.href}>
                <a className={styles.btn}>{btnText}</a>
              </Link>
            )}
          </div>
        </div>

        {/* Right side - Grid 4 (products slider) */}
        <div className={styles.sliderContainer}>
          <Swiper
            modules={[Navigation]}
            scrollbar={true}
            className={styles.mySwiper}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: "", // Sol ok Olmayacak
            }}
            loop={true} // Sonsuz döngü
            slidesPerView={2.5} // Varsayılan mobil
            spaceBetween={15}
            breakpoints={{
              768: {
                slidesPerView: 3, // Tablet
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 4.5, // Web
                spaceBetween: 15,
                slidesPerGroup: 4, // Kaydırma grup sayısı
              },
            }}
          >
            {products?.data?.map((products, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className={styles.product_container}>
                    <Link href={products.href}>
                      <a>
                        <ProductImage
                          product={products}
                          isWidthVideo={isWidthVideo}
                        />
                        <div className={styles.product_Info}>
                          <ProductTitle product={products} />
                        </div>
                      </a>
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
            {/* Custom right arrow */}
            <div
              className={`${styles.swiperButtonNext} swiper-button-next`}
            ></div>
          </Swiper>
        </div>

        {/* Mobile button - shows only on mobile below slider */}
        <div className={styles.mobileButton}>
          {btnText && btnLink && (
            <Link href={btnLink}>
              <a className={styles.btn}>{btnText}</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

//Tip Tanımlaması
type Props = {
  product: IkasProduct;
  isWidthVideo?: boolean;
};

const ProductImage = observer(({ product, isWidthVideo }: Props) => {
  const mainImage = product.selectedVariant.mainImage?.image;

  if (isWidthVideo && mainImage?.isVideo) {
    // isWidthVideo true ve ana görsel video ise video göster
    return (
      <video
        playsInline
        autoPlay
        loop
        muted
        controls={false}
        src={mainImage.src}
        style={{
          width: "100%",
          aspectRatio: "6 / 9",
          objectFit: "cover",
          maxHeight: "1620px",
        }}
      />
    );
  }

  // Diğer durumlarda (isWidthVideo false veya ana görsel video değilse) resim göster
  let image = mainImage;
  if (mainImage?.isVideo) {
    // Ana görsel video ise, ilk video olmayanı bul
    const nonVideoImage = product.selectedVariant.images?.find(
      (img) => !img.image?.isVideo
    )?.image;
    image = nonVideoImage || undefined;
  }
  if (!image?.id) {
    return <img src="/product-dummy-image.jpeg" />;
  }
  return (
    <Image
      // layout="responsive"
      width="200px"
      height="300px"
      objectFit="contain"
      useBlur={true}
      image={product.selectedVariant.mainImage?.image!}
      alt={product.selectedVariant.product?.name || undefined}
      className={styles.slider_product_items}
    />
  );
});

const ProductTitle = observer(({ product }: Props) => (
  <div className={styles.product_title} data-tooltip={product.name}>
    <h2>{product.name}</h2>
  </div>
));

export default observer(BannerSingle);
