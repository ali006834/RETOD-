import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  IkasDisplayedVariantType,
  IkasDisplayedVariantValue,
  IkasProduct,
  Image,
  Link,
  useTranslation,
} from "@ikas/storefront";

import * as S from "./style";
import styles from "./style.module.css";

import { FavoriteButton } from "src/components/product-detail/detail/favorite-button";
import { useRouter } from "next/router";
import { VariantsList } from "./variants-list";
import { useScreen } from "src/utils/hooks/useScreen";
import { SelectOnChangeParamType } from "src/components/components/select";
import useAddToCartButton from "src/components/product-detail/detail/add-to-cart/hooks/useAddToCartButton";
import Button from "src/components/components/button";
import BasketIcon from "src/components/svg/basket";

import { Scrollbar, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

type Props = {
  product: IkasProduct;
  columns?: number;
  isWidthVideo?: boolean;
};
const Product = (props: Props) => {
  const { product, columns, isWidthVideo } = props;
  const { t } = useTranslation();
  const { isMobile } = useScreen();

  const a11yTitle = product.selectedVariant.hasStock
    ? ""
    : t("common:product.discountBadgeSoldOut");

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  //+ View Selcetor işlemleri
  const [isHovered, setIsHovered] = useState(true);
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
  const ifColumnNotEqual6 = columns !== 6; // Eğer sütun sayısı 6 değilse, etiketleri göster
  const ifColumnEqual5 = columns == 5; // Eğer sütun sayısı 5 ise, etiketleri gösterme
  const ifColumnEqual4 = isMobile && columns == 4; // Eğer mobilde ve sütun sayısı 4 ise, etiketleri gösterme

  return (
    <div className={styles.product_container}>
      <div className={styles.favorite}>
        <FavoriteButton {...props} />
      </div>
      <div className={styles.imageContainer}>
        <Link href={product.href}>
          <a title={a11yTitle}>
            <S.ImageWrapper $hasStock={product.hasStock}>
              <ProductImage {...props} isWidthVideo={isWidthVideo} />
              <DiscountBadge {...props} />
            </S.ImageWrapper>
          </a>
        </Link>
      </div>
      <div className={styles.product_Info}>
        {/* {isMobile && (
          <>
            <Button onClick={() => setIsOpen(true)} block>
              {t("common:product.addToCart")}
            </Button>
            <MinimalMobileModal isOpen={isOpen} setIsOpen={setIsOpen}>
              <S.VariantsWrapper>
                {product?.displayedVariantTypes
                  .filter((dVT) => dVT.variantType.isColorSelection)
                  .map((dVT) => (
                    <VariantType
                      key={dVT.variantType.id}
                      product={product}
                      dVT={dVT}
                    />
                  ))}
              </S.VariantsWrapper>
            </MinimalMobileModal>
          </>
        )} */}
        {ifColumnNotEqual6 && !ifColumnEqual5 && !ifColumnEqual4 && (
          <>
            <ProductTitle {...props} />
            <Price {...props} />
          </>
        )}
        {ifColumnNotEqual6 && !ifColumnEqual5 && <ProductTag {...props} />}
      </div>
      {!isMobile && (
        <div className={styles.onHoverAddCart}>
          <div>
            {ifColumnNotEqual6 && !ifColumnEqual5 && (
              <S.VariantsWrapper>
                {product?.displayedVariantTypes
                  .filter((dVT) => dVT.variantType.isColorSelection)
                  .map((dVT) => (
                    <VariantType
                      key={dVT.variantType.id}
                      product={product}
                      dVT={dVT}
                    />
                  ))}
              </S.VariantsWrapper>
            )}
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
    <SelectVariantValue
      product={product}
      dVT={dVT}
      onButtonClick={onButtonClick}
      colorSection={colorSection}
      onVariantValueChange={onVariantValueChange}
    />
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
                        <div>{item.label}</div>
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
                        <div>{item.label}</div>
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

//! Renkler ve Bedenler
const VariantType = observer(({ dVT, product }: VariantTypeProps) => {
  // Gelen variantType.name değerini kendisini dinamik olarak alma yerlerine statik olarak "Renk" ve "Beden" olarak al..
  const getStaticVariantName = (name: any) => {
    const lowerCaseName = name.toLowerCase();

    if (lowerCaseName.includes("renk") || lowerCaseName.includes("color")) {
      return "Renk Seçenekleri";
    } else if (
      lowerCaseName.includes("beden") ||
      lowerCaseName.includes("size")
    ) {
      return "Beden Seçenekleri";
    }
    // Eğer başka bir format gelirse olduğu gibi döndür..
    return name;
  };

  return (
    <S.VariantType>
      {/* Eğer sadece Dinamik olarak almak istersen alttaki kodu aktif et   */}
      {/* <S.VariantTypeName>{dVT.variantType.name}</S.VariantTypeName> */}
      <S.VariantTypeName>
        {/* {getStaticVariantName(dVT.variantType.name)} */}
      </S.VariantTypeName>

      <VariantValues dVT={dVT} product={product} />
    </S.VariantType>
  );
});

//Fotoğraf alanı
const ProductImage = observer(({ product, isWidthVideo }: Props) => {
  const router = useRouter();
  const { isMobile } = useScreen();

  // Tüm görselleri al
  const allImages = product.selectedVariant?.images ?? [];

  // isWidthVideo true ise hem video hem fotoğraf, değilse sadece fotoğraflar
  const displayImages = isWidthVideo
    ? allImages
    : allImages.filter((item) => !item.image?.isVideo);

  // Eğer hiç görsel yoksa ana görseli kullan
  const fallbackImage = product.selectedVariant.mainImage;
  const imagesToShow =
    displayImages.length > 0
      ? displayImages
      : fallbackImage
      ? [fallbackImage]
      : [];

  // Eğer hiç gösterilecek görsel yoksa dummy image
  if (imagesToShow.length === 0) {
    return <img src="/product-dummy-image.jpeg" />;
  }

  return (
    <div className="product-list-slider">
      {router.pathname !== "/account/favorite-products" && product.hasStock ? (
        <Swiper
          modules={[Pagination]}
          className="mySwiper"
          loop={false}
          pagination={true}
          slidesPerView={1}
          spaceBetween={0}
        >
          {imagesToShow.map((item, index) => {
            if (item.image?.isVideo) {
              return (
                <SwiperSlide key={`video-${index}`}>
                  <video
                    playsInline
                    autoPlay
                    loop
                    muted
                    controls={false}
                    src={item.image.src}
                    style={{
                      width: "100%",
                      aspectRatio: "2/3",
                      objectFit: "cover",
                      maxHeight: "665px",
                    }}
                  />
                </SwiperSlide>
              );
            }
            return (
              <SwiperSlide key={`image-${index}`}>
                <Image
                  width="540px"
                  height="810px"
                  objectFit="cover"
                  useBlur={true}
                  image={item.image!}
                  alt={product.selectedVariant.product?.name || undefined}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : imagesToShow[0].image?.isVideo ? (
        <video
          playsInline
          autoPlay
          loop
          muted
          controls={false}
          src={imagesToShow[0].image.src}
          style={{
            width: "100%",
            aspectRatio: "6 / 9",
            objectFit: "cover",
            maxHeight: "1620px",
          }}
        />
      ) : (
        <Image
          layout="responsive"
          width="1080px"
          height="1620px"
          objectFit="cover"
          useBlur={true}
          image={imagesToShow[0].image!}
          alt={product.selectedVariant.product?.name || undefined}
        />
      )}
    </div>
  );
});

//Ürün etiketleri
const ProductTag = observer(({ product }: Props) => {
  if (!product.tags) {
    return null;
  }

  if (product.hasStock && product.tags.length > 0) {
    return (
      <S.ProductTags>
        {product.tags?.map((item, index) => (
          <S.ProductTag key={index}>
            <S.ProductTagsRatio>
              {item.name.toLocaleUpperCase("tr-TR")}
            </S.ProductTagsRatio>
          </S.ProductTag>
        ))}
      </S.ProductTags>
    );
  } else {
    return null;
  }
});

const Price = observer(({ product }: Props) => {
  return (
    <div className={styles.price_content}>
      <span className={styles.price}>
        {product.selectedVariant.price.formattedFinalPrice}
      </span>
      {product.selectedVariant.price.hasDiscount ? (
        <span className={styles.discCount}>
          <del> {product.selectedVariant.price.formattedSellPrice}</del>
        </span>
      ) : (
        <span className={styles.no_discCount}></span>
      )}
    </div>
  );
});

const ProductTitle = observer(({ product }: Props) => (
  <div className={styles.product_title}>
    <span>{product?.brand?.name}</span>
    <Link href={product.href}>
      <a>
        <h2>{product.name.toLocaleUpperCase("tr-TR")}</h2>
      </a>
    </Link>
  </div>
));

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
            -{product.selectedVariant.price.discountPercentage}%
          </S.DiscountBadgeDiscountRatio>
        </>
      )}
    </S.DiscountBadge>
  );
});

export default observer(Product);
