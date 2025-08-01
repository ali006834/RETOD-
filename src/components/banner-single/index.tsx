import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";
import { BannerSingleProps } from "../__generated__/types";
import { Image, Link } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";

const BannerSingle = (props: BannerSingleProps) => {
  const {
    imageWeb,
    imageMobil,
    navigationLink,
    headerText,
    contentText,
    btnText,
  } = props;

  const { isMobile } = useScreen();

  if (!imageWeb || !imageMobil) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.bannerWrapper}>
          {isMobile ? (
            <Image
              width={750}
              height={1100}
              image={imageMobil}
              alt={imageMobil?.altText || ""}
              useBlur={true}
              className={styles.bannerImage}
            />
          ) : (
            <Image
              width={2880}
              height={1350}
              alt={imageWeb?.altText || ""}
              image={imageWeb}
              useBlur={true}
              className={styles.bannerImage}
            />
          )}
        </div>

        <div className={styles.contentWrapper}>
          {headerText && <h2 className={styles.bannerHeader}>{headerText}</h2>}
          {contentText && <p className={styles.bannerContent}>{contentText}</p>}
          {btnText && (
            <Link href={navigationLink?.href || ""}>
              <a className={styles.bannerButton}>{btnText}</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(BannerSingle);
