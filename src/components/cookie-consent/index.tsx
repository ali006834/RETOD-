import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { useTranslation } from "@ikas/storefront";

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already seen the notification
    const cookieNotification = localStorage.getItem("cookieNotification");
    if (!cookieNotification) {
      // Add a small delay to ensure the page is fully loaded
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("cookieNotification", "seen");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  const { t } = useTranslation();

  return (
    <div className={styles.cookiePopup}>
      <div className={styles.cookieContent}>
        <button onClick={handleClose} className={styles.closeButton}>
          ×
        </button>
        <div className={styles.cookieText}>
          <h3 className={styles.cookieTitle}>
            {t("cookie-consent:cookieConsent.title")}
          </h3>
          <p
            className={styles.cookieDescription}
            dangerouslySetInnerHTML={{
              __html: t("cookie-consent:cookieConsent.description"),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
