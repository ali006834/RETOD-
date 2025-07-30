import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";
import { FeaturedProductShowcaseProps } from "../__generated__/types";
import { Image, Link } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";

const BannerSingle = (props: FeaturedProductShowcaseProps) => {
  const {
    products,

    headerText,
    titleText,
    contentText,
    btnText,
    btnLink,
  } = props;

  const { isMobile } = useScreen();

  if (!products || !headerText) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}></div>
    </div>
  );
};

export default observer(BannerSingle);
