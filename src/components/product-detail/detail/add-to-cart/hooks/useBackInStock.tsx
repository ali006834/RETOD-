import React from "react";
import { IkasProduct, useStore } from "@ikas/storefront";
import { useBackInStockStore } from "../back-in-stock/backInStockStore";

type Props = {
  product: IkasProduct;
};

export default function useBackInStock({ product }: Props) {
  const store = useStore();
  const backInStockStore = useBackInStockStore();

  const {
    isBackInStockEnabled: originalIsBackInStockEnabled,
    isBackInStockReminderSaved,
    isBackInStockCustomerLoginRequired,
  } = product.selectedVariant;

  // Back in stock özelliği her zaman aktif olsun (stok yoksa)
  const hasStock = product.selectedVariant.hasStock;
  const isBackInStockEnabled = !hasStock;

  const handleBackInStockClick = async () => {
    const isCustomerExist = !!store.customerStore.customer?.id;

    // Müşteri giriş yapmamışsa ve login gerekiyorsa
    if (isBackInStockCustomerLoginRequired && !isCustomerExist) {
      backInStockStore.visibleModal = "loginRequired";
      return;
    }

    // Diğer tüm durumlarda back in stock modal'ını aç
    // (müşteri giriş yapmış olsa bile modal'ı göster)
    backInStockStore.visibleModal = "backInStock";
  };

  return {
    isBackInStockEnabled,
    isBackInStockReminderSaved,
    isBackInStockCustomerLoginRequired,
    handleBackInStockClick,
  };
}
