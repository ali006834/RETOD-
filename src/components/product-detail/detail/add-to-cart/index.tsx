import React, { useState } from "react";
import { IkasProduct } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import Button from "src/components/components/button";
import { BackInStock } from "./back-in-stock";
import useAddToCartButton from "./hooks/useAddToCartButton";
import { ProductDetailProps } from "src/components/__generated__/types";

import BellSVG from "./svg/bs-bell";
import BellFillSVG from "./svg/bs-bell-fill";
import Alert from "src/components/components/alert";
import ShareSVG from "src/components/svg/share";
import FavoriteSVG from "src/components/svg/favorite";
import useFavorite from "../favorite-button/useFavorite";
import ModalLoginRequired from "../components/modal-login-required";
import { useTranslation } from "@ikas/storefront";
import { Loading } from "src/components/components/button";
import SharePopup from "./share-popup";

import * as S from "./style";
import product from "src/components/product-list/product";

export const AddToCart = observer((props: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [showStockAlert, setShowStockAlert] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const { t } = useTranslation();

  const hasStock = props.product?.selectedVariant.hasStock;

  //Seçilen varyantın stok adedi
  const selectedVariantStock = props.product?.selectedVariant?.stock;
  const handleExceedStock = () => {
    setShowStockAlert(true);
    setTimeout(() => setShowStockAlert(false), 2500);
  };

  // Favorite functionality
  const {
    isProductFavorite,
    showLoginModal,
    closeLoginModal,
    pending: favoritePending,
    toggleFavorite,
  } = useFavorite({
    productId: props.product?.id || "",
  });

  const handleShare = () => {
    setShowSharePopup(true);
  };

  const handleCloseSharePopup = () => {
    setShowSharePopup(false);
  };

  const modalLoginText = (key: string) =>
    t(`common:favorite.loginModal.${key}`);

  // console.log("Seçilen beden stoğu:", selectedVariantStock);

  return (
    <>
      <S.Wrapper>
        {hasStock && (
          <QuantityButton
            quantity={quantity}
            onChange={setQuantity}
            maxStock={selectedVariantStock}
            onExceedStock={handleExceedStock}
          />
        )}
        <AddToCartButton product={props.product} quantity={quantity} />
        <S.ActionButtonsGroup>
          <S.ActionButton onClick={toggleFavorite} disabled={favoritePending}>
            {favoritePending ? (
              <Loading />
            ) : (
              <FavoriteSVG
                width="24px"
                height="24px"
                color={isProductFavorite ? "#d14600" : "#666"}
                fill={isProductFavorite}
              />
            )}
          </S.ActionButton>
          <S.ActionButton onClick={handleShare}>
            <ShareSVG width="24px" height="24px" fill="#666" />
          </S.ActionButton>
          <SharePopup
            product={props.product}
            isVisible={showSharePopup}
            onClose={handleCloseSharePopup}
          />
        </S.ActionButtonsGroup>
        <BackInStock product={props.product} />
      </S.Wrapper>
      {showStockAlert && (
        <Alert
          text="Stoktan fazla ürün ekleyemezsiniz."
          status="error"
          closable
          onClose={() => setShowStockAlert(false)}
        />
      )}
      <ModalLoginRequired
        isModalVisible={showLoginModal}
        title={modalLoginText("title")}
        text={modalLoginText("text")}
        loginButtonText={modalLoginText("loginButtonText")}
        noAccountText={modalLoginText("noAccountText")}
        redirectUrl={props.product?.href || ""}
        onClose={closeLoginModal}
      />
    </>
  );
});

AddToCart.displayName = "AddToCart";

type AddToCartButtonProps = {
  product?: IkasProduct;
  quantity: number;
};

const AddToCartButton = observer(
  ({ product, quantity }: AddToCartButtonProps) => {
    if (!product) {
      return null;
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
      quantity,
    });

    return (
      <Button
        block
        stopPropagation
        loading={loading}
        disabled={disabled}
        onClick={onButtonClick}
        size="large"
      >
        {buttonText}
        {buttonState === "backInStock" && (
          <S.Icon>
            {isBackInStockReminderSaved && <BellFillSVG />}
            {!isBackInStockReminderSaved && <BellSVG />}
          </S.Icon>
        )}
      </Button>
    );
  }
);

type QuantityButtonProps = {
  isFullWidth?: boolean;
  quantity: number;
  onChange: (value: number) => void;
  product?: IkasProduct;
  maxStock?: number;
  onExceedStock?: () => void;
};

export const QuantityButton = ({
  isFullWidth = true,
  quantity,
  onChange,
  maxStock,
  onExceedStock,
}: QuantityButtonProps) => {
  const handleDecrease = () => {
    if (!(quantity > 1)) return;
    onChange(quantity - 1);
  };

  const handleIncrease = () => {
    if (maxStock !== undefined && quantity >= maxStock) {
      if (onExceedStock) onExceedStock();
      return;
    }
    onChange(quantity + 1);
  };

  return (
    <>
      <S.QuantityButtonWrapper>
        <S.DecreaseButton onClick={handleDecrease}>
          <MinusSVG />
        </S.DecreaseButton>
        <S.Quantity $isFullWidth={isFullWidth}>{quantity}</S.Quantity>
        <S.IncreaseButton onClick={handleIncrease}>
          <PlusSVG />
        </S.IncreaseButton>
      </S.QuantityButtonWrapper>
    </>
  );
};

const MinusSVG = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 4H8" stroke="#22252A" />
  </svg>
);

const PlusSVG = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 4H8" stroke="#22252A" />
    <path d="M4 8L4 2.38419e-07" stroke="#22252A" />
  </svg>
);
