import React from "react";

import { ProductDetailProps } from "src/components/__generated__/types";
import { IkasProductFilterSortType, useTranslation } from "@ikas/storefront";
import { FiltersSvgWrapper } from "src/components/product-list/filter/components/filters-svg-wrapper";
import Shirt from "./svg/shirt.svg";

import * as S from "../style";

export const Description = (
  props: ProductDetailProps & { isOpen: boolean; onToggle: () => void }
) => {
  const { t } = useTranslation();
  if (!props?.product?.description) return null;

  return (
    <S.DescriptionWrapperTop>
      <FiltersSvgWrapper
        title={t("product-detail:description").toLocaleUpperCase("tr-TR")}
        svg={Shirt?.src}
        settings={{
          showCollapsedOnDesktop: props.isOpen, // Açık/kapalı durumu buradan kontrol ediliyor
          showCollapsedOnMobile: props.isOpen,
          sortType: IkasProductFilterSortType.CUSTOM_SORT,
          customSortedValues: null,
        }}
        onClickExpandButton={props.onToggle} // Toggle işlemi buradan tetikleniyor
      >
        <S.DescriptionWrapper>
          <S.Description
            dangerouslySetInnerHTML={{ __html: props.product.description }}
          />
        </S.DescriptionWrapper>
      </FiltersSvgWrapper>
    </S.DescriptionWrapperTop>
  );
};
