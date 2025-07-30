import {
  IkasDisplayedVariantType,
  IkasDisplayedVariantValue,
  IkasProduct,
} from "@ikas/storefront";
import React from "react";
import { Swatch } from "src/components/components/swatch";
import { observer } from "mobx-react-lite";
import styles from "../style.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

type VariantTypeProps = {
  product: IkasProduct;
  dVT: IkasDisplayedVariantType;
};

export const VariantType = observer(({ dVT, product }: VariantTypeProps) => {
  return (
    <div className={styles.tets}>
      <VariantValues dVT={dVT} product={product} />
    </div>
  );
});

type VariantValueType = {
  product: IkasProduct;
  dVT: IkasDisplayedVariantType;
};

const VariantValues = observer(({ dVT, product }: VariantValueType) => {
  const onVariantValueChange = (dVV: IkasDisplayedVariantValue) => {
    product.selectVariantValue(dVV.variantValue, true);
  };

  if (dVT.variantType.isColorSelection) {
    return (
      <>
        <SwatchVariantValue
          dVT={dVT}
          onVariantValueChange={onVariantValueChange}
        />
      </>
    );
  }
  return null;
});

type SwatchVariantValueProps = {
  dVT: IkasDisplayedVariantType;
  onVariantValueChange: (dVV: IkasDisplayedVariantValue) => void;
};

const SwatchVariantValue = observer(
  ({ dVT, onVariantValueChange }: SwatchVariantValueProps) => {
    return (
      <div className="product-list-variant">
        <Swiper
          modules={[Navigation]}
          className="mySwiper"
          loop={true}
          navigation={true}
          slidesPerView={9.5}
          spaceBetween={0}
          breakpoints={{
            140: {
              slidesPerView: 5.5,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 5.5,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 9.5,
              spaceBetween: 0,
            },
          }}
        >
          {dVT.displayedVariantValues.map((dVV) => {
            if (dVV.hasStock) {
              return (
                <SwiperSlide key={dVV.variantValue.id}>
                  <div className={styles.product_detail_colors}>
                    <Swatch
                      title=""
                      selected={dVV.isSelected}
                      image={dVV.variantValue.thumbnailImage}
                      colorCode={dVV.variantValue.colorCode}
                      onClick={() => onVariantValueChange(dVV)}
                    />
                  </div>
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </div>
    );
  }
);
