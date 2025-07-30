import { observer } from "mobx-react-lite";
import React from "react";
import { ProductDetailProps } from "src/components/__generated__/types";

import styles from "../style.module.css";

export const Price = observer((props: ProductDetailProps) => {
  const { price }: any = props?.product?.selectedVariant;

  let regularPrice = parseFloat(
    price.formattedSellPrice.replace(/[^\d.-]/g, "")
  );
  let discountedPrice = parseFloat(
    price.formattedFinalPrice.replace(/[^\d.-]/g, "")
  );

  let discountRate = (
    ((regularPrice - discountedPrice) / regularPrice) *
    100
  ).toFixed(0);

  return (
    <div className={styles.price_content}>
      {/* indirimsiz fiyat */}
      {price.hasDiscount && (
        <span className={styles.discCount}>
          <del> {price.formattedSellPrice}</del>
        </span>
      )}
      {/* satış fiyatı */}
      <span className={styles.price}>{price.formattedFinalPrice}</span>
      {/* indirim oranı */}
      {price.hasDiscount && (
        <span className={styles.discount_rate}>{` -% ${discountRate}`}</span>
      )}
    </div>
  );
});

Price.displayName = "Price";
