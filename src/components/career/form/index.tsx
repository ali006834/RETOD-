import React, { useRef } from "react";
import styles from "./style.module.css";
import { Link, useTranslation } from "@ikas/storefront";
import Modal from "src/components/components/modal";
import Success from "../../contact/form/svg/success";
import Error from "../../contact/form/svg/error";
import Refresh from "./svg/refresh";

interface CareerFormProps {
  departments: Array<{
    name: string;
    departments: Array<{
      positionName: string;
    }>;
  }>;
  otherInformation?: string;
  accessKey: string;
}

const CareerForm: React.FC<CareerFormProps> = ({
  departments,
  otherInformation,
  accessKey,
}) => {
  const [formData, setFormData] = React.useState({
    department: "",
    position: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
    resume: "",
  });

  const [positions, setPositions] = React.useState<
    Array<{ positionName: string }>
  >([]);

  // Loading state
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Modal state
  const [modal, setModal] = React.useState<{
    show: boolean;
    type: "error" | "success" | "info";
    title?: string;
    text: string;
  }>({
    show: false,
    type: "info",
    text: "",
  });

  // Phone validation state
  const [phoneError, setPhoneError] = React.useState("");
  const [captchaValue, setCaptchaValue] = React.useState("");
  const [captchaError, setCaptchaError] = React.useState("");

  // Generate random captcha
  const [captchaQuestion, setCaptchaQuestion] = React.useState(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { num1, num2, answer: num1 + num2 };
  });

  // Phone number validation function
  const validatePhone = (phone: string) => {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, "");

    // Check if it's exactly 11 digits and starts with 0
    if (digitsOnly.length !== 11 || !digitsOnly.startsWith("0")) {
      return "Telefon numarası 11 haneli olmalı ve 0 ile başlamalıdır";
    }

    // Check if it matches Turkish mobile format (05xx) or landline format (02xx, 03xx, etc.)
    const mobilePattern = /^05\d{9}$/;
    const landlinePattern = /^0[2-4]\d{8}$/;

    if (!mobilePattern.test(digitsOnly) && !landlinePattern.test(digitsOnly)) {
      return "Geçerli bir telefon numarası giriniz";
    }

    return "";
  };

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, "");

    // Limit to 11 digits
    const limitedDigits = digitsOnly.slice(0, 11);

    // Format: 0 (000) 000 00 00
    if (limitedDigits.length >= 1) {
      let formatted = limitedDigits[0]; // 0
      if (limitedDigits.length >= 2) {
        formatted += " (" + limitedDigits.slice(1, 4); // 0 (000
        if (limitedDigits.length >= 4) {
          formatted += ") " + limitedDigits.slice(4, 7); // 0 (000) 000
          if (limitedDigits.length >= 7) {
            formatted += " " + limitedDigits.slice(7, 9); // 0 (000) 000 00
            if (limitedDigits.length >= 9) {
              formatted += " " + limitedDigits.slice(9, 11); // 0 (000) 000 00 00
            }
          }
        }
      }
      return formatted;
    }
    return limitedDigits;
  };

  // Form verilerini güncelleme fonksiyonu
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const formattedPhone = formatPhoneNumber(value);
      const phoneValidationError = validatePhone(formattedPhone);

      setFormData((prev) => ({
        ...prev,
        [name]: formattedPhone,
      }));

      setPhoneError(phoneValidationError);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Form gönderim işlemi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone number before submission
    const phoneValidationError = validatePhone(formData.phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }

    // Validate captcha
    if (captchaValue !== captchaQuestion.answer.toString()) {
      setCaptchaError("Güvenlik sorusu yanlış cevaplandı");
      return;
    }

    setIsSubmitting(true);

    try {
      // Form verilerini direkt Web3Forms'a gönder
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", accessKey);
      formDataToSend.append("subject", "Yeni İş Başvurusu - Dizaynella");
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setModal({
          show: true,
          type: "success",
          title: t(`${NS}:success.title`),
          text: t(`${NS}:success.applicationSentSuccessfully`),
        });

        // Formu sıfırla
        setFormData({
          department: "",
          position: "",
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: "",
          resume: "",
        });
        setPhoneError("");
        setCaptchaError("");
        setCaptchaValue("");
        // Generate new captcha
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        setCaptchaQuestion({ num1, num2, answer: num1 + num2 });
      } else {
        throw result.message || "Form gönderilemedi";
      }
    } catch (error) {
      console.error("Gönderim hatası:", error);

      setModal({
        show: true,
        type: "error",
        title: t(`${NS}:errors.title`),
        text: t(`${NS}:errors.errorOccurredMessage`),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Departman değiştiğinde pozisyonları güncelle
  React.useEffect(() => {
    if (formData.department && departments) {
      const selectedDepartment = departments.find(
        (dept) => dept.name === formData.department
      );
      if (selectedDepartment && selectedDepartment.departments) {
        setPositions(selectedDepartment.departments);
      } else {
        setPositions([]);
      }
      setFormData((prev) => ({ ...prev, position: "" }));
    }
  }, [formData.department, departments]);

  const { t } = useTranslation();
  const NS = "career";

  return (
    <div className={styles.form_section}>
      <div className={styles.form_container}>
        <h2 className={styles.form_title}>
          {t(`${NS}:application`).toLocaleUpperCase("tr-TR")}
        </h2>
        <p className={styles.form_disclaimer}>
          {t(`${NS}:formText`)}{" "}
          <Link href="/pages/gizlilik-politikasi" passHref>
            <a className={styles.privacy_link}>{t(`${NS}:fromHere`)}</a>
          </Link>{" "}
          {t(`${NS}:toReach`)}
        </p>

        <form onSubmit={handleSubmit} className={styles.career_form}>
          {/* Department and Position Selection */}
          <div className={styles.form_row}>
            <div className={styles.form_group}>
              <label htmlFor="department">
                {t(`${NS}:subject`).toLocaleUpperCase("tr-TR")}
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                disabled={!departments || departments.length === 0}
              >
                <option value="">{t(`${NS}:select`)}</option>
                {departments?.map((dept, index) => (
                  <option key={index} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.form_group}>
              <label htmlFor="position">
                {t(`${NS}:subSubject`).toLocaleUpperCase("tr-TR")}
              </label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                disabled={positions.length === 0}
              >
                <option value="">{t(`${NS}:select`)}</option>
                {positions.map((position, index) => (
                  <option key={index} value={position.positionName}>
                    {position.positionName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Personal Info */}
          <div className={styles.form_row}>
            <div className={styles.form_group}>
              <label htmlFor="firstName">{t(`${NS}:firstName`)}</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="lastName">{t(`${NS}:lastName`)}</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.form_row}>
            <div className={styles.form_group}>
              <label htmlFor="phone">{t(`${NS}:phone`)}</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {phoneError && (
                <span className={styles.error_message}>{phoneError}</span>
              )}
            </div>

            <div className={styles.form_group}>
              <label htmlFor="email">{t(`${NS}:email`)}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Message */}
          <div className={styles.form_group}>
            <label htmlFor="message">{t(`${NS}:message`)}</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          {/* Özgeçmiş */}
          <div className={styles.form_group}>
            <label htmlFor="resume">{t(`${NS}:resume`)}</label>
            <textarea
              id="resume"
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              rows={8}
              placeholder="Özgeçmişinizi buraya yazabilirsiniz..."
            />
          </div>

          {/* Captcha */}
          <div className={styles.form_group}>
            <label htmlFor="captcha">Güvenlik Sorusu</label>
            <div className={styles.captcha_container}>
              <span className={styles.captcha_question}>
                {captchaQuestion.num1} + {captchaQuestion.num2} = ?
              </span>
              <input
                type="number"
                id="captcha"
                name="captcha"
                value={captchaValue}
                onChange={(e) => {
                  setCaptchaValue(e.target.value);
                  setCaptchaError("");
                }}
                placeholder="Sonucu giriniz"
                required
                className={styles.captcha_input}
              />
              <button
                type="button"
                onClick={() => {
                  const num1 = Math.floor(Math.random() * 10) + 1;
                  const num2 = Math.floor(Math.random() * 10) + 1;
                  setCaptchaQuestion({ num1, num2, answer: num1 + num2 });
                  setCaptchaValue("");
                  setCaptchaError("");
                }}
                className={styles.refresh_captcha}
                title="Yeni soru"
              >
                <Refresh width="18" height="18" fill="#1C274C" />
              </button>
            </div>
            {captchaError && (
              <span className={styles.error_message}>{captchaError}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submit_button}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Gönderiliyor..." : t(`${NS}:submit`)}
          </button>
        </form>
      </div>

      {/* Contact Information */}
      {otherInformation && (
        <div
          className={styles.contact_info}
          dangerouslySetInnerHTML={{ __html: otherInformation }}
        />
      )}

      {/* Modal for messages */}
      <Modal
        visible={modal.show}
        title=""
        onClose={() => setModal({ ...modal, show: false })}
      >
        <div className={styles.modal_content}>
          {/* Logo */}
          <img
            src="/image/logo/logo-dizaynella.png"
            alt="Dizaynella Logo"
            className={styles.modal_logo}
          />

          {/* Icon */}
          {modal.type === "success" ? (
            <Success width="60" height="60" fill="#2e7d32" />
          ) : (
            <Error width="60" height="60" fill="#d32f2f" />
          )}

          {/* Title */}
          <h3
            className={`${styles.modal_title} ${
              modal.type === "error"
                ? styles.modal_title_error
                : styles.modal_title_success
            }`}
          >
            {modal.title}
          </h3>

          {/* Message */}
          <p className={styles.modal_message}>{modal.text}</p>
        </div>
      </Modal>
    </div>
  );
};

export default CareerForm;
