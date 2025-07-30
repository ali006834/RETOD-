import React, { useState } from "react";
import { useTranslation } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import useEmailSubscription from "./useEmailSubscription";
import Modal from "src/components/components/modal";
import FormItem from "src/components/components/form/form-item";

import { NS } from "src/components/footer";

import * as S from "./style";

import styles from "./style.module.css";
import ArrowRight from "src/components/svg/arrow-right";

const EmailSubscription = () => {
  const { t } = useTranslation();
  const {
    pending,
    responseStatus,
    visible,
    onSubmit,
    isModalVisible,
    onModalClose,
    email,
    setEmail,
  } = useEmailSubscription();

  const [isFocused, setIsFocused] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(email.trim() !== ""); // Eğer email boşsa, etiket eski haline döner..

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmpty(e.target.value === "");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmpty) {
      alert(t(`${NS}:emailSubscription.form.emptyFieldWarning`));
    } else {
      onSubmit();
    }
  };

  //Mail onay kutusu korntolu
  const [checked, setChecked] = useState(false);

  if (!visible) return null;
  return (
    <div className={styles.EmailSubscription}>
      <p className={styles.Title}>
        {t(`${NS}:emailSubscription.sloganShoulderStyle`)}
      </p>
      <form className={styles.CustomForm} onSubmit={handleSubmit}>
        <div className={styles.InputContainer}>
          <span
            className={`${styles.FloatingLabel} ${
              isFocused || email.trim().length > 0 ? styles.isFocused : ""
            }`}
          >
            {t(`${NS}:emailSubscription.form.email`)}
          </span>
          <input
            required
            type="email"
            value={email}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleInputChange}
            className={styles.Input}
          />
          <button
            className={styles.ArrowButton}
            type="submit"
            disabled={isEmpty || pending}
          >
            <ArrowRight />
          </button>
        </div>
      </form>
      <S.CheckboxContainer>
        <S.Checkbox
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          required
        />
        <S.CheckboxLabel
          dangerouslySetInnerHTML={{
            __html: t(`${NS}:emailSubscription.form.info`),
          }}
        />
      </S.CheckboxContainer>
      <Modal visible={isModalVisible} onClose={onModalClose}>
        {responseStatus && (
          <p
            className={styles.ResponseStatus}
            style={
              {
                "--status-color":
                  responseStatus === "error" ? "#f44336" : "#4caf50",
              } as React.CSSProperties
            }
          >
            {t(`${NS}:emailSubscription.responseStatus.${responseStatus}`)}
          </p>
        )}
      </Modal>
    </div>
  );
};

export default observer(EmailSubscription);
