import React from "react";
import { FloatingButtonsProps } from "../../__generated__/types";
import WhatsAppSvg from "../../svg/whatsapp";
import styles from "./style.module.css";

const WhatsAppButton = (props: FloatingButtonsProps) => {
  const phoneNumber = props.phoneNumber || "905548952220";
  const messageText =
    props.messageText || "Merhaba; {{KONU}} Hakkında Bilgi Almak İstiyorum.";

  const handleWhatsAppClick = () => {
    // Telefon numarasını temizle - sadece rakamları al
    const cleanPhone = phoneNumber.replace(/\D/g, "");
    // Mesaj metnini temizle - gereksiz boşlukları kaldır
    const cleanMessage = messageText.trim();

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
      cleanMessage
    )}`;
    window.open(whatsappUrl, "_blank");
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
