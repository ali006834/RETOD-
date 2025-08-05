import React from "react";
import { FloatingButtonsProps } from "../../__generated__/types";
import WhatsAppSvg from "../../svg/whatsapp";
import styles from "./style.module.css";

const WhatsAppButton = (props: FloatingButtonsProps) => {
  const { phoneNumber, messageText } = props;
  const handleWhatsAppClick = () => {
    if (phoneNumber) {
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        messageText || ""
      )}`;
      window.open(whatsappUrl, "_blank");
    } else {
      // Eğer numara belirtilmemişse, genel WhatsApp'ı aç
      window.open("https://wa.me/", "_blank");
    }
  };

  return (
    <button
      className={styles.whatsappButton}
      onClick={handleWhatsAppClick}
      aria-label="WhatsApp ile iletişime geç"
      type="button"
    >
      <WhatsAppSvg fill="#222" width="24" height="24" />
    </button>
  );
};

export default WhatsAppButton;
