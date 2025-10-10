import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";
import { BannerImageListProps } from "../__generated__/types";
import { Image, Link, IkasDisplayedVariantType } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";
import PlusSVG from "../svg/plus";
import PlusXSVG from "../svg/plusX";
import { SelectOnChangeParamType } from "../components/select";
import useAddToCartButton from "../product-detail/detail/add-to-cart/hooks/useAddToCartButton";

const BannerImageList = (props: BannerImageListProps) => {
  const { imageList, mobilGapValue, webGapValue } = props;
  const { isMobile } = useScreen();
  const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({});

  if (!imageList || imageList.length === 0) {
    return null;
  }

  // İmage sayısına göre class belirleme
  // Görsel sayısına göre class ve boyut belirleme
  const getGridConfig = () => {
    switch (imageList.length) {
      case 1:
        return {
          className: styles.gridOne,
          size: { width: 2400, height: 1577 },
        };
      case 2:
        return {
          className: styles.gridTwo,
          size: { width: 1200, height: 1440 },
        };
      case 3:
      default:
        return {
          className: styles.gridThree,
          size: { width: 1200, height: 1440 },
        };
    }
  };

  const { className, size } = getGridConfig();

  const toggleOverlay = (index: number) => {
    setOpenStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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
          {imageList.map((item, index) => {
            const currentImage = isMobile ? item?.imageMobil : item?.imageWeb;

            if (!currentImage) {
              return null;
            }

            const product = item?.relatedProduct?.data?.[0];
            const isOpen = openStates[index] || false;

            return (
              <div key={index} className={styles.bannerItem}>
                <div className={styles.bannerWrapper}>
                  <Link href={product?.href || ""}>
                    <a rel="noopener noreferrer">
                      {isMobile && item?.imageMobil ? (
                        <Image
                          width={size.width}
                          height={size.height}
                          image={item?.imageMobil}
                          alt={item?.imageMobil?.altText || ""}
                          useBlur={true}
                          className={styles.bannerImage}
                        />
                      ) : item.imageWeb ? (
                        <Image
                          width={size.width}
                          height={size.height}
                          alt={item?.imageWeb?.altText || ""}
                          image={item?.imageWeb}
                          useBlur={true}
                          className={styles.bannerImage}
                        />
                      ) : null}
                    </a>
                  </Link>

                  {/* Ürün Bölümü */}
                  {product && (
                    <div
                      className={`${styles.productOverlay} ${
                        isOpen ? styles.productOverlayExpanded : ""
                      }`}
                    >
                      <div className={styles.overlayHeader}>
                        <h3 className={styles.productName}>
                          {product.name.toLocaleUpperCase("tr-TR")}
                        </h3>
                        <p className={styles.productPrice}>
                          {product.selectedVariant.price.formattedFinalPrice}
                        </p>
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
