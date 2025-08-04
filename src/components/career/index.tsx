import React from "react";
import { ContactProps } from "../__generated__/types";
import styles from "./style.module.css";
import NavigationFooterLinks from "./navigation-footer-links";
import { Image, Link, useTranslation } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";
import { toJS } from "mobx";
import DotIcon from "./svg/dot";
import ContactForm from "./form";

const Contact: React.FC<ContactProps> = (props) => {
  const {
    imageWeb,
    imageMobile,
    title,
    textPicture,

    footer_links,

    formTitle,
    contactForm,

    contactInformation,
    mapLink,
  } = props;

  const { t } = useTranslation();
  const { isMobile } = useScreen();

  return (
    <div className={styles.wrapper}>
      <div className={styles.heroViewport}>
        <div className={styles.heroImage}>
          {(isMobile ? imageMobile : imageWeb) && (
            <Image
              layout="responsive"
              width={isMobile ? "800px" : "3000px"}
              height={isMobile ? "495px" : "797px"}
              objectFit="contain"
              useBlur={true}
              image={isMobile ? imageMobile! : imageWeb!}
              alt={
                isMobile
                  ? imageMobile?.altText || undefined
                  : imageWeb?.altText || undefined
              }
            />
          )}
        </div>
        <div className={styles.heroContent}>
          {title && <h1 className={styles.title}>{title}</h1>}
          {textPicture && <p className={styles.textPicture}>{textPicture}</p>}
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.FooterLinks}>
          <NavigationFooterLinks footer_links={footer_links} />
          <div className={styles.navDivider}></div>
        </div>

        {/* Content Section */}
        <div className={styles.about_content}>
          <div className={styles.content_container}>
            <div className={styles.main_content}>
              <div
                className={styles.about_text}
                dangerouslySetInnerHTML={{ __html: formTitle || "" }}
              />
            </div>
          </div>
          {/* İletişim Formu */}
          <ContactForm
            contactForm={
              (Array.isArray(contactForm)
                ? contactForm.filter((item) => typeof item.name === "string")
                : []) as { name: string; messageType: any[] }[]
            }
            contactInformation={contactInformation}
            mapLink={mapLink}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
