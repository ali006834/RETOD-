import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";

interface SpecialDiscountBannerProps {
  header_text?: string;
  content_text?: string;
  bg_color?: string;
}

const SpecialDiscountBanner: React.FC<SpecialDiscountBannerProps> = ({
  header_text,
  content_text,
  bg_color,
}) => {
  if (!header_text && !content_text) {
    return null;
  }

  return (
    <div className={styles.wrapper} style={{ backgroundColor: bg_color }}>
      <div className={styles.container}>
        {header_text && <h2 className={styles.header}>{header_text}</h2>}
        {content_text && (
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: content_text }}
          />
        )}
      </div>
    </div>
  );
};

export default observer(SpecialDiscountBanner);
