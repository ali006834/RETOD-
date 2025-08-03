import React from "react";
import { DistanceSalesAgreementProps } from "../__generated__/types";
import styles from "./style.module.css";
import NavigationFooterLinks from "./navigation-footer-links";
import { Image, Link } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";

const DistanceSalesAgreement: React.FC<DistanceSalesAgreementProps> = (
  props
) => {
  const {
    imageWeb,
    imageMobile,
    textPicture,

    footer_links,

    title,
    content,

    titleRight,
    contentRight,
    btnRight,
    btnRightLink,
  } = props;

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
        <div className={styles.contentGrid}>
          <div className={styles.mainContent}>
            {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
          </div>
          <div className={styles.sideContent}>
            <h3>{titleRight}</h3>
            {contentRight && (
              <p dangerouslySetInnerHTML={{ __html: contentRight }} />
            )}
            {btnRightLink && (
              <Link href={btnRightLink} passHref>
                <a className={styles.contactButton}>{btnRight}</a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistanceSalesAgreement;
