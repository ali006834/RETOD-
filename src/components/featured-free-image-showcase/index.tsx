import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";

import { FeaturedFreeImageShowcaseProps } from "../__generated__/types";
import { IkasProduct, Image, Link, IkasImage } from "@ikas/storefront";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const FeaturedFreeImageShowcase = (props: FeaturedFreeImageShowcaseProps) => {
  const {
    products,
    headerText,
    titleText,
    contentText,
    btnText,
    btnLink,
    isWidthVideo,
  } = props;

  if (!products || products.length === 0) {
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
            {products?.map((item, index) => {
              const product = item?.relatedProduct;
              if (!product) return null;

              return (
                <SwiperSlide key={index}>
                  <div className={styles.product_container}>
                    <Link href={product.href}>
                      <a>
                        <ProductImage
                          product={product}
                          externalImage={item?.image}
                          isWidthVideo={isWidthVideo}
                        />
                        <div className={styles.product_Info}>
                          <ProductTitle product={product} />
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
            <Link href={btnLink?.href}>
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

type ProductImageProps = {
  product: IkasProduct;
  externalImage?: IkasImage;
  isWidthVideo?: boolean;
};

const ProductImage = observer(
  ({ product, externalImage, isWidthVideo }: ProductImageProps) => {
    // Eğer harici görsel video ise ve isWidthVideo true ise
    if (isWidthVideo && externalImage?.isVideo) {
      return (
        <video
          playsInline
          autoPlay
          loop
          muted
          controls={false}
          src={externalImage.src}
          style={{
            width: "100%",
            aspectRatio: "6 / 9",
            objectFit: "cover",
            maxHeight: "1620px",
          }}
        />
      );
    }

    // Ürün görseli video ise ve isWidthVideo true ise
    const mainImage = product.selectedVariant.mainImage?.image;
    if (isWidthVideo && mainImage?.isVideo && !externalImage) {
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

    // Harici görsel varsa direkt göster
    if (externalImage?.id) {
      return (
        <Image
          width="200px"
          height="300px"
          objectFit="contain"
          useBlur={true}
          image={externalImage}
          alt={product.name || undefined}
          className={styles.slider_product_items}
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
        width="200px"
        height="300px"
        objectFit="contain"
        useBlur={true}
        image={image}
        alt={product.name || undefined}
        className={styles.slider_product_items}
      />
    );
  }
);

const ProductTitle = observer(({ product }: Props) => (
  <div className={styles.product_title} data-tooltip={product.name}>
    <h2>{product.name}</h2>
  </div>
));

export default observer(FeaturedFreeImageShowcase);
