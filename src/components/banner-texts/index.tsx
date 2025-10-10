import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";
import { BannerTextsProps } from "../__generated__/types";
import { Image, Link } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";

const BannerTexts = (props: BannerTextsProps) => {
  const {
    webMarginValue,
    mobilMarginValue,
    headerText,
    contentText,
    btnText,
    navigationLink,
    bgColor,
  } = props;

  const { isMobile } = useScreen();

  if (!headerText) {
    return null;
  }

  return (
    <div
      className={styles.mainWrapper}
      style={{
        backgroundColor: bgColor || "#f6f1eb",
        margin: isMobile ? mobilMarginValue || "0px" : webMarginValue || "0px",
      }}
    >
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            {headerText && (
              <h2 className={styles.bannerHeader}>{headerText}</h2>
            )}
            {contentText && (
              <p className={styles.bannerContent}>{contentText}</p>
            )}
            {btnText && (
              <Link href={navigationLink?.href || ""}>
                <a className={styles.bannerButton}>{btnText}</a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(BannerTexts);
