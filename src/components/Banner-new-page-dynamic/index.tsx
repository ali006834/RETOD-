import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";
import { BannerNewPageDynamicProps } from "../__generated__/types";
import { Image, Link } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";

const BannerNewPageDynamic = (props: BannerNewPageDynamicProps) => {
  const { bannerSelection, showFullPage } = props;
  const { isMobile } = useScreen();

  if (!bannerSelection || bannerSelection.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.container}
        style={{ maxWidth: showFullPage ? "100%" : "1440px" }}
      >
        {bannerSelection?.map((item: any, index: number) => {
          return <div key={index}>{item.render()}</div>;
        })}
      </div>
    </div>
  );
};

export default observer(BannerNewPageDynamic);
