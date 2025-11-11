import React from "react";
import { observer } from "mobx-react-lite";

import { ProductDetailProps } from "src/components/__generated__/types";
import { useTranslation } from "@ikas/storefront";

import * as S from "./style";

export const ProductShortSKU = observer((props: ProductDetailProps) => {
  const { t } = useTranslation();

  if (!props?.product) return null;

  // Seçili varyantın SKU'sunu al
  const productSKU = props?.product?.selectedVariant?.sku;

  if (!productSKU) return null;

  return (
    <S.product_short_sku>
      <span>
        Ürün Kodu: <b>{productSKU}</b>
      </span>
    </S.product_short_sku>
  );
});

ProductShortSKU.displayName = "ProductShortSKU";
