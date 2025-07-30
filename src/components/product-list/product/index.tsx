"use client";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  IkasDisplayedVariantType,
  IkasDisplayedVariantValue,
  IkasProduct,
  IkasProductFilter,
  IkasProductFilterValue,
  Image,
  Link,
  useTranslation,
} from "@ikas/storefront";
import * as S from "./style";
import styles from "./style.module.css";
import { FavoriteButton } from "src/components/product-detail/detail/favorite-button";
import { useScreen } from "src/utils/hooks/useScreen";
import { useRouter } from "next/router";
import PlusSVG from "../../svg/plus";
import PlusXSVG from "../../svg/plusX";
import { FiltersWrapper } from "../filter/components/filters-wrapper";
import productList from "..";
import { createContext, useContext } from "react";
import {
  VariantsWrapper,
  VariantTypeBody,
  VariantTypeName,
  VariantTypeNameWrapper,
} from "src/components/product-detail/detail/style";
import { SelectOnChangeParamType } from "src/components/components/select";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { ProductDetailProps } from "src/components/__generated__/types";
import useAddToCartButton from "src/components/product-detail/detail/add-to-cart/hooks/useAddToCartButton";
import Button from "src/components/components/button";
import Alert from "src/components/components/alert";

type Props = {
  product: IkasProduct;
  columns?: number;
};

const Product = (props: Props) => {
  const { product, columns } = props;
  const { t } = useTranslation();
  const { isMobile } = useScreen();

  const a11yTitle = product.selectedVariant.hasStock
    ? ""
    : t("common:product.discountBadgeSoldOut");

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(true);
  const [showStockAlert, setShowStockAlert] = useState(false);

  // Eğer grid layout (View-Selector) sayısı değişirse, modal'ı kapat ve hover durumunu ayarla
  useEffect(() => {
    setIsOpen(false);
    setIsHovered(true);
  }, [columns]);

  // Modal'ı açıp kapatmak için toggle fonksiyonu
  const toggleIcon = () => {
    setIsOpen(!isOpen);
  };

  // Ürünlerlerin kaçarlı gözükeceğine dair işlemler
  const ifColumnNotEqual8 = columns !== 8;
  const ifColumnEqual5 = columns == 5;
  const ifColumnEqual4 = isMobile && columns == 4;

  // Sepete ekleme işlemi için
  const {
    loading,
    buttonText,
    buttonState,
    disabled,
    isBackInStockReminderSaved,
    onButtonClick,
  } = useAddToCartButton({
    product,
    quantity: 1,
    onExceedStock: () => {
      setShowStockAlert(true);
      setTimeout(() => setShowStockAlert(false), 2500);
    },
  });

  return (
    <div className={styles.product_container}>
      {/* Favori butonu */}
      <div className={styles.favorite}>
        <FavoriteButton {...props} />
      </div>
      {/* Resim içeriği */}
      <div className={styles.imageContainer}>
        <Link href={product.href}>
          <a title={a11yTitle}>
            <S.ImageWrapper $hasStock={product.hasStock}>
              <ProductImage {...props} />
              {/* <DiscountBadge {...props} /> */}
              {!isMobile && ifColumnNotEqual8 && !ifColumnEqual5 && (
                <ProductTag {...props} />
              )}
            </S.ImageWrapper>
          </a>
        </Link>
        {!isMobile && (
          <div className={isHovered ? styles.active : styles.passive}>
            <div>
              <S.VariantsWrapper>
                {product?.displayedVariantTypes.map((dVT) => (
                  <VariantType
                    key={dVT.variantType.id}
                    product={product}
                    dVT={dVT}
                  />
                ))}
              </S.VariantsWrapper>
            </div>
          </div>
        )}
      </div>

      {/* ürün başlığı ve fiyat */}
      {ifColumnNotEqual8 && !ifColumnEqual5 && !ifColumnEqual4 && (
        <Link href={product.href}>
          <a title={a11yTitle}>
            <div className={styles.product_Info}>
              <div className={styles.product_info_title}>
                <ProductTitle {...props} />
              </div>
              <div className={styles.product_info_price}>
                <Price {...props} />
              </div>
              {isMobile && <ProductTag {...props} />}
            </div>
          </a>
        </Link>
      )}

      {/* Mobilse sepete ekle butonu ekle */}
      {isMobile && !ifColumnEqual4 && (
        <>
          <Button onClick={onButtonClick} block>
            {t("common:product.addToCart")}
          </Button>
          <MinimalMobileModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <S.VariantsWrapper>
              {product?.displayedVariantTypes.map((dVT) => (
                <VariantType
                  key={dVT.variantType.id}
                  product={product}
                  dVT={dVT}
                />
              ))}
            </S.VariantsWrapper>
          </MinimalMobileModal>
        </>
      )}
      {ifColumnNotEqual8 && !ifColumnEqual5 && (
        <div className={styles.size_icon_container}>
          <div
            onClick={() => {
              setIsHovered(!isHovered);
              toggleIcon();
            }}
            className={styles.size_icon}
          >
            {isOpen ? <PlusXSVG /> : <PlusSVG />}
          </div>
        </div>
      )}
    </div>
  );
};

const MinimalMobileModal = ({ children, isOpen, setIsOpen }: any) => {
  return (
    <div>
      {isOpen && (
        <div className={styles.modalContainer} onClick={() => setIsOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

type SwatchVariantValueProps = {
  dVT: IkasDisplayedVariantType;
  onVariantValueChange: (dVV: IkasDisplayedVariantValue) => void;
};

const SwatchVariantValue = observer(
  ({ dVT, onVariantValueChange }: SwatchVariantValueProps) => {
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
);

type VariantValueType = {
  product: IkasProduct;
  dVT: IkasDisplayedVariantType;
};

const VariantValues = observer(({ dVT, product }: VariantValueType) => {
  const onVariantValueChange = (dVV: IkasDisplayedVariantValue) => {
    product.selectVariantValue(dVV.variantValue);
  };

  let colorSection = false;

  if (dVT.variantType.isColorSelection) {
    colorSection = true;
  }

  const {
    loading,
    buttonText,
    buttonState,
    disabled,
    isBackInStockReminderSaved,
    onButtonClick,
  } = useAddToCartButton({
    product,
    quantity: 1,
  });

  return (
    <div>
      <SelectVariantValue
        product={product}
        dVT={dVT}
        onButtonClick={onButtonClick}
        colorSection={colorSection}
        onVariantValueChange={onVariantValueChange}
      />
    </div>
  );
});

type SelectVariantValueProps = {
  product: IkasProduct;
  dVT: IkasDisplayedVariantType;
  onVariantValueChange: (dVV: IkasDisplayedVariantValue) => void;
  onButtonClick: any;
  colorSection: any;
};

const SelectVariantValue = observer(
  ({
    dVT,
    product,
    onVariantValueChange,
    onButtonClick,
    colorSection,
  }: SelectVariantValueProps) => {
    const selectOptions = dVT.displayedVariantValues.map((dVV) => ({
      value: dVV.variantValue.id,
      label: dVV.variantValue.name,
      hasStock: dVV.hasStock,
      colorCode: dVV.variantValue.colorCode,
    }));

    const selectValue = product.selectedVariantValues.find(
      (sVV) => sVV.variantTypeId === dVT.variantType.id
    )?.id;

    const onChange = (value: SelectOnChangeParamType) => {
      const dVV = dVT.displayedVariantValues.find(
        (dVV) => dVV.variantValue.id === value
      );

      //@ts-ignore
      product.selectVariantValue(dVV?.variantValue, true);
      if (colorSection == false) {
        onButtonClick();
      }

      // dVV && onVariantValueChange(dVV);
    };

    return (
      <>
        <div className={styles.product_size}>
          {selectOptions.map((item, index) => {
            return (
              <>
                {item.hasStock ? (
                  <>
                    {colorSection == true ? (
                      <div
                        key={index}
                        className={
                          selectValue === item.value
                            ? styles.product_size_selected_item_color
                            : styles.product_size_item_color
                        }
                        style={{
                          //@ts-ignore
                          background: item.colorCode,
                        }}
                        onClick={() => onChange(item?.value)}
                      ></div>
                    ) : (
                      <div
                        key={index}
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
                    )}
                  </>
                ) : (
                  <>
                    {colorSection == true ? (
                      <></>
                    ) : (
                      <div
                        key={index}
                        className={
                          selectValue === item.value
                            ? styles.product_size_item_no_stock_selected
                            : styles.product_size_item_no_stock
                        }
                      >
                        <div
                          className={styles.product_size_item_label}
                          title={item.label.toLocaleUpperCase("tr-TR")}
                        >
                          {item.label.toLocaleUpperCase("tr-TR")}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            );
          })}
        </div>
      </>
    );
  }
);

type VariantTypeProps = {
  product: IkasProduct;
  dVT: IkasDisplayedVariantType;
};

// Varyant Tipleri (İsimleri) Örn; Beden, Renk vb...
const VariantType = observer(({ dVT, product }: VariantTypeProps) => {
  return (
    <S.VariantType>
      <S.VariantTypeName>
        {dVT.variantType.name.toLocaleUpperCase("tr-TR")}
      </S.VariantTypeName>
      <VariantValues dVT={dVT} product={product} />
    </S.VariantType>
  );
});

const DEFAULT_IMAGE = "/default-product-image.jpg";
const ProductImage = observer(({ product }: Props) => {
  const mainImage = product.selectedVariant.mainImage?.image;
  const images = product.selectedVariant.images?.length
    ? product.selectedVariant.images
    : [
        {
          image: {
            src: DEFAULT_IMAGE,
            id: "default",
          } as any,
        },
      ];

  if (!mainImage?.id) {
    return (
      <img
        src={DEFAULT_IMAGE}
        alt="Product placeholder"
        style={{
          width: "100%",
          height: "auto", // Oranı koru
          aspectRatio: "460/690", // Diğer görsellerle aynı oran
          objectFit: "cover",
        }}
      />
    );
  }

  return mainImage.isVideo ? (
    <video src={mainImage.src} />
  ) : (
    <div className="product-list-slider">
      <Swiper
        modules={[Pagination]}
        className="mySwiper"
        loop={true}
        pagination={true}
        slidesPerView={1}
        spaceBetween={0}
      >
        {images.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Image
                width={460}
                height={690}
                layout="responsive"
                objectFit="cover"
                useBlur={true}
                image={item.image as any}
                alt={product.selectedVariant.product?.name || "Product image"}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
});

const Price = observer(({ product }: Props) => {
  let regularPrice = parseFloat(
    product.selectedVariant.price.formattedSellPrice.replace(/[^\d.-]/g, "")
  );
  let discountedPrice = parseFloat(
    product.selectedVariant.price.formattedFinalPrice.replace(/[^\d.-]/g, "")
  );

  let discountRate = (
    ((regularPrice - discountedPrice) / regularPrice) *
    100
  ).toFixed(0);

  return (
    <div className={styles.price_content}>
      {product.selectedVariant.price.hasDiscount && (
        <span className={styles.discCount}>
          <del> {product.selectedVariant.price.formattedSellPrice}</del>
        </span>
      )}
      <div>
        <span className={styles.price}>
          {product.selectedVariant.price.formattedFinalPrice}
        </span>
        {product.selectedVariant.price.hasDiscount && (
          <span className={styles.discount_rate}>{` -% ${discountRate}`}</span>
        )}
      </div>
    </div>
  );
});

const ProductTitle = observer(({ product }: Props) => (
  <div className={styles.product_title}>
    <h2>{product.name}</h2>
  </div>
));

const ProductTag = observer(({ product }: Props) => {
  if (!product.tags || product.tags.length === 0) {
    return null;
  }

  if (product.hasStock) {
    return (
      <S.ProductTags>
        {product.tags.map((item, index) => (
          <S.ProductTag key={index}>
            <S.ProductTagText>
              {item.name.toLocaleUpperCase("tr-TR")}
            </S.ProductTagText>
          </S.ProductTag>
        ))}
      </S.ProductTags>
    );
  }
  return null;
});

const DiscountBadge = observer(({ product }: Props) => {
  const { t } = useTranslation();
  if (
    !product.selectedVariant.price.hasDiscount &&
    product.selectedVariant.hasStock
  )
    return null;

  return (
    <S.DiscountBadge $hasStock={product.hasStock}>
      {!product.hasStock && (
        <S.DiscountBadgeSoldOut>
          {t("common:product.discountBadgeSoldOut")}
        </S.DiscountBadgeSoldOut>
      )}
      {product.hasStock && (
        <>
          <S.DiscountBadgeDiscountRatio>
            %{product.selectedVariant.price.discountPercentage}
          </S.DiscountBadgeDiscountRatio>
        </>
      )}
    </S.DiscountBadge>
  );
});

export default observer(Product);
