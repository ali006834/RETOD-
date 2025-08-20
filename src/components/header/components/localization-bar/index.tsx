import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import { Localization } from "src/components/__generated__/types";
import useLocalization from "./useLocalization";
import CloseIcon from "src/components/svg/close";
import WorldIcon from "src/components/svg/world";
import ArrowDown from "src/components/svg/arrow-down";

import styles from "./style.module.css";

const LocalizationBar = (props: Localization) => {
  const {
    showLocaleBar,
    selectedLocalization,
    options,
    onLocaleChange,
    onButtonClick,
  } = useLocalization();

  const [showModal, setShowModal] = useState<boolean>(false);

  if (!showLocaleBar) return null;

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.selectButton} onClick={() => setShowModal(true)}>
          <span>
            <WorldIcon color="#000" width="20" height="20" />
          </span>
          <ArrowDown strokeColor="#000" width="16px" height="16px" />
        </div>
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div
              className={styles.closeButton}
              onClick={() => setShowModal(false)}
            >
              <CloseIcon />
            </div>
            <h3>{props.text}</h3>

            <div className={styles.localeSelectWrapper}>
              <select
                name="countries"
                value={selectedLocalization?.id}
                onChange={(e) => onLocaleChange(e.target.value)}
                className={styles.select}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.buttonWrapper}>
              <button
                onClick={() => {
                  onButtonClick();
                  setShowModal(false);
                }}
              >
                {props.buttonText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(LocalizationBar);
