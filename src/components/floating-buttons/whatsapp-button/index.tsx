import React from "react";
import WhatsAppSvg from "../../svg/whatsapp";
import styles from "./style.module.css";

const WhatsAppButton = ({ phoneNumber }: { phoneNumber: string }) => {
  const handleWhatsAppClick = () => {
    // WhatsApp numarasını ve mesajını buraya ekleyebilirsiniz
    const message = "Merhaba, size ulaşmak istiyorum.";

    if (phoneNumber) {
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
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
