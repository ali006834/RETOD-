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
            spaceBetween={5}
            breakpoints={{
              768: {
                slidesPerView: 3, // Tablet
                spaceBetween: 5,
              },
              1024: {
                slidesPerView: 4, // Web
                spaceBetween: 5,
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
    const mainImage = product.selectedVariant.mainImage?.image;
    const variantImages =
      product.selectedVariant.images
        ?.map((item) => item.image)
        .filter((img): img is IkasImage => Boolean(img)) || [];
    const nonVideoVariantImages = variantImages.filter((img) => !img.isVideo);

    // Eğer harici görsel video ise ve video gösterimi isteniyorsa
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

    // Ürün ana görseli video ise ve video gösterimi isteniyorsa
    if (isWidthVideo && !externalImage && mainImage?.isVideo) {
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

    const selectProductImage = () => {
      if (!mainImage) {
        return nonVideoVariantImages[0] || variantImages[0];
      }

      if (mainImage.isVideo) {
        return nonVideoVariantImages[0];
      }

      return mainImage;
    };

    let primaryImage: IkasImage | undefined;
    let hoverImage: IkasImage | undefined;

    if (externalImage && !externalImage.isVideo) {
      primaryImage = externalImage;
      hoverImage = selectProductImage();
    } else {
      primaryImage = selectProductImage();
      hoverImage = nonVideoVariantImages.find(
        (img) => img.id && img.id !== primaryImage?.id
      );
    }

    if (!hoverImage || hoverImage.id === primaryImage?.id) {
      hoverImage = undefined;
    }

    if (!primaryImage?.id) {
      return (
        <img
          src="/product-dummy-image.jpeg"
          className={styles.slider_product_items}
          alt={product.name || "product-placeholder"}
        />
      );
    }

    return (
      <div className={styles.productImageWrapper}>
        <div
          className={`${styles.productImageLayer} ${
            hoverImage ? styles.productImagePrimary : styles.productImageSingle
          }`}
        >
          <Image
            width="200px"
            height="300px"
            objectFit="contain"
            useBlur={true}
            image={primaryImage}
            alt={product.name || undefined}
            className={styles.slider_product_items}
          />
        </div>
        {hoverImage && (
          <div
            className={`${styles.productImageLayer} ${styles.productImageHover}`}
          >
            <Image
              width="1080px"
              height="1619px"
              objectFit="contain"
              useBlur={true}
              image={hoverImage}
              alt={product.name || undefined}
              className={styles.slider_product_items}
            />
          </div>
        )}
      </div>
    );
  }
);

const ProductTitle = observer(({ product }: Props) => (
  <div className={styles.product_title} data-tooltip={product.name}>
    <h2>{product.name}</h2>
  </div>
));

export default observer(FeaturedFreeImageShowcase);
