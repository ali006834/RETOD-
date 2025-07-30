import React from "react";
import { observer } from "mobx-react-lite";
import { ProductDetailProps } from "../__generated__/types";
import Slider from "./slider";
import Detail from "./detail";
import styles from "./style.module.css";
import { BankTableProvider } from "./BankTableContext";
import { Link, useTranslation } from "@ikas/storefront";
import ArrowRightIcon from "src/components/svg/arrow-right";
import { useRouter } from "next/router";
import { toJS } from "mobx";
import { useScreen } from "src/utils/hooks/useScreen";

export const NS = "product-detail";

const ProductDetail = (props: ProductDetailProps) => {
  const { bankTable, product } = props;

  const productArray = toJS(product?.categories);
  const { t } = useTranslation();
  const router = useRouter();
  const { isMobile, isTablet, isDesktop } = useScreen();

  const renderBreadcrumb = () => {
    if (router.query?.s) {
      return <span>"{router.query.s}"</span>;
    }

    return (
      <>
        <Link href="/">
          <a>{t("common:list.home")}</a>
        </Link>
        <ArrowRightIcon />

        {/* Kategoriler */}
        {Array.isArray(productArray) && productArray.length > 0 && (
          <>
            {productArray.map((category, index) => (
              <React.Fragment key={category.id}>
                <Link href={`/category/${category.name}`}>
                  <a>{category.name}</a>
                </Link>
                {index < productArray.length - 1 ? " / " : <ArrowRightIcon />}
              </React.Fragment>
            ))}
          </>
        )}

        {/* Ürün adı */}
        {product?.name && (
          <span className={styles.product_name}>
            {isMobile ? (
              product.name.length > 30 ? (
                `${product.name.slice(0, 30)}...`
              ) : (
                product.name
              )
            ) : (
              <span className={styles.product_name}>{product.name}</span>
            )}
          </span>
        )}
      </>
    );
  };

  return (
    <BankTableProvider bankTable={bankTable}>
      {/*//= Divider - Ayrık Çizgisi */}
      {!isMobile && <div className={styles.divider} />}
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {/*//= Breadcrumb */}
          <div className={styles.tittle_container}>{renderBreadcrumb()}</div>
          {/*//= İçerikler */}
          <div className={styles.product_detail}>
            <div className={styles.product_slider}>
              <Slider {...props} />
            </div>
            <div className={styles.product_detail_content}>
              <Detail {...props} />
            </div>
          </div>
        </div>
      </div>
    </BankTableProvider>
  );
};

export default observer(ProductDetail);
