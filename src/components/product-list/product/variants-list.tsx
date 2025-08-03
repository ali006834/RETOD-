import React from "react";
import { observer } from "mobx-react-lite";
import { ProductDetailProps } from "src/components/__generated__/types";
import {
  IkasDisplayedVariantType,
  IkasDisplayedVariantValue,
  IkasProduct,
} from "@ikas/storefront";
import * as S from "./style";
import { SelectOnChangeParamType } from "src/components/components/select";
import styles from "./style.module.css";

export const VariantsList = observer(({ product }: ProductDetailProps) => {
  return (
    <S.VariantsWrapper>
      {product?.displayedVariantTypes.map((dVT) => (
        <VariantType key={dVT.variantType.id} product={product} dVT={dVT} />
      ))}
    </S.VariantsWrapper>
  );
});

VariantsList.displayName = "Variants";

type VariantTypeProps = {
  product: IkasProduct;
  dVT: IkasDisplayedVariantType;
};

const VariantType = observer(({ dVT, product }: VariantTypeProps) => {
  return (
    <S.VariantType>
      <VariantValues dVT={dVT} product={product} />
    </S.VariantType>
  );
});

type VariantValueType = {
  product: IkasProduct;
  dVT: IkasDisplayedVariantType;
};

const VariantValues = observer(({ dVT, product }: VariantValueType) => {
  const onVariantValueChange = (dVV: IkasDisplayedVariantValue) => {
    product.selectVariantValue(dVV.variantValue);
  };
  if (dVT.variantType.isColorSelection) {
    return null;
  }

  return (
    <>
      <SelectVariantValue
        product={product}
        dVT={dVT}
        onVariantValueChange={onVariantValueChange}
      />
    </>
  );
});

type SelectVariantValueProps = {
  product: IkasProduct;
  dVT: IkasDisplayedVariantType;
  onVariantValueChange: (dVV: IkasDisplayedVariantValue) => void;
};

const SelectVariantValue = observer(
  ({ dVT, product, onVariantValueChange }: SelectVariantValueProps) => {
    const selectOptions = dVT.displayedVariantValues.map((dVV) => ({
      value: dVV.variantValue.id,
      label: dVV.variantValue.name,
      hasStock: dVV.hasStock,
    }));

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
      <>
        <div className={styles.product_size}>
          {selectOptions.map((item, index) => {
            return (
              <>
                {item.hasStock ? (
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
                ) : (
                  <div
                    key={index}
                    className={
                      selectValue === item.value
                        ? styles.product_size_item_no_stock_selected
                        : styles.product_size_item_no_stock
                    }
                    onClick={() => onChange(item?.value)}
                  >
                    <div>{item.label}</div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </>
    );
  }
);
