import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./style.module.css";

import { Image } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import { WelcomePopupProps } from "../__generated__/types";
import { useScreen } from "src/utils/hooks/useScreen";

const WelcomePopup = (props: WelcomePopupProps) => {
  const { bgImageWeb, bgImageMobile, titleText, contentText, btnText } = props;
  const { isMobile } = useScreen();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Kullanıcının hoş geldin popup'ını daha önce gördüğünü kontrol et...
    const welcomePopup = localStorage.getItem("welcomePopup");
    const lastShown = localStorage.getItem("welcomePopupLastShown");

    // 24 saat kontrolü
    const now = new Date().getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000; // her 24 saatte bir sıfırla ve tekrar göster

    if (!welcomePopup || !lastShown || now - parseInt(lastShown) > oneDayInMs) {
      // Sayfanın tam yüklenmesini bekle...
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    const now = new Date().getTime();
    localStorage.setItem("welcomePopup", "seen");
    localStorage.setItem("welcomePopupLastShown", now.toString());
    setIsVisible(false);
  };

  const handleSubscribe = () => {
    // Login sayfasına yönlendir
    const now = new Date().getTime();
    localStorage.setItem("welcomePopup", "seen");
    localStorage.setItem("welcomePopupLastShown", now.toString());
    setIsVisible(false);
    router.push("/account/login");
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.welcomeOverlay}>
      <div className={styles.welcomePopup}>
        <button onClick={handleClose} className={styles.closeButton}>
          ×
        </button>

        <div className={styles.popupContent}>
          {/* Model Image Section */}
          <div className={styles.imageSection}>
            {isMobile && bgImageMobile ? (
              <Image
                width={800}
                height={1329}
                image={bgImageMobile}
                alt={bgImageMobile?.altText || "Welcome Mobile Image"}
                useBlur={true}
                className={styles.modelImage}
              />
            ) : (
              bgImageWeb && (
                <Image
                  width={680}
                  height={500}
                  image={bgImageWeb}
                  alt={bgImageWeb?.altText || "Welcome Web Image"}
                  useBlur={true}
                  className={styles.modelImage}
                />
              )
            )}
          </div>

          {/* Text Overlay Section */}
          <div className={styles.textOverlay}>
            {titleText && <h1 className={styles.welcomeTitle}>{titleText}</h1>}

            {contentText && (
              <p
                className={styles.welcomeDescription}
                dangerouslySetInnerHTML={{
                  __html: contentText,
                }}
              ></p>
            )}

            {btnText && (
              <button
                onClick={handleSubscribe}
                className={styles.subscribeButton}
              >
                {btnText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(WelcomePopup);
