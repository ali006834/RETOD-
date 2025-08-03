import React from "react";
import { observer } from "mobx-react-lite";
import { ProductDetailProps } from "src/components/__generated__/types";
import { useTranslation } from "@ikas/storefront";
import { FiltersSvgWrapper } from "src/components/product-list/filter/components/filters-svg-wrapper";
import RefundIcon from "./svg/gift.svg";
import styles from "./style.module.css";
import { useRouter } from "next/router";

import * as S from "../style";

const Refund = (
  props: { isOpen: boolean; onToggle: () => void } & ProductDetailProps
) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { deliveryDescription, deliveryDescriptionLink } = props; //Üst bileşen index.tsx den props alıyor. Satır:53

  //Yönlendirme
  const handleLinkClick = () => {
    if (deliveryDescriptionLink) {
      if (deliveryDescriptionLink.isExternal) {
        window.open(deliveryDescriptionLink.href, "_blank");
      } else {
        window.open(deliveryDescriptionLink.href, "_blank");
      }
    }
  };

  return (
    <S.DescriptionWrapperTop>
      <FiltersSvgWrapper
        title={t("product-detail:refund")}
        svg={RefundIcon?.src}
        settings={{
          showCollapsedOnDesktop: props.isOpen,
          showCollapsedOnMobile: props.isOpen,
        }}
        onClickExpandButton={props.onToggle}
      >
        <div onClick={handleLinkClick} className={styles.contentHtml}>
          <S.DescriptionWrapper>
            <S.Description
              dangerouslySetInnerHTML={{
                __html: deliveryDescription || "",
              }}
            />
          </S.DescriptionWrapper>
        </div>
      </FiltersSvgWrapper>
    </S.DescriptionWrapperTop>
  );
};

export default observer(Refund);
