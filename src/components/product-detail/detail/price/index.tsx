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
    const tieredDiscount = campaign.tieredDiscount;

    // İndirim yüzdesini bul - önce fixedDiscount, sonra tieredDiscount, son olarak başlıktan çıkar
    let discountPercentage: number | null = null;

    if (fixedDiscount?.amount) {
      discountPercentage = fixedDiscount.amount;
    } else if (tieredDiscount?.rules && tieredDiscount.rules.length > 0) {
      // Tiered discount varsa kampanya başlığından yüzde çıkar
      // (rules içinde direkt discount yüzdesi yok)
      const titleMatch = campaign.title?.match(/%(\d+)/);
      if (titleMatch && titleMatch[1]) {
        discountPercentage = parseFloat(titleMatch[1]);
      }
    } else {
      // Kampanya başlığından yüzde çıkar (örn: "Sepette %40 İndirim" => 40)
      const titleMatch = campaign.title?.match(/%(\d+)/);
      if (titleMatch && titleMatch[1]) {
        discountPercentage = parseFloat(titleMatch[1]);
      }
    }

    // İndirim yüzdesi yoksa null döndür
    if (!discountPercentage || discountPercentage <= 0) {
      return null;
    }

    // formattedFinalPrice üzerinden yüzde indirim uygula
    const currentPrice = parseFloat(
      price.formattedFinalPrice.replace(/[^\d.-]/g, "")
    );

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
