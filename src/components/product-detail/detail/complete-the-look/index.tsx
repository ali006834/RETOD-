import React from "react";
import { observer } from "mobx-react-lite";
import { ProductDetailProps } from "src/components/__generated__/types";
import {
  IkasProduct,
  IkasProductFilterSortType,
  Image,
  Link,
  useTranslation,
} from "@ikas/storefront";
import { FiltersSvgWrapper } from "src/components/product-list/filter/components/filters-svg-wrapper";
import Shirt from "./svg/shirt.svg";
import styles from "./style.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

export const NS = "product-detail";

export const CompleteTheLook = (
  props: ProductDetailProps & { isOpen: boolean; onToggle: () => void }
) => {
  const {
    completeTheLookProducts,
    completeTheLookTitle,
    completeTheLookContent,
  } = props;

  if (!completeTheLookProducts) {
    return null;
  }

  const { t } = useTranslation();

  return (
    <div className={styles.DescriptionWrapperTop}>
      <FiltersSvgWrapper
        title={completeTheLookTitle || ""}
        svg={Shirt?.src}
        settings={{
          showCollapsedOnDesktop: props.isOpen, // Açık/kapalı durumu buradan kontrol ediliyor
          showCollapsedOnMobile: props.isOpen,
          sortType: IkasProductFilterSortType.CUSTOM_SORT,
          customSortedValues: null,
        }}
        onClickExpandButton={props.onToggle} // Toggle işlemi buradan tetikleniyor
      >
        <div className={styles.DescriptionWrapper}>
          <div className={styles.container}>
            {completeTheLookProducts?.data.length > 0 && (
              <div className={styles.title_container}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: completeTheLookContent || "",
                  }}
                />
              </div>
            )}

            <div>
              <Swiper
                modules={[Navigation]}
                className="mySwiper"
                navigation={false}
                loop={true}
                slidesPerView={1.5}
                spaceBetween={8}
                breakpoints={{
                  140: {
                    slidesPerView: 1,
                    spaceBetween: 8,
                  },
                  768: {
                    slidesPerView: 1,
                    spaceBetween: 8,
                  },
                  1024: {
                    slidesPerView: 1.5,
                    spaceBetween: 8,
                  },
                }}
              >
                {completeTheLookProducts?.data.map((product, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <ComplateTheLookProduct product={product} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </FiltersSvgWrapper>
    </div>
  );
};

type Props = {
  product: IkasProduct;
};

const ComplateTheLookProduct = observer(({ product }: Props) => {
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
        src="/default-product-image.jpg"
        style={{
          width: "80px",
          height: "80px",
          objectFit: "cover",
        }}
      />
    );
  }

  return product.selectedVariant.mainImage.image.isVideo ? (
    <video
      src={product.selectedVariant.mainImage.image.src}
      style={{
        width: "80px",
        height: "80px",
        objectFit: "cover",
      }}
    />
  ) : (
    <Image
      width={100}
      height={80}
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
