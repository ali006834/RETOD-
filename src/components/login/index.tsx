import React from "react";
import { observer } from "mobx-react-lite";
import { Link, useTranslation } from "@ikas/storefront";
import Alert from "src/components/components/alert";
import Form from "src/components/components/form";
import FormItem from "src/components/components/form/form-item";
import Input from "src/components/components/input";
import styles from "./style.module.css";
import Button from "src/components/components/button";
import useLogin from "./useLogin";
import useSocialLogin from "src/utils/hooks/useSocialLogin";
import { useRouter } from "next/router";

import EyeCloseIcon from "./svg/eye-close";
import EyeOpenIcon from "./svg/eye-open";

import * as S from "./style";
import { LoginProps } from "../__generated__/types";

export const NS = "login";

const Login = (props: LoginProps) => {
  const router = useRouter();

  const { t } = useTranslation();

  const login = useLogin();

  const { formAlert, onFormAlertClose, form } = login;

  return (
    <div className={styles.container}>
      <div className={styles.content_wrapper}>
        <div className={styles.login_content}>
          <S.Title>{t(`${NS}:title`)}</S.Title>
          <LoginFormAlert
            formAlert={formAlert}
            onFormAlertClose={onFormAlertClose}
          />
          <LoginFormComponent {...login} />
          <Footer redirect={form.redirect} />
        </div>
        <div className={styles.register_content}>
          <h3>{t(`${NS}:registerContent.title`)}</h3>
          <p>{t(`${NS}:registerContent.content`)}</p>
          <ul>
            <li>{t(`${NS}:registerContent.list1`)}</li>
            <li>{t(`${NS}:registerContent.list2`)}</li>
          </ul>

          <Link href="/account/register">
            {t(`${NS}:registerContent.title`)}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default observer(Login);

type LoginFormAlertProps = {
  formAlert: ReturnType<typeof useLogin>["formAlert"];
  onFormAlertClose: ReturnType<typeof useLogin>["onFormAlertClose"];
};

const LoginFormAlert = observer(
  ({ formAlert, onFormAlertClose }: LoginFormAlertProps) => {
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

type LoginFormProps = ReturnType<typeof useLogin>;

const LoginFormComponent = observer(
  ({ status, isPending, form, setFormAlert, onFormSubmit }: LoginFormProps) => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = React.useState(false); // Yeni state eklendi

    const { onSocialLogin } = useSocialLogin({
      onStatusSuccess: () => {
        setFormAlert({
          status: "success",
          title: t(`${NS}:formAlert.successTitle`),
          text: t(`${NS}:formAlert.successText`),
        });
      },
      onStatusFail: (error?: string | null) => {
        setFormAlert({
          status: "error",
          title: t(`${NS}:formAlert.unsuccessTitle`),
          text: error || t(`${NS}:formAlert.errorText`),
        });
      },
    });

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <Form onSubmit={onFormSubmit}>
        <FormItem
          label={t(`${NS}:form.email`)}
          help={form.emailErrorMessage}
          status={status.email}
        >
          <Input
            status={status.email}
            value={form.email}
            onChange={(event) => form.onEmailChange(event.target.value)}
            placeholder="Lütfen e-posta hesabınızı yazınız"
            style={{
              fontFamily: "Helvetica",
              fontWeight: "300",
              border: "1px solid gray",
              outline: "none",
              padding: "0 0 0 10px",
            }}
          />
        </FormItem>
        <FormItem
          label={t(`${NS}:form.password`)}
          help={form.passwordErrorMessage}
          status={status.password}
        >
          <div style={{ position: "relative" }}>
            <Input
              type={showPassword ? "text" : "password"} // Tipi değiştiriyoruz
              status={status.password}
              value={form.password}
              onChange={(event) => form.onPasswordChange(event.target.value)}
              placeholder="Lütfen şifrenizi yazınız"
              style={{
                fontFamily: "Helvetica",
                fontWeight: "300",
                border: "1px solid gray",
                outline: "none",
                padding: "0 0 0 10px",
                width: "100%", // Genişliği tam yapıyoruz
              }}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "5px 0 0 0",
              }}
            >
              {showPassword ? (
                <span>
                  <EyeOpenIcon />
                </span>
              ) : (
                <span>
                  <EyeCloseIcon />
                </span>
              )}
            </button>
          </div>
        </FormItem>
        <Button block type="submit" loading={isPending} disabled={isPending}>
          {t(`${NS}:form.login`)}
        </Button>
      </Form>
    );
  }
);

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
