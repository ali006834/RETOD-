import React, { useState, useEffect } from "react";
import { FloatingButtonsProps } from "../__generated__/types";
import ScrollOnTopButton from "./scroll-on-top-button";
import WhatsAppButton from "./whatsapp-button";
import styles from "./style.module.css";

const FloatingButtons = (props: FloatingButtonsProps) => {
  const { phoneNumber, togglePoint } = props;

  console.log("togglePoint::::", togglePoint);
  console.log("phoneNumber:::", phoneNumber);

  const [whatsappVisible, setWhatsappVisible] = useState(false);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const togglePointNumberInt = parseInt(togglePoint || "0");

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollY = window.pageYOffset;

      // Her iki buton da aynı scroll değerinde görünsün
      if (scrollY > togglePointNumberInt) {
        setWhatsappVisible(true);
        setScrollTopVisible(true);
      } else {
        setWhatsappVisible(false);
        setScrollTopVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [togglePointNumberInt]);

  return (
    <div className={styles.floatingButtons}>
      <div
        className={`${styles.buttonWrapper} ${
          whatsappVisible ? styles.visible : styles.hidden
        }`}
      >
        <WhatsAppButton phoneNumber={phoneNumber || ""} />
      </div>
      <div
        className={`${styles.buttonWrapper} ${
          scrollTopVisible ? styles.visible : styles.hidden
        }`}
      >
        <ScrollOnTopButton />
      </div>
    </div>
  );
};

export default FloatingButtons;
