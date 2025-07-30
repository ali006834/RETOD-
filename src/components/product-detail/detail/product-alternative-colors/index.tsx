import React, { useState, useEffect } from "react";
import {
  IkasProduct,
  IkasProductAttributeType,
  IkasProductAttributeValue,
  Link,
} from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import { ProductDetailProps } from "src/components/__generated__/types";
import Loading from "src/components/svg/loading";
import styles from "./../style.module.css";

import * as S from "./style";

export const ProductAlternativeColors = observer(
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
    case IkasProductAttributeType.PRODUCT:
      return <ProductAttributeValue {...props} />;
    default:
      return null;
  }
};

const ProductAttributeValue = ({ attribute }: AttributeValueProps) => {
  const [pending, setPending] = useState(true);
  const [products, setProducts] = useState<IkasProduct[] | null>(null);
  useEffect(() => {
    const set = async () => {
      setPending(true);
      const _products = await attribute.products;
      setPending(false);
      _products && setProducts(_products);
    };
    set();
  }, [attribute.value]);

  return (
    <>
      <h3 className={styles.alternative_colors_title}>
        {attribute.productAttribute?.name}
      </h3>
      {pending && <Loading />}
      <div className={styles.alternative_colors}>
        {!pending &&
          products?.map((product) => (
            <div key={product.id}>
              <Link href={product.href}>
                <a>
                  <img
                    src={product?.variants[0]?.mainImage?.image?.src}
                    alt={product?.variants[0]?.mainImage?.image?.altText || ""}
                  />
                </a>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};
