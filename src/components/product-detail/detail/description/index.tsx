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
        title={t("product-detail:description")}
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
          <S.ProductAttributesWrapper>
            {props?.product?.attributes &&
              props.product.attributes.length > 0 && (
                <ul>
                  {props.product.attributes.map((attr, index) => (
                    <li key={index}>
                      <strong>{attr?.productAttribute?.name}</strong>:{" "}
                      {attr?.value}
                    </li>
                  ))}
                </ul>
              )}
          </S.ProductAttributesWrapper>{" "}
        </S.DescriptionWrapper>
      </FiltersSvgWrapper>
    </S.DescriptionWrapperTop>
  );
};
