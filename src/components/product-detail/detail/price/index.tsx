import { observer } from "mobx-react-lite";
import React from "react";
import { ProductDetailProps } from "src/components/__generated__/types";
import { formatCurrency } from "@ikas/storefront";

import styles from "../style.module.css";

export const Price = observer((props: ProductDetailProps) => {
  const { price }: any = props?.product?.selectedVariant || {};
  const product = props?.product;

  // Eğer price yoksa boş component döndür
  if (!price) {
    return null;
  }

  // Kampanya kontrolü - "Sepette %20 İndirim" gibi kampanyaları bul
  const activeCampaign = product?.campaigns?.find((campaignItem: any) => {
    const campaign = campaignItem?.campaign;
    if (!campaign) return false;

    // Kampanya adında "Sepette" kelimesi geçiyor mu kontrol et
    const campaignTitle = campaign.title || "";
    if (!campaignTitle.toLowerCase().includes("sepette")) {
      return false;
    }

    const variantIds = campaignItem?.variantIds || [];
    const selectedVariantId = product.selectedVariant?.id;

    // Eğer variantIds boşsa veya seçili variant ID'si içeriyorsa kampanya geçerli
    const variantIdsArray = Array.isArray(variantIds)
      ? Array.from(variantIds)
      : [];

    return (
      variantIdsArray.length === 0 ||
      variantIdsArray.some((id: string) => id === selectedVariantId)
    );
  });

  // Sepetteki fiyatı hesapla (kampanya varsa)
  const getCartPrice = () => {
    if (!activeCampaign?.campaign) {
      return null;
    }

    const campaign = activeCampaign.campaign;
    const fixedDiscount = campaign.fixedDiscount;

    // Sabit indirim miktarı yoksa null döndür
    if (!fixedDiscount?.amount) {
      return null;
    }

    // formattedFinalPrice üzerinden yüzde indirim uygula
    const currentPrice = parseFloat(
      price.formattedFinalPrice.replace(/[^\d.-]/g, "")
    );

    // fixedDiscount.amount yüzde olarak kullanılacak (örneğin 30 = %30)
    const discountPercentage = fixedDiscount.amount;
    const cartPrice = Math.max(
      0,
      currentPrice * (1 - discountPercentage / 100)
    );

    // Sepet fiyatını tam sayıya yuvarla (ör. 1.329,30 => 1.329,00)
    const roundedCartPrice = Math.round(cartPrice);

    const currency = price.currency || "";
    const currencySymbol = price.currencySymbol || "₺";

    return formatCurrency(roundedCartPrice, currency, currencySymbol);
  };

  const cartPrice = getCartPrice();

  return (
    <div className={styles.price_content}>
      {/* indirimsiz fiyat */}
      {price.hasDiscount && (
        <span className={styles.discCount}>
          <del> {price.formattedSellPrice}</del>
        </span>
      )}

      {/* satış fiyatı */}
      <span className={styles.price}>{price.formattedFinalPrice}</span>

      {/* Sepetteki fiyat */}
      {cartPrice && (
        <span className={styles.cart_price}>
          {" "}
          <span className={styles.cart_price_label}>Sepette</span> {cartPrice}
        </span>
      )}
    </div>
  );
});

Price.displayName = "Price";
