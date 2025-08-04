import React from "react";
import { IkasProduct, useTranslation } from "@ikas/storefront";

import useBackInStock from "./useBackInStock";
import { useAddToCart } from "src/utils/hooks/useAddToCart";
import { ProductOptionsStore } from "src/components/product-detail/detail/product-options";
import { useBackInStockStore } from "../back-in-stock/backInStockStore";

import { NS } from "src/components/product-detail";

type Props = {
  product: IkasProduct;
  quantity: number;
  onExceedStock?: () => void;
};

export default function useAddToCartButton({
  product,
  quantity,
  onExceedStock,
}: Props) {
  const { t } = useTranslation();
  const backInStockStore = useBackInStockStore();
  const { loading: addToCartLoading, addToCart } = useAddToCart();
  const {
    isBackInStockEnabled,
    isBackInStockReminderSaved,
    handleBackInStockClick,
  } = useBackInStock({ product });

  const hasStock = product.selectedVariant.hasStock;
  const loading = addToCartLoading || backInStockStore.pending;

  // Back in stock özelliği her zaman aktif olsun (stok yoksa)
  const backInStockEnabled = !hasStock;

  const disabled = hasStock
    ? addToCartLoading
    : !backInStockEnabled ||
      isBackInStockReminderSaved ||
      backInStockStore.pending;

  const buttonText = hasStock
    ? t(`${NS}:detail.addToCart.text`)
    : backInStockEnabled
    ? isBackInStockReminderSaved
      ? t(`${NS}:detail.addToCart.backInStockReminderSaved`)
      : t(`${NS}:detail.addToCart.remindOnBackInStock`)
    : t(`${NS}:detail.addToCart.soldOut`);

  const buttonState: "addToCart" | "backInStock" =
    backInStockEnabled && !hasStock ? "backInStock" : "addToCart";

  const handleAddToCartClick = async () => {
    if (!product.isAddToCartEnabled) {
      ProductOptionsStore.getInstance().showOptionError = true;
      return;
    }
    addToCart(product, quantity, onExceedStock);
  };

  const onButtonClick =
    buttonState === "backInStock"
      ? handleBackInStockClick
      : handleAddToCartClick;

  return {
    loading,
    hasStock,
    isBackInStockReminderSaved,
    disabled,
    buttonState,
    buttonText,
    onButtonClick,
  };
}
