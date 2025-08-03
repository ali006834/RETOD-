import React from "react";
import { observer } from "mobx-react-lite";
import { IkasProduct } from "@ikas/storefront";
import styles from "./styles.module.css";
import { ProductDetailProps } from "src/components/__generated__/types";

export const ProductSku = observer((props: ProductDetailProps) => {
  const { product } = props;

  if (!product) {
    return null;
  }

  if (product.hasStock && product?.tags?.length !== 0) {
    return (
      <div className={styles.productSku}>
        <span>Dizaynella {product.selectedVariant.sku}</span>
      </div>
    );
  } else {
    return null;
  }
});
