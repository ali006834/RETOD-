import React, { useState } from "react";

import { ProductDetailProps } from "src/components/__generated__/types";
import { IkasProductFilterSortType, useTranslation } from "@ikas/storefront";
import { FiltersSvgWrapper } from "src/components/product-list/filter/components/filters-svg-wrapper";
import Shirt from "./svg/shirt.svg";

import * as S from "../style";

export const Description = (
  props: ProductDetailProps & { isOpen: boolean; onToggle: () => void }
) => {
  const { t } = useTranslation();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  if (!props?.product?.description) return null;

  // Her kelimenin ilk harfini büyük yapan fonksiyon
  const capitalizeText = (text: string | null | undefined) => {
    if (!text) return "";
    return text
      .toLocaleLowerCase("tr-TR")
      .split(" ")
      .map((word) => word.charAt(0).toLocaleUpperCase("tr-TR") + word.slice(1))
      .join(" ");
  };

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
            $isExpanded={isDescriptionExpanded}
            dangerouslySetInnerHTML={{ __html: props.product.description }}
          />
          <S.ProductAttributesWrapper>
            {props?.product?.attributes &&
              props.product.attributes.length > 0 && (
                <ul>
                  {props.product.attributes.map((attr, index) => (
                    <li key={index}>
                      {/* <strong>{attr?.productAttribute?.name}</strong>:{" "} */}
                      {capitalizeText(attr?.value)}
                    </li>
                  ))}
                </ul>
              )}
          </S.ProductAttributesWrapper>
          <S.ShowMoreButton
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          >
            {isDescriptionExpanded
              ? t("common:productDetail.description.showLess")
              : t("common:productDetail.description.showMore")}
          </S.ShowMoreButton>
        </S.DescriptionWrapper>
      </FiltersSvgWrapper>
    </S.DescriptionWrapperTop>
  );
};
