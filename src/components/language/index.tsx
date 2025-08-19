import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore, useTranslation } from "@ikas/storefront";
import styles from "./style.module.css";
import Close from "src/components/svg/close";
import TrFlagSvg from "src/components/svg/tr";
import EnFlagSvg from "src/components/svg/en";
import RuFlagSvg from "src/components/svg/ru";
import ArFlagSvg from "src/components/svg/ar";
import ArrowDown from "src/components/svg/arrow-down";

export const LanguageSelect = observer(() => {
  const store = useStore();
  const { t } = useTranslation();

  const value = store.languageOptions?.find((lO) => lO.isSelected);
  const defaultLanguage = "tr"; // next.config.js defaultLocale.. Şu an için Türkçe..
  const currentLanguage = value?.locale || defaultLanguage;

  const handleChangeLanguage = (item: any) => {
    if (item) {
      store.setLanguage(item);
    }
  };

  const [ShowLanguageModal, setShowLanguageModal] = useState<boolean>(false);

  if (!(store.languageOptions.length > 0)) return null;
  return (
    <div className={styles.container}>
      <div>
        <div
          className={styles.select_langauge}
          onClick={() => setShowLanguageModal(true)}
        >
          <span>
            {currentLanguage == "tr" && <TrFlagSvg />}
            {currentLanguage == "en" && <EnFlagSvg />}
            {currentLanguage == "ru" && <RuFlagSvg />}
            {currentLanguage == "ar" && <ArFlagSvg />}
          </span>
          <ArrowDown strokeColor="#000" width="16px" height="16px" />
        </div>
      </div>
      {ShowLanguageModal && (
        <div className={styles.langauge_modal}>
          <div className={styles.langauge_types}>
            <div
              className={styles.close}
              onClick={() => setShowLanguageModal(false)}
            >
              <Close />
            </div>
            <h3>{t("common:language_title")}</h3>
            {store.languageOptions.map((item) => {
              return (
                <div key={item.id} className={styles.language_content}>
                  <span>
                    {item.locale == "tr" && <TrFlagSvg />}
                    {item.locale == "en" && <EnFlagSvg />}
                    {item.locale == "ru" && <RuFlagSvg />}
                    {item.locale == "ar" && <ArFlagSvg />}
                  </span>
                  <span
                    className={
                      item.locale === value?.locale ? styles.selected_lang : ""
                    }
                    onClick={() => handleChangeLanguage(item)}
                  >
                    {t(`common:languages.language_names.${item.language}`)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});
