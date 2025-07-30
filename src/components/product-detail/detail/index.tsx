import React, { useState } from "react";
import styles from "./style.module.css";
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

const Detail = (props: ProductDetailProps) => {
  // Hangi bileşenin açık olduğunu takip eden state
  const [openSection, setOpenSection] = useState<
    "description" | "refund" | "taksit" | null
  >("description");

  const { deliveryDescription } = props;

  return (
    <div className={styles.detail_wrapper}>
      <div className={styles.detail_content}>
        <div className={styles.title_wrapper}>
          <Title {...props} />
        </div>
        <div>
          <ProductShortExplanation {...props} />
        </div>
        <ProductTag {...props} />
        <Price {...props} />
        <div className={styles.variantAndButton}>
          <Variants {...props} />
          <AddToCart {...props} />
        </div>
        <div className={styles.infos}>
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
