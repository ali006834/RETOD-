import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";

interface SpecialDiscountBannerProps {
  header_text?: string;
  content_text?: string;
  bg_color?: string;
  header_color?: string;
  content_color?: string;
  isColorEffectEnabled?: boolean;
  isTextEffectEnabled?: boolean;
}

const SpecialDiscountBanner: React.FC<SpecialDiscountBannerProps> = ({
  header_text,
  content_text,
  bg_color,
  header_color = "#d0021b",
  content_color = "inherit",
  isColorEffectEnabled = false,
  isTextEffectEnabled = false,
}) => {
  if (!header_text && !content_text) {
    return null;
  }

  // Hex to RGB conversion
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 208, g: 2, b: 27 }; // fallback to default red
  };

  const rgbColor = hexToRgb(header_color);

  const wrapperClass = isColorEffectEnabled
    ? styles.wrapper
    : styles.wrapperNoEffect;

  const headerClass = isTextEffectEnabled
    ? styles.header
    : styles.headerNoEffect;

  const contentClass = isTextEffectEnabled
    ? styles.content
    : styles.contentNoEffect;

  return (
    <div
      className={wrapperClass}
      style={
        {
          backgroundColor: bg_color,
          "--header-color": header_color,
          "--header-r": rgbColor.r,
          "--header-g": rgbColor.g,
          "--header-b": rgbColor.b,
        } as React.CSSProperties & {
          "--header-color": string;
          "--header-r": number;
          "--header-g": number;
          "--header-b": number;
        }
      }
    >
      <div className={styles.container}>
        {header_text && (
          <h2 className={headerClass} style={{ color: header_color }}>
            {header_text}
          </h2>
        )}
        {content_text && (
          <div
            className={contentClass}
            style={{ color: content_color }}
            dangerouslySetInnerHTML={{ __html: content_text }}
          />
        )}
      </div>
    </div>
  );
};

export default observer(SpecialDiscountBanner);
