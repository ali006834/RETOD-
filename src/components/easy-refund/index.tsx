import React from "react";
import { EasyRefundProps } from "../__generated__/types";
import styles from "./style.module.css";
import { Image, Link, useTranslation } from "@ikas/storefront";
import NavigationFooterLinks from "./navigation-footer-links";
import { useScreen } from "src/utils/hooks/useScreen";
import { toJS } from "mobx";
import RefundForm from "./form";

const EasyRefund: React.FC<EasyRefundProps> = (props) => {
  const {
    web3FormsAccessKey,
    image,
    imageMobil,
    title,
    content,
    otherLinks,
    refundForm,
  } = props;
  const { t } = useTranslation();
  const { isMobile } = useScreen();
  const hasImage = isMobile ? imageMobil : image;

  return (
    <div className={styles.about_wrapper}>
      {!isMobile && <div className={styles.divider} />}
      {/* Hero Banner Section */}
      {hasImage && (
        <div className={styles.hero_banner}>
          <div className={styles.hero_image_container}>
            {(isMobile ? imageMobil : image) != null && (
              <Image
                image={isMobile ? imageMobil! : image!}
                objectFit="cover"
                layout="fill"
                useBlur={true}
                alt={(isMobile ? imageMobil?.altText : image?.altText) || ""}
                className={styles.hero_image}
              />
            )}
          </div>
          <div className={styles.hero_overlay}>
            <div className={styles.hero_content}>
              <h1 className={styles.hero_title}>
                {title?.toLocaleUpperCase("tr-TR")}
              </h1>
              <div className={styles.hero_divider}></div>
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className={styles.about_content}>
        <div className={styles.content_container}>
          <div className={styles.sidebar}>
            <h3 className={styles.sidebar_title}>
              {t("common:productList.categories")}
            </h3>
            <NavigationFooterLinks
              footer_links={Array.isArray(otherLinks) ? otherLinks : undefined}
            />
          </div>
          <div className={styles.main_content}>
            <div
              className={styles.about_text}
              dangerouslySetInnerHTML={{ __html: content || "" }}
            />
          </div>
        </div>

        {/* İletişim Formu */}
        <RefundForm
          refundForm={
            (Array.isArray(refundForm)
              ? refundForm?.filter((item) => typeof item?.name === "string")
              : []) as { name: string; messageType: any[] }[]
          }
          accessKey={web3FormsAccessKey || ""}
        />
      </div>
    </div>
  );
};

export default EasyRefund;
