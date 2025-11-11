import React from "react";
import { observer } from "mobx-react-lite";
import { ProductDetailProps } from "../__generated__/types";
import Slider from "./slider";
import Detail from "./detail";
import styles from "./style.module.css";
import { BankTableProvider } from "./BankTableContext";
import { useScreen } from "src/utils/hooks/useScreen";

export const NS = "product-detail";

const ProductDetail = (props: ProductDetailProps) => {
  const { bankTable } = props;

  const { isMobile } = useScreen();

  return (
    <BankTableProvider bankTable={bankTable}>
      {/*// Divider - Ayrık Çizgisi */}
      {!isMobile && <div className={styles.divider} />}
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {/*// Mobil İçerik */}
          {isMobile ? (
            <div className={styles.product_detail}>
              <div className={styles.product_slider}>
                <Slider {...props} />
              </div>
              <div className={styles.product_detail_content}>
                <Detail {...props} />
              </div>
            </div>
          ) : (
            <>
              {/*// web İçerik */}
              <div className={styles.product_detail}>
                <div className={styles.product_slider}>
                  <Slider {...props} />
                </div>
                <div className={styles.product_detail_content}>
                  <Detail {...props} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </BankTableProvider>
  );
};

export default observer(ProductDetail);
