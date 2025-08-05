import React, { useState } from "react";
import { RewardsProps } from "../__generated__/types";
import styles from "./style.module.css";
import NavigationFooterLinks from "./navigation-footer-links";
import { Image, Link } from "@ikas/storefront";
import { toJS } from "mobx";
import { useScreen } from "src/utils/hooks/useScreen";

const rewards: React.FC<RewardsProps> = (props) => {
  const {
    title,
    textPicture,
    imageWeb,
    imageMobile,

    awardTitle,
    awardContent,
    rewardPackages,

    productShowcaseTitle,
    productShowcaseContent,
    showcaseProducts,
    productShowcaseBtnLink,

    contents,
    contentsTitle,
    contentsOrientation,
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
      {/* Award Section */}
      <div className={styles.awardSection}>
        <div className={styles.awardContainer}>
          {awardTitle && <h2 className={styles.awardTitle}>{awardTitle}</h2>}
          {awardContent && (
            <p
              className={styles.awardContent}
              dangerouslySetInnerHTML={{ __html: awardContent }}
            />
          )}

          {rewardPackages && Array.isArray(rewardPackages) && (
            <div className={styles.rewardPackages}>
              {rewardPackages.map((packageItem: any, index: number) => (
                <div key={index} className={styles.packageCard}>
                  {packageItem.title && <h3>{packageItem.title}</h3>}
                  {packageItem.description && <p>{packageItem.description}</p>}
                  {packageItem.price && (
                    <span className={styles.price}>{packageItem.price}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className={styles.memberSection}>
            <h2 className={styles.memberTitle}>Not a member yet?</h2>
            <p className={styles.memberDescription}>
              Create an account to join NET-A-PORTER Rewards or sign in to track
              your progress in your account{" "}
            </p>
            <div className={styles.memberButtons}>
              <button className={styles.memberButton}>Create Account</button>
              <button className={styles.memberButton}>Sign In</button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.navDivider}></div>

      {/* Product Showcase Section */}
      <div className={styles.productShowcaseSection}>
        <div className={styles.showcaseContainer}>
          {productShowcaseTitle && (
            <h2 className={styles.showcaseTitle}>{productShowcaseTitle}</h2>
          )}
          {productShowcaseContent && (
            <p
              className={styles.showcaseContent}
              dangerouslySetInnerHTML={{ __html: productShowcaseContent }}
            />
          )}

          {showcaseProducts && showcaseProducts.data && (
            <div className={styles.productsGrid}>
              {showcaseProducts.data.map((product: any, index: number) => (
                <div key={index} className={styles.productCard}>
                  {product.featuredImage && (
                    <Image
                      layout="responsive"
                      width="300px"
                      height="400px"
                      objectFit="cover"
                      useBlur={true}
                      image={product.featuredImage}
                      alt={
                        product.featuredImage?.altText ||
                        product.name ||
                        "Product"
                      }
                    />
                  )}
                  {product.name && <h3>{product.name}</h3>}
                  {product.price && (
                    <span className={styles.productPrice}>
                      {product.price.selling}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {productShowcaseBtnLink && (
            <div className={styles.showcaseButtonWrapper}>
              <Link href={productShowcaseBtnLink} passHref>
                <a className={styles.showcaseButton}>View All Products</a>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.FooterLinks}>
          <NavigationFooterLinks footer_links={undefined} />
          <div className={styles.navDivider}></div>
        </div>

        {/* Contents Title and Orientation */}
        <div className={styles.contentsHeader}>
          {contentsTitle && (
            <h2 className={styles.contentsTitle}>{contentsTitle}</h2>
          )}
          {contentsOrientation && (
            <p
              className={styles.contentsOrientation}
              dangerouslySetInnerHTML={{ __html: contentsOrientation }}
            />
          )}
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
        </div>
      </div>
    </div>
  );
};

export default rewards;

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
