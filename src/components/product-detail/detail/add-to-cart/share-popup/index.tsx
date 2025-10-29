import React, { useState } from "react";
import { IkasProduct, useTranslation } from "@ikas/storefront";

import FacebookSVG from "src/components/svg/facebook";
import WhatsAppSVG from "src/components/svg/whatsapp";
import TwitterSVG from "src/components/svg/twitter";
import InstagramSVG from "src/components/svg/instagram";
import EmailSVG from "src/components/svg/email";

import * as S from "./style";

interface SharePopupProps {
  product?: IkasProduct;
  isVisible: boolean;
  onClose: () => void;
}

export const SharePopup: React.FC<SharePopupProps> = ({
  product,
  isVisible,
  onClose,
}) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const { t } = useTranslation();

  if (!isVisible || !product) return null;

  const currentUrl = window.location.href;
  const productTitle = product.name;
  const productDescription = product.shortDescription || product.name;

  const handleCopyLink = async () => {
    try {
      await navigator?.clipboard?.writeText(currentUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Kopyalama başarısız:", err);
    }
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const handleWhatsAppShare = () => {
    const text = `${productTitle} - ${currentUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleInstagramShare = () => {
    // Instagram doesn't have a direct web share URL, so we copy the link
    handleCopyLink();
    // Optionally open Instagram in a new tab
    window.open("https://www.instagram.com/", "_blank");
  };

  const handleTwitterShare = () => {
    const text = `${productTitle}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(productTitle);
    const body = encodeURIComponent(
      `Bu ürünü beğenebileceğini düşündüm:\n\n${productTitle}\n${productDescription}\n\n${currentUrl}`
    );
    const url = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = url;
  };

  return (
    <>
      <S.Overlay onClick={onClose} />
      <S.PopupContainer>
        <S.PopupHeader>
          <S.PopupTitle>Paylaş</S.PopupTitle>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.PopupHeader>

        <S.PopupContent>
          <S.CopyLinkSection>
            <S.CopyLinkButton onClick={handleCopyLink}>
              {copySuccess
                ? "✓ " + t("product-detail:detail.share.copied")
                : t("product-detail:detail.share.copyLink")}
            </S.CopyLinkButton>
          </S.CopyLinkSection>

          <S.SocialMediaSection>
            <S.SocialMediaTitle>Sosyal Medyada Paylaş</S.SocialMediaTitle>
            <S.SocialMediaButtons>
              <S.SocialButton onClick={handleFacebookShare}>
                <FacebookSVG />
              </S.SocialButton>

              <S.SocialButton onClick={handleWhatsAppShare}>
                <WhatsAppSVG />
              </S.SocialButton>

              <S.SocialButton onClick={handleInstagramShare}>
                <InstagramSVG />
              </S.SocialButton>

              <S.SocialButton onClick={handleTwitterShare}>
                <TwitterSVG />
              </S.SocialButton>

              <S.SocialButton onClick={handleEmailShare}>
                <EmailSVG />
              </S.SocialButton>
            </S.SocialMediaButtons>
          </S.SocialMediaSection>
        </S.PopupContent>
      </S.PopupContainer>
    </>
  );
};

export default SharePopup;
