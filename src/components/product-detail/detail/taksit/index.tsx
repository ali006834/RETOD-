import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "@ikas/storefront";
import { FiltersSvgWrapper } from "src/components/product-list/filter/components/filters-svg-wrapper";
import BankTable from "./bankTable";
import * as S from "../style";
import { ProductDetailProps } from "src/components/__generated__/types";

const Taksit = (props: {
  isOpen: boolean;
  onToggle: () => void;
  product: ProductDetailProps["product"];
}) => {
  const { t } = useTranslation();
  const { product } = props;

  return (
    <S.DescriptionWrapperTopTaksit>
      <FiltersSvgWrapper
        title={t("product-detail:instalment")}
        svg="./svg/payment.svg"
        settings={{
          showCollapsedOnDesktop: props.isOpen,
          showCollapsedOnMobile: props.isOpen,
        }}
        onClickExpandButton={props.onToggle}
      >
        <S.DescriptionWrapper>
          <S.Description $isExpanded={true}>
            <BankTable product={product} />
          </S.Description>
        </S.DescriptionWrapper>
      </FiltersSvgWrapper>
    </S.DescriptionWrapperTopTaksit>
  );
};

export default observer(Taksit);
