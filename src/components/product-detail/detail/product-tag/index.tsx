import React from "react";
import { observer } from "mobx-react-lite";
import { IkasProduct } from "@ikas/storefront";
import * as S from "./style";
import { ProductDetailProps } from "src/components/__generated__/types";

export const ProductTag = observer((props: ProductDetailProps) => {
  const { product } = props;

  if (!product) {
    return null;
  }

  if (product.hasStock && product?.tags?.length !== 0) {
    return (
      <S.ProductTags>
        {product.tags?.map((item, index) => (
          <S.ProductTag key={index}>
            <S.ProductTagsRatio>{item.name}</S.ProductTagsRatio>
          </S.ProductTag>
        ))}
      </S.ProductTags>
    );
  } else {
    return null;
  }
});
