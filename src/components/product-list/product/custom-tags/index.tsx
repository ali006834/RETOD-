import React from "react";
import { observer } from "mobx-react-lite";
import { IkasProduct } from "@ikas/storefront";
import { CustomProductTags } from "src/components/__generated__/types";
import { useScreen } from "src/utils/hooks/useScreen";
import styles from "./style.module.css";

type Props = {
  product: IkasProduct;
  tags?: CustomProductTags[];
  className?: string;
  alignTagsRight?: boolean;
};

const CustomTag = observer(
  ({ product, tags, className = "", alignTagsRight = false }: Props) => {
    const { isMobile } = useScreen();

    if (!tags || tags.length === 0) {
      return null;
    }

    // Panel'den gelen tags'leri filtrele
    // Eğer iconWithTags boşsa, tüm ürünlerde göster
    // Eğer iconWithTags varsa, ürünün tag'leriyle eşleşenleri göster
    const matchingTags = tags.filter((panelTag) => {
      // If iconWithTags is not set, show the tag on all products
      if (!panelTag?.iconWithTags) return true;

      // If no product or no product tags, don't show the tag
      if (!product?.tags || product.tags.length === 0) return false;

      // Check if any product tag matches the iconWithTags
      return product.tags.some(
        (productTag) =>
          productTag?.name?.toLocaleLowerCase("tr-TR") ===
          panelTag?.iconWithTags?.toLocaleLowerCase("tr-TR")
      );
    });

    if (matchingTags.length === 0) {
      return null;
    }

    return (
      <div
        className={`${styles.container} ${className}`}
        style={{
          left: alignTagsRight ? "auto" : "20px",
          right: alignTagsRight ? "20px" : "auto",
        }}
      >
        {matchingTags.map((tag, index) => {
          // IkasImage'den src almak için önce src property'sini kontrol et, yoksa getSrc() kullan
          const imageSrc =
            tag?.iconImage?.src ||
            (tag?.iconImage?.getSrc ? tag?.iconImage.getSrc(1080) : null);

          // Genişlik değerini al (mobil veya desktop)
          const tagWidth = isMobile
            ? tag?.widthMobile?.value
              ? `${tag?.widthMobile.value}px`
              : "auto"
            : tag?.width?.value
            ? `${tag?.width.value}px`
            : "auto";

          // Eğer iconImage varsa, görsel göster
          if (imageSrc) {
            const altText = tag?.iconImage?.altText ?? tag?.iconWithTags ?? "";

            return (
              <img
                key={index}
                src={imageSrc}
                alt={altText}
                className={styles.tagImage}
                style={{
                  width: tagWidth,
                }}
              />
            );
          }

          // Eğer iconImage yoksa ama iconTagName varsa, text göster
          if (tag?.iconTagName) {
            return (
              <div
                key={index}
                className={styles.tagText}
                style={{
                  width: tagWidth,
                }}
              >
                {tag.iconTagName}
              </div>
            );
          }

          // Hiçbiri yoksa null döndür
          return null;
        })}
      </div>
    );
  }
);

CustomTag.displayName = "CustomTag";

export default CustomTag;

