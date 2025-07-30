import React from "react";

import { ProductDetailProps } from "src/components/__generated__/types";
import { IkasProductFilterSortType, useTranslation } from "@ikas/storefront";
import { FiltersSvgWrapper } from "src/components/product-list/filter/components/filters-svg-wrapper";
import Shirt from "./svg/shirt.svg";

import * as S from "./style";

export const ProductShortExplanation = (props: ProductDetailProps) => {
  const { t } = useTranslation();

  if (!props?.product?.description) return null;

  const shortDescriptionAttribute = props?.product?.attributes?.find(
    (attr) => attr.productAttribute?.name === "Ürün Kısa Açıklaması" //Ürün Kısa Açıklaması: İkas'dan gelen Özel Alan
  );

  const shortDescriptionHTML = shortDescriptionAttribute?.value || "";

  return (
    <S.DescriptionWrapperTop>
      <S.DescriptionWrapperShortExplanation>
        <S.Description
          dangerouslySetInnerHTML={{
            __html: shortDescriptionHTML || "",
          }}
        />
      </S.DescriptionWrapperShortExplanation>
    </S.DescriptionWrapperTop>
  );
};
