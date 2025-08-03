import React from "react";
import { observer } from "mobx-react-lite";
import { RegisterProps } from "../__generated__/types";
import { Image, Link, useTranslation } from "@ikas/storefront";
import Alert from "src/components/components/alert";
import Form from "src/components/components/form";
import FormItem from "src/components/components/form/form-item";
import Input from "src/components/components/input";
import Button from "src/components/components/button";
import styles from "./style.module.css";
import PhoneInput from "react-phone-input-2";
import useRegister from "./useRegister";
import * as S from "./style";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/router";

export const NS = "register";

const Register = (props: RegisterProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const register = useRegister(props);
  const { formAlert, onFormAlertClose, form } = register;

  return (
    <div className={styles.container}>
      <div className={styles.register_wrapper}>
        <div className={styles.register_content}>
          <S.Title>{t(`${NS}:title`)}</S.Title>
          <p className={styles.subtitle}>{props.content}</p>

          <RegisterFormAlert
            formAlert={formAlert}
            onFormAlertClose={onFormAlertClose}
          />
          <RegisterFormComponent {...props} {...register} />
        </div>

        <div className={styles.decorative_side}>
          {props?.image && (
            <div className={styles.image_container}>
              <Image
                className={styles.image}
                image={props?.image}
                alt={props?.image?.altText || "Right Banner"}
                layout="fill"
                objectFit="cover"
              />
              <div className={styles.image_overlay}>
                <div className={styles.image_title_brand_wrapper}>
                  <h1 className={styles.image_title_brand1}>DIZAYN</h1>
                  <h1 className={styles.image_title_brand2}>&</h1>
                  <h1 className={styles.image_title_brand3}>ELLA</h1>
                </div>
                <h2 className={styles.image_title}>
                  {props.title2?.toLocaleUpperCase("tr-TR")}
                </h2>
                <p className={styles.image_text}>
                  {t(`${NS}:alreadyHaveAccount`)}
                </p>
                <Link href="/account/login" passHref>
                  <a className={styles.image_button}>
                    {t(`${NS}:login`).toLocaleUpperCase("tr-TR")}
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(Register);

type RegisterFormAlertProps = {
  formAlert: ReturnType<typeof useRegister>["formAlert"];
  onFormAlertClose: ReturnType<typeof useRegister>["onFormAlertClose"];
};

const RegisterFormAlert = observer(
  ({ formAlert, onFormAlertClose }: RegisterFormAlertProps) => {
    if (!formAlert) return null;
    return (
      <Alert
        closable
        status={formAlert.status}
        title={formAlert.title}
        text={formAlert.text}
        onClose={onFormAlertClose}
      />
    );
  }
);

export type RegisterFormProps = RegisterProps & ReturnType<typeof useRegister>;

const RegisterFormComponent = observer((props: RegisterFormProps) => {
  const { t } = useTranslation();
  const { status, isPending, form, onFormSubmit } = props;

  return (
    <Form onSubmit={onFormSubmit}>
      <div className={styles.name_info}>
        <FormItem
          label={t(`${NS}:form.firstName`)}
          help={form.firstNameErrorMessage}
          status={status.firstName}
        >
          <Input
            status={status.firstName}
            value={form.firstName}
            onChange={(event) => form.onFirstNameChange(event.target.value)}
            placeholder="Adınızı giriniz"
            style={{
              //   border: "none",
              border: "1px solid gray",
              outline: "none",
              padding: "0 0 0 10px",
            }}
          />
        </FormItem>
        <FormItem
          label={t(`${NS}:form.lastName`)}
          help={form.lastNameErrorMessage}
          status={status.lastName}
        >
          <Input
            status={status.lastName}
            value={form.lastName}
            onChange={(event) => form.onLastNameChange(event.target.value)}
            placeholder="Soyadınızı giriniz"
            style={{
              //   border: "none",
              border: "1px solid gray",
              outline: "none",
              padding: "0 0 0 10px",
            }}
          />
        </FormItem>
      </div>

      <FormItem
        label={t(`${NS}:form.email`)}
        help={form.emailErrorMessage}
        status={status.email}
      >
        <Input
          status={status.email}
          value={form.email}
          onChange={(event) => form.onEmailChange(event.target.value)}
          placeholder="E-posta adresinizi giriniz"
          style={{
            //   border: "none",
            border: "1px solid gray",
            outline: "none",
            padding: "0 0 0 10px",
          }}
        />
      </FormItem>
      <FormItem
        help={form.phoneErrorMessage}
        status={status.phone}
        label={t(`${NS}:form.phone`)}
      >
        <PhoneInput
          countryCodeEditable={false}
          country={"tr"}
          onKeyDown={(e) => {
            if (e.keyCode === 32) {
              e.preventDefault();
            }
          }}
          onChange={(value: string) => form.onPhoneChange(value)}
          inputProps={{
            name: "phone",
            required: true,
            autoFocus: false,
          }}
        />
      </FormItem>

      <FormItem
        label={t(`${NS}:form.password`)}
        help={form.passwordErrorMessage}
        status={status.password}
      >
        <Input
          type="password"
          status={status.password}
          value={form.password}
          onChange={(event) => form.onPasswordChange(event.target.value)}
          placeholder="Şifrenizi giriniz"
          style={{
            //   border: "none",
            border: "1px solid gray",
            outline: "none",
            padding: "0 0 0 10px",
          }}
        />
      </FormItem>
      <FormItem>
        <Button block type="submit" loading={isPending} disabled={isPending}>
          {t(`${NS}:form.register`)}
        </Button>
      </FormItem>
    </Form>
  );
});

type FooterProps = {
  redirect?: string | null;
};

const Footer = ({ redirect }: FooterProps) => {
  const { t } = useTranslation();
  const redirectHref = redirect ? "?redirect=" + redirect : "";

  return (
    <S.Footer>
      <Link passHref href={`/account/forgot-password${redirectHref}`}>
        <a>{t(`${NS}:forgotPassword`)}</a>
      </Link>
    </S.Footer>
  );
};
