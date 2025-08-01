import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";
import { BannerSingleProps } from "../__generated__/types";
import { Image, Link } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";

const BannerSingle = (props: BannerSingleProps) => {
  const { headerText, contentText, btnText, navigationLink } = props;

  const { isMobile } = useScreen();

  if (!headerText) {
    return null;
  }

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            {headerText && (
              <h2 className={styles.bannerHeader}>
                {headerText.toLocaleUpperCase("tr-TR")}
              </h2>
            )}
            {contentText && (
              <p className={styles.bannerContent}>{contentText}</p>
            )}
            {btnText && (
              <Link href={navigationLink?.href || ""}>
                <a className={styles.bannerButton}>
                  {btnText.toLocaleUpperCase("tr-TR")}
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(BannerSingle);
