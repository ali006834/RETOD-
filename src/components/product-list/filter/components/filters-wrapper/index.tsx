import React, { useState } from "react";
import { IkasProductFilterSettings } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";

import * as S from "./style";
import styles from "./style.module.css";

type FiltersWrapperProps = {
  noBorder?: boolean;
  title: string;
  settings?: IkasProductFilterSettings | null | undefined;
  children: React.ReactNode;
  defaultOpen?: boolean; //Başlangıç ta açık gelsin mi?
};

export const FiltersWrapper = (props: FiltersWrapperProps) => {
  const { settings, defaultOpen } = props;
  const { isMobile } = useScreen();

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
          <S.FilterTitle>{props.title}</S.FilterTitle>
          <div className={styles.toggle_icon} />
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
