import React, { useState } from "react";
import { IkasProduct, useStore } from "@ikas/storefront";
import UIStore from "src/store/ui-store";

export function useAddToCart() {
  const [loading, setLoading] = useState(false);

  /**
   * @param product IkasProduct
   * @param quantity number
   * @param onExceedStock? () => void
   */
  const addToCart = async (
    product: IkasProduct,
    quantity: number,
    onExceedStock?: () => void
  ) => {
    const store = useStore();
    const uiStore = UIStore.getInstance();

    const item = store.cartStore.findExistingItem(
      product.selectedVariant,
      product
    );

    // Stok kontrolü
    const stock = product.selectedVariant.stock ?? 0;
    const currentQuantity = item ? item.quantity : 0;
    if (currentQuantity + quantity > stock) {
      if (onExceedStock) onExceedStock();
      return;
    }

    let result: IkasCartOperationResult;

    setLoading(true);
    if (item) {
      result = await store.cartStore.changeItemQuantity(
        item,
        item.quantity + quantity
      );
      uiStore.openCartModal();
    } else {
      result = await store.cartStore.addItem(
        product.selectedVariant,
        product,
        quantity
      );
      uiStore.openCartModal();
    }
    setLoading(false);

    if (result.response?.graphQLErrors) {
      maxQuantityPerCartHandler({
        productName: product.name,
        errors: result.response?.graphQLErrors,
      });
    }
  };

  return {
    loading,
    addToCart,
  };
}

import { GraphQLError } from "graphql";

import { IkasCartOperationResult } from "@ikas/storefront/build/store/cart";

type MaxQuantityPerCartHandlerProps = {
  productName: string;
  errors?: readonly GraphQLError[];
};

export const maxQuantityPerCartHandler = ({
  productName,
  errors,
}: MaxQuantityPerCartHandlerProps) => {
  if (!errors?.length) return;
  const uiStore = UIStore.getInstance();
  const isMaxQuantityPerCartError = errors?.findIndex(
    (error) => error.extensions.code === "MAX_QUANTITY_PER_CART_LIMIT_REACHED"
  );

  if (isMaxQuantityPerCartError !== -1) {
    uiStore.maxQuantityPerCartProductErrorModal = {
      visible: true,
      productName,
    };
  }
};
