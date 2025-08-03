import React from "react";
import { observer } from "mobx-react-lite";
import { AlternativeProductsProps } from "../__generated__/types";
import styles from "./style.module.css";
import { IkasProduct, Image, Link, useTranslation } from "@ikas/storefront";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

export const NS = "product-detail";

const AlternativeProducts = (props: AlternativeProductsProps) => {
  const { alternativeProducts } = props;
  const { t } = useTranslation();

  if (!alternativeProducts) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {alternativeProducts?.data.length > 0 && (
          <div>
            <h4>{t(`${NS}:detail.relatedProducts.text`)}</h4>
          </div>
        )}

        <div>
          <Swiper
            modules={[Navigation]}
            className="mySwiper"
            navigation={true}
            loop={true}
            slidesPerView={5}
            spaceBetween={20}
            breakpoints={{
              140: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
          >
            {alternativeProducts?.data.map((product, index) => {
              return (
                <SwiperSlide key={index}>
                  <AlternativeProduct product={product} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

type Props = {
  product: IkasProduct;
};

const AlternativeProduct = observer(({ product }: Props) => {
  const { t } = useTranslation();

  const a11yTitle = product.selectedVariant.hasStock
    ? ""
    : t("common:product.discountBadgeSoldOut");

  return (
    <div className={styles.product_container}>
      <Link href={product.href}>
        <a title={a11yTitle}>
          <ProductImage product={product} />
          <div className={styles.product_Info}>
            <ProductTitle product={product} />
            <Price product={product} />
          </div>
        </a>
      </Link>
    </div>
  );
});

const ProductImage = observer(({ product }: Props) => {
  if (!product.selectedVariant.mainImage?.image?.id) {
    return (
      <img
        src="/default-product-image.png"
        style={{
          width: "100%",
          height: "auto", // Oranı koru
          aspectRatio: "460/690", // Diğer görsellerle aynı oran
          objectFit: "cover",
        }}
      />
    );
  }

  return product.selectedVariant.mainImage.image.isVideo ? (
    <video src={product.selectedVariant.mainImage.image.src} />
  ) : (
    <Image
      width={460}
      height={690}
      objectFit="cover"
      useBlur={true}
      image={product.selectedVariant.mainImage?.image!}
      alt={product.selectedVariant.product?.name || undefined}
    />
  );
});

const Price = observer(({ product }: Props) => {
  return (
    <div className={styles.price_content}>
      <span className={styles.price}>
        {product.selectedVariant.price.formattedFinalPrice}
      </span>
      {product.selectedVariant.price.hasDiscount && (
        <span className={styles.discCount}>
          <del> {product.selectedVariant.price.formattedSellPrice}</del>
        </span>
      )}
    </div>
  );
});

const ProductTitle = observer(({ product }: Props) => (
  <div className={styles.product_title}>
    <h2>{product.name}</h2>
  </div>
));

export default observer(AlternativeProducts);
