import React, { useState } from "react";
import { RewardsProps } from "../__generated__/types";
import styles from "./style.module.css";
import NavigationFooterLinks from "./navigation-footer-links";
import { IkasProduct, Image, Link, useTranslation } from "@ikas/storefront";
import { toJS } from "mobx";
import { useScreen } from "src/utils/hooks/useScreen";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { observer } from "mobx-react-lite";

const rewards: React.FC<RewardsProps> = (props) => {
  const {
    title,
    textPicture,
    imageWeb,
    imageMobile,

    awardTitle,
    awardContent,
    rewardPackages,
    awardNotes,

    productShowcaseTitle,
    productShowcaseContent,
    showcaseProducts,
    productShowcaseBtnLink,

    contents,
    contentsTitle,
    contentsOrientation,
  } = props;

  const { isMobile } = useScreen();
  const rewardPackagesArr = toJS(rewardPackages);

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
        return {
          title: item?.question,
          content: item?.answer,
        };
      })
    : []; // Eğer titleAndContent undefined ise boş dizi

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const { t } = useTranslation();

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

          {/*//+ Rewards Paketleri  */}
          {rewardPackagesArr && (
            <div className={styles.rewardPackagesGrid}>
              <Slider {...sliderSettings}>
                {rewardPackagesArr.map((packageItem: any, index: number) => (
                  <div key={index} className={styles.packageCardCustom}>
                    {/* Package Header (Title + Spending Limit) */}
                    <div className={styles.packageHeader}>
                      <span className={styles.packageTitle}>
                        {packageItem?.packageTitle}
                      </span>
                      <span className={styles.spendingLimit}>
                        {packageItem?.spendingLimit}
                      </span>
                    </div>

                    {/* Package Image */}
                    {packageItem?.packageImage && (
                      <div className={styles.packageImageWrapper}>
                        <Image
                          // width={1500}
                          // height={325}
                          objectFit="cover"
                          layout="fill"
                          useBlur={true}
                          image={packageItem?.packageImage}
                          alt={
                            packageItem?.packageImage?.altText ||
                            packageItem?.packageTitle ||
                            "Reward package"
                          }
                        />
                      </div>
                    )}

                    {/* Package Benefits Grid */}
                    {packageItem?.packageBenefits &&
                      Array.isArray(packageItem?.packageBenefits) && (
                        <div className={styles.packageBenefitsGrid}>
                          {packageItem?.packageBenefits.map(
                            (benefit: any, bIndex: number) => (
                              <div key={bIndex} className={styles.benefitItem}>
                                <div className={styles.benefitTitle}>
                                  {benefit?.title}
                                </div>
                                {benefit?.description && (
                                  <div className={styles.benefitDescription}>
                                    {benefit?.description}
                                  </div>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      )}

                    {/* Award Notes */}
                    {awardNotes && (
                      <div className={styles.awardNotes}>{awardNotes}</div>
                    )}
                  </div>
                ))}
              </Slider>
            </div>
          )}

          <div className={styles.memberSection}>
            <h2 className={styles.memberTitle}>{t("rewards:notAMemberYet")}</h2>
            <p className={styles.memberDescription}>
              {t("rewards:createAccountDescription")}
            </p>
            <div className={styles.memberButtons}>
              <button className={styles.memberButton}>
                {t("rewards:createAccount")}
              </button>
              <button className={styles.memberButton}>
                {t("rewards:signIn")}
              </button>
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
                <div key={index} className={styles.product_container}>
                  <Link href={product.href}>
                    <a>
                      <ProductImage product={product} />
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {productShowcaseBtnLink && (
            <div className={styles.showcaseButtonWrapper}>
              <Link href={productShowcaseBtnLink} passHref>
                <a className={styles.showcaseButton}>
                  {t("rewards:viewAllProducts")}
                </a>
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

//Tip Tanımlaması
type Props = {
  product: IkasProduct;
  isWidthVideo?: boolean;
};

//Ürün resimleri
const ProductImage = observer(({ product, isWidthVideo }: Props) => {
  const mainImage = product.selectedVariant.mainImage?.image;

  if (isWidthVideo && mainImage?.isVideo) {
    // isWidthVideo true ve ana görsel video ise video göster
    return (
      <video
        playsInline
        autoPlay
        loop
        muted
        controls={false}
        src={mainImage.src}
        style={{
          width: "100%",
          aspectRatio: "6 / 9",
          objectFit: "cover",
          maxHeight: "1620px",
        }}
      />
    );
  }

  // Diğer durumlarda (isWidthVideo false veya ana görsel video değilse) resim göster
  let image = mainImage;
  if (mainImage?.isVideo) {
    // Ana görsel video ise, ilk video olmayanı bul
    const nonVideoImage = product.selectedVariant.images?.find(
      (img: any) => !img.image?.isVideo
    )?.image;
    image = nonVideoImage || undefined;
  }
  if (!image?.id) {
    return <img src="/product-dummy-image.jpeg" />;
  }
  return (
    <Image
      // layout="responsive"
      width="200px"
      height="300px"
      objectFit="contain"
      useBlur={true}
      image={product.selectedVariant.mainImage?.image!}
      alt={product.selectedVariant.product?.name || undefined}
      className={styles.slider_product_items}
    />
  );
});

// SVG
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
