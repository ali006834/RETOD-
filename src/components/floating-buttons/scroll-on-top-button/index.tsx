import React from "react";
import ArrowTopSvg from "../svg/arrow-top";
import styles from "./style.module.css";

const ScrollOnTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={styles.scrollButton}
      onClick={scrollToTop}
      aria-label="Yukarı kaydır"
      type="button"
    >
      <ArrowTopSvg />
    </button>
  );
};

export default ScrollOnTopButton;
