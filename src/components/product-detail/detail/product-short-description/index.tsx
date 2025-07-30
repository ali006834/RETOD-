import React from "react";
import {
  IkasProductAttributeType,
  IkasProductAttributeValue,
} from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import { ProductDetailProps } from "src/components/__generated__/types";

import * as S from "./style";
import styles from "../style.module.css";
import { useTranslation } from "@ikas/storefront";

export const ProductShortDescription = observer(
  ({ product }: ProductDetailProps) => {
    if (!product?.attributes) return null;
    return (
      <S.ProductAttributes>
        {product?.attributes.map((attribute) => (
          <AttributeValue
            key={attribute.productAttributeId}
            attribute={attribute}
          />
        ))}
      </S.ProductAttributes>
    );
  }
);

type AttributeValueProps = { attribute: IkasProductAttributeValue };

const AttributeValue = (props: AttributeValueProps) => {
  switch (props.attribute.productAttribute?.type) {
    case IkasProductAttributeType.HTML:
      return <HTMLAttributeValue {...props} />;
    default:
      return null;
  }
};

const AttributeValueWrapper = (props: {
  header?: string;
  children: React.ReactNode;
}) => {
  return (
    <S.AttributeValueWrapper header={props.header || ""}>
      {props.children}
    </S.AttributeValueWrapper>
  );
};

const HTMLAttributeValue = ({ attribute }: AttributeValueProps) => {
  const { t } = useTranslation();
  if (!attribute.value) return null;
  return (
    <div>
      <div className={styles.sort_title}>{t("product-detail:shortDetail")}</div>
      <div
        className="wysiwyg"
        dangerouslySetInnerHTML={{ __html: attribute.value }}
      />
    </div>
  );
};
