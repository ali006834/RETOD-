import React from "react";
import { observer } from "mobx-react-lite";
import { ProductDetailProps } from "src/components/__generated__/types";
import {
  IkasDisplayedVariantType,
  IkasDisplayedVariantValue,
  IkasProduct,
  Image,
} from "@ikas/storefront";
import * as S from "../style";
import { SelectOnChangeParamType } from "src/components/components/select";
import styles from "../style.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import SizeTable from "../size-table";

export const Variants = observer(({ product }: ProductDetailProps) => {
  // useThumbnail değişkeni - backend'den gelecek, şimdilik false
  const useThumbnail = false;

  // Renk varyantı var mı kontrol et
  const hasColorVariant = product?.displayedVariantTypes.some(
    (dVT) => dVT.variantType.isColorSelection
  );

  // Varyantları sırala: önce beden (size), sonra renk (color)
  const sortedVariantTypes = product?.displayedVariantTypes
    .slice()
    .sort((a, b) => {
      if (a.variantType.isColorSelection && !b.variantType.isColorSelection) {
        return 1; // Renk sonra gelsin
      }
      if (!a.variantType.isColorSelection && b.variantType.isColorSelection) {
        return -1; // Beden önce gelsin
      }
      return 0; // Aynı tip ise sıra değişmesin
    });

  return (
    <S.VariantsWrapper>
      {sortedVariantTypes?.map((dVT) => (
        <VariantType
          key={dVT.variantType.id}
          product={product!}
          dVT={dVT}
          useThumbnail={useThumbnail}
          showSizeTable={dVT.variantType.isColorSelection}
        />
      ))}
      {!hasColorVariant && <SizeTable />}
    </S.VariantsWrapper>
  );
});

Variants.displayName = "Variants";

type VariantTypeProps = {
  product: IkasProduct;
  dVT: IkasDisplayedVariantType;
  useThumbnail: boolean;
  showSizeTable: boolean;
};

const VariantType = observer(
  ({ dVT, product, useThumbnail, showSizeTable }: VariantTypeProps) => {
    return (
      <S.VariantType>
        <VariantValues
          dVT={dVT}
          product={product}
          useThumbnail={useThumbnail}
          showSizeTable={showSizeTable}
        />
      </S.VariantType>
    );
  }
);

type VariantValueType = {
  product: IkasProduct;
  dVT: IkasDisplayedVariantType;
  useThumbnail: boolean;
  showSizeTable: boolean;
};

const VariantValues = observer(
  ({ dVT, product, useThumbnail, showSizeTable }: VariantValueType) => {
    const onVariantValueChange = (dVV: IkasDisplayedVariantValue) => {
      product.selectVariantValue(dVV.variantValue);
    };

    if (dVT.variantType.isColorSelection) {
      return (
        <>
          <S.VariantTypeBody>
            <S.VariantTypeNameWrapper>
              {/* <S.VariantTypeName>
                {dVT.variantType.name.toLocaleUpperCase("tr-TR")}:
              </S.VariantTypeName> */}
            </S.VariantTypeNameWrapper>
          </S.VariantTypeBody>
          <div className={styles.color_variant_container}>
            <SwatchVariantValue
              dVT={dVT}
              product={product}
              useThumbnail={useThumbnail}
              onVariantValueChange={onVariantValueChange}
            />
            {showSizeTable && <SizeTable />}
          </div>
        </>
      );
    }

    return (
      <>
        <S.VariantTypeBody>
          <S.VariantTypeNameWrapper>
            {/* <S.VariantTypeName>
              {dVT.variantType.name.toLocaleUpperCase("tr-TR")}:
            </S.VariantTypeName> */}
          </S.VariantTypeNameWrapper>
        </S.VariantTypeBody>
        <SelectVariantValue
          product={product}
          dVT={dVT}
          onVariantValueChange={onVariantValueChange}
        />
      </>
    );
  }
);

type SelectVariantValueProps = {
  product: IkasProduct;
  dVT: IkasDisplayedVariantType;
  onVariantValueChange: (dVV: IkasDisplayedVariantValue) => void;
};

const SelectVariantValue = observer(
  ({ dVT, product, onVariantValueChange }: SelectVariantValueProps) => {
    // Bedenleri Küçükten Büyüğe Sırala işlemi
    const selectOptions = dVT.displayedVariantValues
      .map((dVV) => ({
        value: dVV.variantValue.id,
        label: dVV.variantValue.name,
        hasStock: dVV.hasStock,
      }))
      .sort((a, b) => {
        // Önce sayısal değer olup olmadığını kontrol et
        const aNum = parseFloat(a.label);
        const bNum = parseFloat(b.label);

        // İkisi de sayı ise sayısal sıralama yap
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return aNum - bNum;
        }

        // Beden sıralama için özel durumlar (XS, S, M, L, XL, XXL, 3XL vb.)
        const sizeOrder = [
          "XS",
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL",
          "4XL",
          "5XL",
        ];
        const aIndex = sizeOrder.indexOf(a.label.toUpperCase());
        const bIndex = sizeOrder.indexOf(b.label.toUpperCase());

        if (aIndex !== -1 && bIndex !== -1) {
          return aIndex - bIndex;
        }

        // Eğer birisi size listesinde varsa, onu önce koy
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;

        // Son olarak alfabetik sıralama
        return a.label.localeCompare(b.label, "tr-TR", { numeric: true });
      });

    const selectValue = product.selectedVariantValues.find(
      (sVV) => sVV.variantTypeId === dVT.variantType.id
    )?.id;

    const onChange = (value: SelectOnChangeParamType) => {
      const dVV = dVT.displayedVariantValues.find(
        (dVV) => dVV.variantValue.id === value
      );

      dVV && onVariantValueChange(dVV);
    };

    return (
      <div className={styles.product_size}>
        {selectOptions.map((item, index) => {
          return (
            <div key={index}>
              {item.hasStock ? (
                <div
                  className={
                    selectValue === item.value
                      ? styles.product_size_selected_item
                      : styles.product_size_item
                  }
                  onClick={() => onChange(item?.value)}
                >
                  <div
                    className={styles.product_size_item_label}
                    title={item.label.toLocaleUpperCase("tr-TR")}
                  >
                    {item.label.toLocaleUpperCase("tr-TR")}
                  </div>
                </div>
              ) : (
                <div
                  className={
                    selectValue === item.value
                      ? styles.product_size_item_no_stock_selected
                      : styles.product_size_item_no_stock
                  }
                  onClick={() => onChange(item?.value)}
                >
                  <div
                    className={styles.product_size_item_label}
                    title={item.label.toLocaleUpperCase("tr-TR")}
                  >
                    {item.label.toLocaleUpperCase("tr-TR")}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

type SwatchVariantValueProps = {
  dVT: IkasDisplayedVariantType;
  product: IkasProduct;
  useThumbnail: boolean;
  onVariantValueChange: (dVV: IkasDisplayedVariantValue) => void;
};

const SwatchVariantValue = observer(
  ({
    dVT,
    product,
    useThumbnail,
    onVariantValueChange,
  }: SwatchVariantValueProps) => {
    const selectValue = product.selectedVariantValues.find(
      (sVV) => sVV.variantTypeId === dVT.variantType.id
    )?.id;

    if (useThumbnail) {
      // Mevcut thumbnail görünümü
      return (
        <div className="product-list-variant detail-variant">
          <Swiper
            modules={[Navigation]}
            className="mySwiper"
            loop={true}
            navigation={true}
            slidesPerView={6}
            spaceBetween={5}
            breakpoints={{
              140: {
                slidesPerView: 5,
                spaceBetween: 5,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 5,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 5,
              },
            }}
          >
            {dVT.displayedVariantValues.map((dVV) => {
              if (dVV.hasStock) {
                return (
                  <SwiperSlide key={dVV.variantValue.id}>
                    <Image
                      image={dVV.variant.mainImage?.image!}
                      width={80}
                      height={120}
                      useBlur={true}
                      alt={dVV.variantValue.name}
                      objectFit="cover"
                      onClick={() => onVariantValueChange(dVV)}
                    />
                  </SwiperSlide>
                );
              }
            })}
          </Swiper>
        </div>
      );
    }

    // Renk görünümü (colorCode ile)
    return (
      <div className={styles.color_variants}>
        {dVT.displayedVariantValues.map((dVV) => {
          const isSelected = selectValue === dVV.variantValue.id;

          if (dVV.hasStock) {
            return (
              <div
                key={dVV.variantValue.id}
                className={
                  isSelected ? styles.color_item_selected : styles.color_item
                }
                style={{
                  backgroundColor: dVV.variantValue.colorCode || "#ccc",
                }}
                onClick={() => onVariantValueChange(dVV)}
                title={dVV.variantValue.name}
              />
            );
          } else {
            return (
              <div
                key={dVV.variantValue.id}
                className={
                  isSelected
                    ? styles.color_item_no_stock_selected
                    : styles.color_item_no_stock
                }
                style={{
                  backgroundColor: dVV.variantValue.colorCode || "#ccc",
                }}
                onClick={() => onVariantValueChange(dVV)}
                title={`${dVV.variantValue.name} - Stokta Yok`}
              />
            );
          }
        })}
      </div>
    );
  }
);
