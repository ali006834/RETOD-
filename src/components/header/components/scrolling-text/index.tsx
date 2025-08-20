import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { HeaderProps } from "src/components/__generated__/types";
import { toJS } from "mobx";

const ScrollingText = (props: HeaderProps) => {
  const { scrollingTexts } = props;

  const scrollingTextsArr = toJS(scrollingTexts);

  // scrollingTexts array'inden content property'lerini al ve boş olmayanları filtrele
  const texts =
    scrollingTextsArr?.map((item: any) => item?.content).filter(Boolean) || [];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className={styles.header_container}>
      <div className={styles.header_content}>
        {/* Scrolling text area - now takes full available width */}
        <div className={styles.scrolling_text_container}>
          <div className={styles.scrolling_text_wrapper}>
            {texts.map((text, index) => (
              <div
                key={index}
                className={`${styles.scrolling_text_item} ${
                  index === activeIndex ? styles.active : ""
                }`}
              >
                <span className={styles.text_content}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollingText;
