import React, { useState } from "react";
import { FaqProps } from "../__generated__/types";
import styles from "./style.module.css";
import NavigationFooterLinks from "./navigation-footer-links";
import { Image, Link } from "@ikas/storefront";
import { toJS } from "mobx";
import { useScreen } from "src/utils/hooks/useScreen";

const faq: React.FC<FaqProps> = (props) => {
  const {
    title,
    textPicture,
    imageWeb,
    imageMobile,
    contents,

    footer_links,

    titleRight,
    contentRight,
    btnRight,
    btnRightLink,
  } = props;

  const { isMobile } = useScreen();

  // Her bir seçenek için açılma durumunu tutacak state
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // soruların biri açıldığı zaman diğer açık olanlar oto. kapansın
  const toggleContent = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null); // Aynı öğeye tıklanınca kapat
    } else {
      setOpenIndex(index); // Diğer öğeler kapalı kalırken tıklananı aç..
    }
  };

  const sssOptions = contents
    ? toJS(contents).map((item: any) => {
        console.log("item::", item); // item'ı konsola yazdır
        return {
          title: item?.question,
          content: item?.answer,
        };
      })
    : []; // Eğer titleAndContent undefined ise boş dizi

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

        {/* İçerikler */}
        <div className={styles.contentGrid}>
          <div className={styles.mainContent}>
            {sssOptions.map((option, index) => (
              <div
                key={index}
                className={styles.toggleWrapper}
                onClick={() => toggleContent(index)}
              >
                <div className={styles.title_and_icon}>
                  {/* Title */}
                  <h2 className={styles.toggleHeading}>{option.title}</h2>

                  {/* Ok simgesi */}
                  <div className={styles.icon}>
                    {openIndex === index ? <ArrowUpSVG /> : <ArrowDownSVG />}
                  </div>
                </div>

                {/* İçerik */}
                <div
                  className={`${styles.content} ${
                    openIndex === index ? styles.open : ""
                  }`}
                  dangerouslySetInnerHTML={{ __html: option.content }}
                />
              </div>
            ))}
          </div>
          <div className={styles.sideContent}>
            <h3>{titleRight}</h3>
            <p>{contentRight}</p>
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

export default faq;

// SVG
// Modern SVG Icons
const ArrowUpSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 15l-6-6-6 6" />
  </svg>
);

const ArrowDownSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);
