import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";
import { Image, Link, IkasDisplayedVariantType } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";
import {
  ExtendedBannerImageListProps,
  getOverlayHeight,
} from "./height-settings";

import PlusSVG from "../svg/plus";
import PlusXSVG from "../svg/plusX";

import { SelectOnChangeParamType } from "../components/select";
import useAddToCartButton from "../product-detail/detail/add-to-cart/hooks/useAddToCartButton";

const BannerImageList = (props: ExtendedBannerImageListProps) => {
  const {
    mediaList,
    mobilGapValue,
    webGapValue,

    // Grid 1 overlay heights
    gridOneProductOverlayHeight,
    gridOneProductOverlayHeightMobile,
    gridOneProductOverlayExpandedHeight,
    gridOneProductOverlayExpandedHeightMobile,
    // Grid 2 overlay heights
    gridTwoProductOverlayHeight,
    gridTwoProductOverlayHeightMobile,
    gridTwoProductOverlayExpandedHeight,
    gridTwoProductOverlayExpandedHeightMobile,
    // Grid 3 overlay heights
    gridThreeProductOverlayHeight,
    gridThreeProductOverlayHeightMobile,
    gridThreeProductOverlayExpandedHeight,
    gridThreeProductOverlayExpandedHeightMobile,
    // Grid 4 overlay heights
    gridFourProductOverlayHeight,
    gridFourProductOverlayHeightMobile,
    gridFourProductOverlayExpandedHeight,
    gridFourProductOverlayExpandedHeightMobile,
  } = props;
  const { isMobile, isTablet } = useScreen();
  const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({});

  if (!mediaList || mediaList.length === 0) {
    return null;
  }

  console.log("mediaList >>>", mediaList);

  // İmage sayısına göre class belirleme
  // Görsel sayısına göre class ve boyut belirleme
  const getGridConfig = () => {
    switch (mediaList.length) {
      case 1:
        return {
          className: styles.gridOne,
          size: isMobile
            ? { width: 1200, height: 1440 }
            : { width: 2400, height: 1577 },
        };
      case 2:
        return {
          className: styles.gridTwo,
          size: isMobile
            ? { width: 1200, height: 1440 }
            : { width: 1200, height: 1440 },
        };
      case 3:
        return {
          className: styles.gridThree,
          size: isMobile
            ? { width: 1200, height: 1440 }
            : { width: 1200, height: 1440 },
        };
      case 4:
        return {
          className: styles.gridFour,
          size: isMobile
            ? { width: 1200, height: 1440 }
            : { width: 1200, height: 1440 },
        };
      default:
        return {
          className: styles.gridThree,
          size: isMobile
            ? { width: 1200, height: 1440 }
            : { width: 1200, height: 1440 },
        };
    }
  };

  const { className, size } = getGridConfig();

  // Overlay height settings from props
  const overlayHeightSettings = {
    gridOneProductOverlayHeight,
    gridOneProductOverlayHeightMobile,
    gridOneProductOverlayExpandedHeight,
    gridOneProductOverlayExpandedHeightMobile,
    gridTwoProductOverlayHeight,
    gridTwoProductOverlayHeightMobile,
    gridTwoProductOverlayExpandedHeight,
    gridTwoProductOverlayExpandedHeightMobile,
    gridThreeProductOverlayHeight,
    gridThreeProductOverlayHeightMobile,
    gridThreeProductOverlayExpandedHeight,
    gridThreeProductOverlayExpandedHeightMobile,
    gridFourProductOverlayHeight,
    gridFourProductOverlayHeightMobile,
    gridFourProductOverlayExpandedHeight,
    gridFourProductOverlayExpandedHeightMobile,
  };

  const toggleOverlay = (index: number) => {
    setOpenStates((prev) => {
      const isCurrentlyOpen = prev[index];

      // Mobil ve Tablet'te: Eğer açılacaksa, önce diğerlerini kapat
      if ((isMobile || isTablet) && !isCurrentlyOpen) {
        return { [index]: true };
      }

      // Normal toggle işlemi
      return {
        ...prev,
        [index]: !prev[index],
      };
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div
          className={`${styles.bannerGrid} ${className}`}
          style={{
            gap: ` ${
              isMobile
                ? mobilGapValue?.value + "px" || "40px 0"
                : webGapValue?.value + "px" || "40px 0"
            }`,
          }}
        >
          {mediaList.map((item, index) => {
            const product = item?.relatedProduct?.data?.[0];
            const fallbackImage = product?.variants?.[0]?.images?.[0]?.image;

            const currentImage = isMobile
              ? item?.imageMobil || fallbackImage
              : item?.imageWeb || fallbackImage;

            if (!currentImage) {
              return null;
            }

            const isOpen = openStates[index] || false;

            return (
              <div key={index} className={styles.bannerItem}>
                <div className={styles.bannerWrapper}>
                  <Link href={product?.href || ""}>
                    <a rel="noopener noreferrer">
                      <Image
                        width={size.width}
                        height={size.height}
                        image={currentImage}
                        alt={currentImage?.altText || product?.name || ""}
                        useBlur={true}
                        className={styles.bannerImage}
                      />
                    </a>
                  </Link>

                  {/* Özel Etiket */}
                  {item?.customTagText && (
                    <div
                      className={`${styles.customTag} ${
                        item?.isCustomTagLeft ? styles.customTagLeft : ""
                      }`}
                      style={{
                        backgroundColor:
                          item?.customTagBgColor || "#f6f1eb",
                        color: item?.customTagTextColor || "#444",
                      }}
                    >
                      {item.customTagText}
                    </div>
                  )}

                  {/* Ürün Bölümü */}
                  {isMobile || isTablet
                    ? product && (
                        <>
                          {/* Plus Button - Bottom 20px */}
                          <div
                            className={`${styles.plusButtonMobile} ${
                              isOpen ? styles.plusButtonMobileOpen : ""
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleOverlay(index);
                            }}
                          >
                            {isOpen ? <PlusXSVG /> : <PlusSVG />}
                          </div>

                          {/* Mobile/Tablet Overlay */}
                          {isOpen && (
                            <div className={styles.productOverlayMobile}>
                              <div className={styles.overlayHeaderMobile}>
                                <h3 className={styles.productNameMobile}>
                                  {product.name.toLocaleUpperCase("tr-TR")}
                                </h3>
                                <div className={styles.priceContentMobile}>
                                  {product.selectedVariant.price.hasDiscount ? (
                                    <>
                                      <div
                                        className={styles.discountBadgeMobile}
                                      >
                                        -
                                        {
                                          product.selectedVariant.price
                                            .discountPercentage
                                        }
                                        %
                                      </div>
                                      <div className={styles.priceStackMobile}>
                                        <span
                                          className={styles.discCountMobile}
                                        >
                                          <del>
                                            {
                                              product.selectedVariant.price
                                                .formattedSellPrice
                                            }
                                          </del>
                                        </span>
                                        <span
                                          className={styles.productPriceMobile}
                                        >
                                          {
                                            product.selectedVariant.price
                                              .formattedFinalPrice
                                          }
                                        </span>
                                      </div>
                                    </>
                                  ) : (
                                    <span className={styles.productPriceMobile}>
                                      {
                                        product.selectedVariant.price
                                          .formattedFinalPrice
                                      }
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Varyantlar direkt görünecek */}
                              <div className={styles.variantsContainerMobile}>
                                {product.displayedVariantTypes.map((dVT) => (
                                  <VariantType
                                    key={dVT.variantType.id}
                                    product={product}
                                    dVT={dVT}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )
                    : product && (
                        <div
                          className={`${styles.productOverlay} ${
                            isOpen ? styles.productOverlayExpanded : ""
                          }`}
                          style={{
                            height: getOverlayHeight(
                              mediaList.length,
                              isMobile || isTablet,
                              isOpen,
                              overlayHeightSettings
                            ),
                          }}
                        >
                          <div className={styles.overlayHeader}>
                            <h3 className={styles.productName}>
                              {product.name.toLocaleUpperCase("tr-TR")}
                            </h3>
                            <div className={styles.priceContent}>
                              {product.selectedVariant.price.hasDiscount ? (
                                <>
                                  <div className={styles.discountBadge}>
                                    -
                                    {
                                      product.selectedVariant.price
                                        .discountPercentage
                                    }
                                    %
                                  </div>
                                  <div className={styles.priceStack}>
                                    <span className={styles.discCount}>
                                      <del>
                                        {
                                          product.selectedVariant.price
                                            .formattedSellPrice
                                        }
                                      </del>
                                    </span>
                                    <span className={styles.productPrice}>
                                      {
                                        product.selectedVariant.price
                                          .formattedFinalPrice
                                      }
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <span className={styles.productPrice}>
                                  {
                                    product.selectedVariant.price
                                      .formattedFinalPrice
                                  }
                                </span>
                              )}
                            </div>
                            <div
                              className={styles.toggleIcon}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleOverlay(index);
                              }}
                            >
                              {isOpen ? <PlusXSVG /> : <PlusSVG />}
                            </div>
                          </div>

                          {isOpen && (
                            <div className={styles.variantsContainer}>
                              {product.displayedVariantTypes.map((dVT) => (
                                <VariantType
                                  key={dVT.variantType.id}
                                  product={product}
                                  dVT={dVT}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Varyant Tipleri (Beden, Renk vb.)
const VariantType = observer(
  ({ dVT, product }: { dVT: IkasDisplayedVariantType; product: any }) => {
    return (
      <div className={styles.variantType}>
        <div className={styles.variantTypeName}>
          {dVT.variantType.name.toLocaleUpperCase("tr-TR")}
        </div>
        <VariantValues dVT={dVT} product={product} />
      </div>
    );
  }
);

// Varyant Değerleri
const VariantValues = observer(
  ({ dVT, product }: { dVT: IkasDisplayedVariantType; product: any }) => {
    const colorSection = dVT.variantType.isColorSelection;

    const { onButtonClick } = useAddToCartButton({
      product,
      quantity: 1,
    });

    return (
      <SelectVariantValue
        product={product}
        dVT={dVT}
        onButtonClick={onButtonClick}
        colorSection={colorSection}
      />
    );
  }
);

// Varyant Seçimi
const SelectVariantValue = observer(
  ({
    dVT,
    product,
    onButtonClick,
    colorSection,
  }: {
    dVT: IkasDisplayedVariantType;
    product: any;
    onButtonClick: any;
    colorSection: boolean;
  }) => {
    const selectOptions = dVT.displayedVariantValues.map((dVV) => ({
      value: dVV.variantValue.id,
      label: dVV.variantValue.name,
      hasStock: dVV.hasStock,
      colorCode: dVV.variantValue.colorCode,
    }));

    const selectValue = product.selectedVariantValues.find(
      (sVV: any) => sVV.variantTypeId === dVT.variantType.id
    )?.id;

    const onChange = (value: SelectOnChangeParamType) => {
      const dVV = dVT.displayedVariantValues.find(
        (dVV) => dVV.variantValue.id === value
      );

      //@ts-ignore
      product.selectVariantValue(dVV?.variantValue, true);
      if (!colorSection) {
        onButtonClick();
      }
    };

    return (
      <div className={styles.variantOptions}>
        {selectOptions.map((item, index) => {
          if (!item.hasStock && colorSection) {
            return null;
          }

          return (
            <div key={index}>
              {colorSection ? (
                <div
                  className={
                    selectValue === item.value
                      ? styles.colorOptionSelected
                      : styles.colorOption
                  }
                  style={{
                    background: item.colorCode || "#ccc",
                  }}
                  onClick={() => item.hasStock && onChange(item.value)}
                />
              ) : (
                <div
                  className={
                    item.hasStock
                      ? selectValue === item.value
                        ? styles.sizeOptionSelected
                        : styles.sizeOption
                      : styles.sizeOptionNoStock
                  }
                  onClick={() => item.hasStock && onChange(item.value)}
                >
                  {item.label.toLocaleUpperCase("tr-TR")}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

export default observer(BannerImageList);
