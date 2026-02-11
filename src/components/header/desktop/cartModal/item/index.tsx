import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  IkasOrderLineItem,
  useStore,
  Link,
  IkasBaseStore,
  useTranslation,
  IkasProduct,
} from "@ikas/storefront";
import ProductImagePlaceholder from "src/components/svg/product-image-placeholder";
import { maxQuantityPerCartHandler } from "src/utils/hooks/useAddToCart";
import { QuantityButton } from "src/components/product-detail/detail/add-to-cart";
// SVG ler
import CloseSVG from "src/components/svg/close";
import FavoriteSVG from "src/components/svg/favorite";
import DeleteSVG from "./svg/delete";
import PenSVG from "./svg/pen";

import * as S from "./style";

import Modal from "./modal";
import Alert from "src/components/components/alert";

const { t } = useTranslation();

import {
  PriceColumn,
  ProductColumn,
  QuantityColumn,
  RemoveColumn,
} from "../style";

const formatPriceWithZeroKurus = (value?: string | null) => {
  if (!value) return "";
  const str = value.toString();
  // Sondaki iki basamaklı kuruşu "00" yap (ör. "₺ 1.329,30" => "₺ 1.329,00")
  const match = str.match(/(.*[.,])(\d{2})(\s*)$/);
  if (!match) return str;
  return `${match[1]}00${match[3] ?? ""}`;
};

const ProductTitleComponent = ({ product }: { product: any }) => {
  return <div>{product.name}</div>;
};

const Item = ({
  item,
  size,
}: {
  item: IkasOrderLineItem;
  size?: IkasProduct;
}) => {
  const store = useStore();
  const [showQuantityEditor, setShowQuantityEditor] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Silme efekti
  const [isRemoving, setIsRemoving] = useState(false);
  const [showRemovedMessage, setShowRemovedMessage] = useState(false);
  // Stok uyarısı için state
  const [showStockAlert, setShowStockAlert] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      setShowRemovedMessage(true);
      setTimeout(() => {
        store.cartStore.removeItem(item);
      }, 1000); // "Ürün silindi" mesajının gösterilme süresi
    }, 300); // Kayma animasyonu süresi
  };

  // Seçili varyant stok adedi
  const selectedVariantStock = item.quantity;
  const handleExceedStock = () => {
    setShowStockAlert(true);
    setTimeout(() => setShowStockAlert(false), 2500);
  };

  console.log(" -------------------------------- ");
  console.log("deneme >>> ", item);

  console.log(" -------------------------------- ");
  console.log("deneme >>> ", item?.formattedPriceWithQuantity);
  console.log("deneme >>> ", item?.formattedFinalPriceWithQuantity);
  return (
    <>
      {showRemovedMessage ? (
        <S.RemovedNotification>
          <DeleteSVG />
          <span>{t(`common:clearCartItemSuccess`)}</span>
        </S.RemovedNotification>
      ) : (
        <S.ItemWrapper $isRemoving={isRemoving}>
          <S.Item>
            <S.ItemContent>
              <ItemImage item={item} />
              <S.ItemDetails>
                <S.ItemProductName>{item.variant.name}</S.ItemProductName>
                <S.ItemPrice>
                  {item.formattedPriceWithQuantity !== null && (
                  <S.ItemSellPrice>
                    {formatPriceWithZeroKurus(
                      item.formattedPriceWithQuantity
                    )}
                  </S.ItemSellPrice>
                  )}
                  {formatPriceWithZeroKurus(
                    item.formattedFinalPriceWithQuantity
                  )}
                </S.ItemPrice>

                <ItemProductColumn item={item} store={store} />

                <S.QuantityEditorCollapse $open={showQuantityEditor}>
                  <ItemQuantityColumn item={item} store={store} />
                </S.QuantityEditorCollapse>
              </S.ItemDetails>
            </S.ItemContent>
          </S.Item>

          <S.ItemActions>
            <S.ActionButton
              aria-label={showQuantityEditor ? "Kapat" : "Miktar Düzenle"}
              onClick={() => setIsModalOpen(true)}
              $isActive={showQuantityEditor}
            >
              <S.IconTransition $show={showQuantityEditor}>
                <CloseSVG />
              </S.IconTransition>

              <S.IconTransition $show={!showQuantityEditor}>
                <PenSVG />
              </S.IconTransition>
            </S.ActionButton>

            <S.ActionButton>
              <FavoriteSVG />
            </S.ActionButton>

            <S.ActionButton onClick={handleRemove}>
              <DeleteSVG />
            </S.ActionButton>
          </S.ItemActions>
        </S.ItemWrapper>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={<ProductTitleComponent product={item.variant} />}
      >
        <div>
          <ItemQuantityColumn
            item={item}
            store={store}
            maxStock={selectedVariantStock}
            onExceedStock={handleExceedStock}
          />
          {showStockAlert && (
            <Alert
              text="Stoktan fazla ürün ekleyemezsiniz."
              status="error"
              closable
              onClose={() => setShowStockAlert(false)}
              style={{ marginTop: 16 }}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default observer(Item);

const ItemProductColumn = observer(
  ({ item, store }: { item: IkasOrderLineItem; store: IkasBaseStore }) => {
    const variantValuesText = item.variant.variantValues
      ?.map((vV) => vV.variantValueName)
      .join(", ");

    //Değerleri alalım
    const [colorName, sizeName] = variantValuesText
      ? variantValuesText.split(",").map((v) => v.trim())
      : ["", ""];

    return (
      <ProductColumn>
        <S.ItemAttributes>
          <span>
            {item.quantity} {t("common:piece")}
          </span>
          <S.Divider>|</S.Divider>
          <span>{colorName}</span>
          <S.Divider>|</S.Divider>
          <span>{sizeName}</span>
        </S.ItemAttributes>
      </ProductColumn>
    );
  }
);

const ItemImage = observer(({ item }: { item: IkasOrderLineItem }) => {
  return (
    <S.ItemImageWrapper>
      <Link passHref href={item.variant.href || ""}>
        <a>
          {!item.variant.mainImage?.id ? (
            <ProductImagePlaceholder />
          ) : (
            <img
              src={item.variant.mainImage.src}
              alt={item.variant.mainImage.altText || ""}
            />
          )}
        </a>
      </Link>
    </S.ItemImageWrapper>
  );
});

const ItemQuantityColumn = observer(
  ({
    item,
    store,
    maxStock,
    onExceedStock,
  }: {
    item: IkasOrderLineItem;
    store: IkasBaseStore;
    maxStock?: number;
    onExceedStock?: () => void;
  }) => {
    const handleQuantityChange = async (value: number) => {
      const result = await store.cartStore.changeItemQuantity(item, value);
      if (result.response?.graphQLErrors) {
        maxQuantityPerCartHandler({
          productName: item.variant.name,
          errors: result.response?.graphQLErrors,
        });
      }
    };

    return (
      <S.QuantityColumnWrapper>
        <QuantityColumn>
          <QuantityButton
            isFullWidth={false}
            quantity={item.quantity}
            onChange={handleQuantityChange}
            maxStock={maxStock}
            onExceedStock={onExceedStock}
          />
        </QuantityColumn>
      </S.QuantityColumnWrapper>
    );
  }
);
