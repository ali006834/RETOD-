import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { IkasProduct } from "@ikas/storefront";
import {
  CampaignTagsMain,
  CampaignTags,
  AlignmentSettings,
  AnimationTypes,
} from "src/components/__generated__/types";
import { useScreen } from "src/utils/hooks/useScreen";
import styles from "./style.module.css";

type Props = {
  product: IkasProduct;
  campaignList?: CampaignTagsMain;
  className?: string;
};

const CampaignTag = observer(
  ({ product, campaignList, className = "" }: Props) => {
    const { isMobile } = useScreen();
    const [activeIndex, setActiveIndex] = useState(0);

    // Badge hesaplama — hook'lardan önce, null-safe
    let badges: CampaignTags[] = [];
    if (campaignList?.badge) {
      try {
        if (typeof campaignList.badge === "string") {
          badges = JSON.parse(campaignList.badge) as CampaignTags[];
        } else if (Array.isArray(campaignList.badge)) {
          badges = toJS(campaignList.badge) as CampaignTags[];
        } else {
          badges = [toJS(campaignList.badge) as CampaignTags];
        }
      } catch (e) {
        badges = [];
      }
    }

    // Filter badges based on product tags
    const filteredBadges = badges.filter((badge) => {
      if (!badge?.badgeWithTagsName) return true;
      if (!product?.tags || product.tags.length === 0) return false;
      return product.tags.some(
        (productTag) =>
          productTag.name.toLocaleLowerCase("tr-TR") ===
          badge.badgeWithTagsName?.toLocaleLowerCase("tr-TR")
      );
    });

    const loopDuration = campaignList?.badgeLoopDuration?.value || 5;

    // useEffect erken return'lerden ÖNCE — React hooks kuralı
    useEffect(() => {
      if (filteredBadges.length <= 1) return;

      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % filteredBadges.length);
      }, loopDuration * 1000);

      return () => clearInterval(interval);
    }, [filteredBadges.length, loopDuration]);

    // Erken çıkışlar hook'lardan SONRA
    if (!campaignList || !campaignList.badge) return null;
    if (filteredBadges.length === 0) return null;

    const badgeAnimation =
      (campaignList.badgeAnimation as AnimationTypes) || AnimationTypes["Slide up/down"];
    const badgeAlignment =
      campaignList.badgeAlignment || AlignmentSettings.center;

    // Helper function to create gradient background
    const getGradientBackground = () => {
      const color1 = campaignList.badgeBgColor1 || "#f0f0f0";
      const color2 = campaignList.badgeBgColor2 || "#e0e0e0";
      return `linear-gradient(90deg, ${color1} 0%, ${color2} 100%)`;
    };

    // Container style - arka plan burada sabit kalacak
    const containerStyle: React.CSSProperties = {
      background: getGradientBackground(),
      minHeight: isMobile
        ? `${campaignList.badgeMobileHeight?.value || 25}${
            campaignList.badgeMobileHeight?.unit || "px"
          }`
        : `${campaignList.badgeHeight?.value || 30}${
            campaignList.badgeHeight?.unit || "px"
          }`,
    };

    // Badge style - sadece içerik için (yazı rengi, font size)
    const badgeStyle: React.CSSProperties = {
      color: campaignList.badgeTextColor || "#333",
      fontSize: isMobile
        ? `${campaignList.badgeMobileFontSize?.value || 12}${
            campaignList.badgeMobileFontSize?.unit || "px"
          }`
        : `${campaignList.badgeFontSize?.value || 12}${
            campaignList.badgeFontSize?.unit || "px"
          }`,
      width: "100%",
      height: isMobile
        ? `${campaignList.badgeMobileHeight?.value || 25}${
            campaignList.badgeMobileHeight?.unit || "px"
          }`
        : `${campaignList.badgeHeight?.value || 30}${
            campaignList.badgeHeight?.unit || "px"
          }`,
      textAlign:
        badgeAlignment === AlignmentSettings.left ||
        badgeAlignment === AlignmentSettings.start
          ? "left"
          : "center",
    };

    const getAnimationClasses = (isActive: boolean) => {
      if (badgeAnimation === AnimationTypes["Slide up/down"]) {
        return isActive
          ? styles.slideUpDownActive
          : styles.slideUpDownInactive;
      }

      if (badgeAnimation === AnimationTypes["Fade Slow Effect"]) {
        return isActive
          ? styles.fadeSlowActive
          : styles.fadeSlowInactive;
      }

      return isActive ? styles.slideUpDownActive : styles.slideUpDownInactive;
    };

    const renderBadge = (
      badge: CampaignTags,
      index: number,
      isActive: boolean
    ) => {
      // badgeIcon string veya Image objesi olabilir
      let imageSrc: string | null = null;
      if (badge?.badgeIcon) {
        if (typeof badge.badgeIcon === "string") {
          imageSrc = badge.badgeIcon;
        } else if (typeof badge.badgeIcon === "object") {
          imageSrc =
            (badge.badgeIcon as any)?.src ||
            ((badge.badgeIcon as any)?.getSrc
              ? (badge.badgeIcon as any).getSrc(1080)
              : null);
        }
      }

      const alignmentClass =
        badgeAlignment === AlignmentSettings.left ||
        badgeAlignment === AlignmentSettings.start
          ? styles.alignLeft
          : styles.alignCenter;

      return (
        <div
          key={index}
          className={`${styles.badge} ${alignmentClass} ${getAnimationClasses(
            isActive
          )}`}
          style={badgeStyle}
        >
          {imageSrc && (
            <div
              className={styles.badgeIcon}
              style={{
                width: badge.iconWidthValue?.value
                  ? `${badge.iconWidthValue.value}px`
                  : "20px",
                height: badge.iconWidthValue?.value
                  ? `${badge.iconWidthValue.value}px`
                  : "20px",
              }}
            >
              <img
                src={imageSrc}
                alt={
                  typeof badge.badgeIcon === "object" && badge.badgeIcon
                    ? (badge.badgeIcon as any)?.altText || ""
                    : ""
                }
                className={styles.badgeIconImage}
              />
            </div>
          )}
          {badge?.badgeName && <span>{badge.badgeName}</span>}
        </div>
      );
    };

    // Get alignment classes for container
    const getContainerAlignmentClass = () => {
      if (
        badgeAlignment === AlignmentSettings.left ||
        badgeAlignment === AlignmentSettings.start
      ) {
        return styles.containerLeft;
      }
      return styles.containerCenter;
    };

    const containerClass = getContainerAlignmentClass();

    // Animated badges - only Slide up/down and Fade Slow Effect
    return (
      <div
        className={`${styles.container} ${containerClass} ${className}`}
        style={containerStyle}
      >
        {filteredBadges.map((badge, index) =>
          renderBadge(badge, index, index === activeIndex)
        )}
      </div>
    );
  }
);

CampaignTag.displayName = "CampaignTag";

export default CampaignTag;

