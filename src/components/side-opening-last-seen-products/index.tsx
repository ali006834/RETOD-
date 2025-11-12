import React from "react";
import { observer } from "mobx-react-lite";
import { SideOpeningLastSeenProductsProps } from "../__generated__/types";
import styles from "./style.module.css";
import { IkasProduct, Image, Link, useTranslation } from "@ikas/storefront";
import CloseIcon from "../svg/close";
import ArrowRightIcon from "../svg/arrow-right";
import { useScreen } from "src/utils/hooks/useScreen";

export const NS = "product-detail";

const SideOpeningLastSeenProducts = (
  props: SideOpeningLastSeenProductsProps
) => {
  const { productsYouVisited, isWidthVideo } = props;
  const { t } = useTranslation();
  const { width } = useScreen();

  const [isVisible, setIsVisible] = React.useState(true);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const productCount = React.useMemo(() => {
    // Mobilde (768px altı) 2 ürün, desktop'ta 3 ürün göster
    return width > 0 && width < 768 ? 2 : 3;
  }, [width]);

  const products = React.useMemo(
    () => productsYouVisited?.data?.slice(0, productCount) ?? [],
    [productsYouVisited?.data, productCount]
  );

  if (!productsYouVisited || products.length === 0 || !isVisible) {
    return null;
  }

  const title = "Son Gezilen Ürünler";

  return (
    <aside
      className={`${styles.wrapper} ${isExpanded ? styles.expanded : ""}`}
      aria-label={title}
    >
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => setIsVisible(false)}
          aria-label={t?.("common:close") || "Kapat"}
        >
          <CloseIcon color="#ffffff" width="1.1em" height="1.1em" />
        </button>

        <button
          type="button"
          className={`${styles.iconButton} ${styles.toggleButton} ${
            isExpanded ? styles.toggleButtonExpanded : ""
          }`}
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-label={
            isExpanded
              ? t?.("common:collapse") || "Daralt"
              : t?.("common:expand") || "Genişlet"
          }
        >
          <ArrowRightIcon fill="#ffffff" width="1.1em" height="1.1em" />
        </button>
      </div>

      <div className={styles.panel}>
        <header className={styles.header}>
          <span className={styles.title}>{title}</span>
        </header>

        <div className={styles.products}>
          {products.map((product) => (
            <LastSeenProduct
              key={product.id}
              product={product}
              isWidthVideo={isWidthVideo}
              isExpanded={isExpanded}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

type BaseProps = {
  product: IkasProduct;
  isWidthVideo?: boolean;
};

type ProductCardProps = BaseProps & {
  isExpanded: boolean;
};

const LastSeenProduct = observer(
  ({ product, isWidthVideo, isExpanded }: ProductCardProps) => {
    const { t } = useTranslation();

    const a11yTitle = product.selectedVariant.hasStock
      ? ""
      : t("common:product.discountBadgeSoldOut");

    return (
      <Link href={product.href}>
        <a
          title={a11yTitle}
          className={`${styles.product} ${
            isExpanded ? styles.productExpanded : ""
          }`}
        >
          <div
            className={`${styles.imageWrapper} ${
              isExpanded ? styles.imageWrapperExpanded : ""
            }`}
          >
            <ProductImage product={product} isWidthVideo={isWidthVideo} />
          </div>

          {isExpanded && (
            <div
              className={`${styles.productInfo} ${styles.productInfoExpanded}`}
            >
              <ProductTitle product={product} />
              <Price product={product} />
            </div>
          )}
        </a>
      </Link>
    );
  }
);

const ProductImage = observer(({ product, isWidthVideo }: BaseProps) => {
  const mainImage = product.selectedVariant.mainImage?.image;

  if (isWidthVideo && mainImage?.isVideo) {
    return (
      <video
        playsInline
        autoPlay
        loop
        muted
        controls={false}
        src={mainImage.src}
        className={styles.imageElement}
      />
    );
  }

  let image = mainImage;
  if (mainImage?.isVideo) {
    const nonVideoImage = product.selectedVariant.images?.find(
      (img) => !img.image?.isVideo
    )?.image;
    image = nonVideoImage || undefined;
  }

  if (!image?.id) {
    return (
      <img src="/product-dummy-image.jpeg" className={styles.imageElement} />
    );
  }

  return (
    <Image
      width={1080}
      height={1620}
      objectFit="cover"
      useBlur={true}
      image={image}
      alt={product.selectedVariant.product?.name || undefined}
      className={styles.imageElement}
    />
  );
});

const Price = observer(({ product }: BaseProps) => {
  return (
    <div className={styles.priceRow}>
      <span className={styles.price}>
        {product.selectedVariant.price.formattedFinalPrice}
      </span>
      {product.selectedVariant.price.hasDiscount && (
        <span className={styles.discount}>
          <del>{product.selectedVariant.price.formattedSellPrice}</del>
        </span>
      )}
    </div>
  );
});

const ProductTitle = observer(({ product }: BaseProps) => (
  <h2 className={styles.productTitle}>{product.name}</h2>
));

export default observer(SideOpeningLastSeenProducts);
