import React from "react";
import styles from "./style.module.css";
import { BottomScrollingTextProps } from "src/components/__generated__/types";
import { toJS } from "mobx";

const ScrollingText = (props: BottomScrollingTextProps) => {
  const { scrollingTexts, transitionPeriod } = props;

  const scrollingTextsArr = toJS(scrollingTexts);

  // scrollingTexts array'inden content property'lerini al ve boş olmayanları filtrele
  const texts =
    scrollingTextsArr?.map((item: any) => item?.content).filter(Boolean) || [];

  // Metinleri nokta ile birleştir ve tekrarla
  const scrollingText = texts.length > 0 ? texts.join("  •  ") + "  •  " : " ";

  return (
    <div className={styles.header_container}>
      <div className={styles.header_content}>
        {/* Scrolling text area - now takes full available width */}
        <div className={styles.scrolling_text_container}>
          <div className={styles.scrolling_text_wrapper}>
            <div
              className={styles.scrolling_text_item}
              style={
                {
                  "--transition-period": `${transitionPeriod || 2000}s`,
                } as React.CSSProperties
              }
            >
              <span
                className={styles.text_content}
                dangerouslySetInnerHTML={{ __html: scrollingText.repeat(10) }}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollingText;
