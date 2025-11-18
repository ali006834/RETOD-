import React, { useState } from "react";
import { ProductDetailProps } from "src/components/__generated__/types";
import { observer } from "mobx-react-lite";

import { Variants } from "./variants/index";
import { Price } from "./price";
import { Description } from "./description";
import { AddToCart } from "./add-to-cart";
import { Title } from "./title";
import { ProductTag } from "./product-tag";
import Refund from "./refund";
import Taksit from "./taksit";
import { ProductShortExplanation } from "./product-short-explanation";

import { ProductShortSKU } from "./product-short-sku";
import { CompleteTheLook } from "./complete-the-look";
import { ProductStats } from "./product-stats";

import styles from "./style.module.css";

const Detail = (props: ProductDetailProps) => {
  // Kombin attribute'unu kontrol et
  const kombinAttribute = props.product?.attributes?.find(
    (attr) => attr.productAttribute?.name?.toLowerCase() === "kombin"
  );

  // Eğer Kombin attribute'u varsa complete-the-look, yoksa description açık olsun
  const defaultOpenSection =
    kombinAttribute &&
    kombinAttribute.products &&
    kombinAttribute.products.length > 0
      ? "complete-the-look"
      : "description";

  // Hangi bileşenin açık olduğunu takip eden state
  const [openSection, setOpenSection] = useState<
    "description" | "refund" | "taksit" | "complete-the-look" | null
  >(defaultOpenSection);

  const { deliveryDescription } = props;

  return (
    <div className={styles.detail_wrapper}>
      <div className={styles.detail_content}>
        <div className={styles.brand_name_wrapper}>
          {props.product?.brand?.name && (
            <span className={styles.brand_name}>
              {props.product?.brand?.name}
            </span>
          )}
        </div>

        <div className={styles.title_wrapper}>
          <Title {...props} />
          <ProductShortSKU {...props} />
        </div>
        <div>
          <ProductShortExplanation {...props} />
        </div>
        <ProductTag {...props} />
        <Price {...props} />
        <div className={styles.variantAndButton}>
          <Variants {...props} />
          <AddToCart {...props} />
          <ProductStats {...props} />
        </div>
        <div className={styles.infos}>
          <CompleteTheLook
            {...props}
            isOpen={openSection === "complete-the-look"}
            onToggle={() =>
              setOpenSection(
                openSection === "complete-the-look" ? null : "complete-the-look"
              )
            }
          />
          <Description
            {...props}
            isOpen={openSection === "description"}
            onToggle={() =>
              setOpenSection(
                openSection === "description" ? null : "description"
              )
            }
          />
          <Refund
            isOpen={openSection === "refund"}
            onToggle={() =>
              setOpenSection(openSection === "refund" ? null : "refund")
            }
            deliveryDescription={deliveryDescription}
          />
          <Taksit
            isOpen={openSection === "taksit"}
            onToggle={() =>
              setOpenSection(openSection === "taksit" ? null : "taksit")
            }
            product={props.product}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(Detail);
