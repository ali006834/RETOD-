import React, { useState } from "react";
import { IkasProductFilterSettings, useTranslation } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";
import ArrowDown from "src/components/svg/arrow-down";

import * as S from "./style";
import styles from "./style.module.css";

type FiltersWrapperProps = {
  noBorder?: boolean;
  title: string;
  settings?: IkasProductFilterSettings | null | undefined;
  children: React.ReactNode;
  defaultOpen?: boolean; //Başlangıç ta açık gelsin mi?
  selectedValues?: string[]; // Seçili değerlerin isimleri
};

export const FiltersWrapper = (props: FiltersWrapperProps) => {
  const { settings, defaultOpen, selectedValues } = props;
  const { isMobile } = useScreen();
  const { t } = useTranslation();

  // Başlangıç durumunu belirle:
  // 1. Eğer defaultOpen explicit olarak belirtilmişse onu kullan
  // 2. Belirtilmemişse, settings'e göre davran
  const [active, setActive] = useState(
    typeof defaultOpen !== "undefined"
      ? defaultOpen
      : isMobile
      ? !!settings?.showCollapsedOnMobile
      : !!settings?.showCollapsedOnDesktop
  );

  return (
    <S.FiltersWrapper $noBorder={props.noBorder}>
      <div className={styles.filter_group}>
        <div
          className={`${styles.filter_group_title} ${
            active ? styles.active : ""
          }`}
          onClick={() => setActive((prev) => !prev)}
        >
          <div>
            <S.FilterTitle>{props.title}</S.FilterTitle>
            {selectedValues !== undefined && (
              <div
                style={{
                  fontSize: "12px",
                  color: "#979897",
                  marginTop: "4px",
                  fontFamily: "Helvetica",
                }}
              >
                {selectedValues.length > 0
                  ? selectedValues.join(", ")
                  : t("list.filters.sort.all")}
              </div>
            )}
          </div>
          <ArrowDown
            className={`${styles.toggle_icon} ${active ? styles.rotated : ""}`}
            strokeColor="#333"
            width="16px"
            height="16px"
          />
        </div>
        <div
          className={`${styles.filter_group_content} ${
            active ? styles.open : ""
          }`}
        >
          {props.children}
        </div>
      </div>
    </S.FiltersWrapper>
  );
};
