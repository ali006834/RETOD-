import React, { useRef } from "react";
import styles from "./style.module.css";
import { Link, useTranslation } from "@ikas/storefront";
import Modal from "src/components/components/modal";
import Success from "./svg/success";
import Error from "./svg/error";

interface RefundFormProps {
  refundForm: Array<{
    name: string;
    messageType: Array<{
      messageName: string;
      subTopic?: Array<{
        topicName: string;
        subTopic?: any;
      }>;
    }>;
  }>;
  accessKey: string;
}

const RefundForm: React.FC<RefundFormProps> = ({ refundForm, accessKey }) => {
  const [formData, setFormData] = React.useState({
    mainTopic: "",
    subTopic: "",
    subSubTopic: "",
    orderNumber: "",
    invoiceNumber: "",
    productCode: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [subTopics, setSubTopics] = React.useState<
    Array<{ messageName: string; subTopic?: any }>
  >([]);
  const [subSubTopics, setSubSubTopics] = React.useState<Array<any>>([]);

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

  // Telefon numarasını formatlama fonksiyonu
  const formatPhoneNumber = (value: string): string => {
    // Sadece rakamları al
    const numbers = value.replace(/\D/g, "");

    // Maksimum 11 rakam
    const limitedNumbers = numbers.slice(0, 11);

    // Türk telefon numarası formatı: 0 (000) 000 00 00
    if (limitedNumbers.length === 0) return "";
    if (limitedNumbers.length <= 1) return limitedNumbers;
    if (limitedNumbers.length <= 4) return `0 (${limitedNumbers.slice(1)}`;
    if (limitedNumbers.length <= 7)
      return `0 (${limitedNumbers.slice(1, 4)}) ${limitedNumbers.slice(4)}`;
    if (limitedNumbers.length <= 9)
      return `0 (${limitedNumbers.slice(1, 4)}) ${limitedNumbers.slice(
        4,
        7
      )} ${limitedNumbers.slice(7)}`;
    return `0 (${limitedNumbers.slice(1, 4)}) ${limitedNumbers.slice(
      4,
      7
    )} ${limitedNumbers.slice(7, 9)} ${limitedNumbers.slice(9)}`;
  };

  // Telefon numarası validasyonu
  const validatePhoneNumber = (phone: string): boolean => {
    const numbers = phone.replace(/\D/g, "");
    return numbers.length === 11 && numbers.startsWith("0");
  };

  // Form verilerini güncelleme fonksiyonu
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Telefon numarası için özel işlem
    if (name === "phone") {
      const formattedPhone = formatPhoneNumber(value);
      setFormData((prev) => ({
        ...prev,
        [name]: formattedPhone,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form gönderim işlemi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Telefon numarası validasyonu
    if (!validatePhoneNumber(formData.phone)) {
      setModal({
        show: true,
        type: "error",
        title: t(`${NS}:errors.title`),
        text: t(`${NS}:errors.invalidPhoneNumber`),
      });
      setIsSubmitting(false);
      return;
    }

    // Web3Forms için form verilerini hazırla
    const formDataToSend = new FormData();

    // Web3Forms access key - Bu anahtarı web3forms.com'dan almanız gerekiyor
    formDataToSend.append("access_key", accessKey); // Bu anahtarı değiştirin
    formDataToSend.append("subject", "Yeni İade Formu - batik.com.tr");

    // Form verilerini ekle
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    // Honeypot spam koruması
    formDataToSend.append("botcheck", "");

    try {
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
          text: t(`${NS}:success.messageSentSuccessfully`),
        });
        setFormData({
          mainTopic: "",
          subTopic: "",
          subSubTopic: "",
          orderNumber: "",
          invoiceNumber: "",
          productCode: "",
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: "",
        });
        // setFiles([]); // Web3Forms Pro gerekli
      } else {
        const errorMessage = result.message || "Bir hata oluştu";
        throw { message: errorMessage };
      }
    } catch (error) {
      console.error(t(`${NS}:errors.sendingError`), error);

      if (error && typeof error === "object" && "message" in error) {
        setModal({
          show: true,
          type: "error",
          title: t(`${NS}:errors.title`),
          text: `${t(`${NS}:errors.error`)} ${(error as any).message}`,
        });
      } else {
        setModal({
          show: true,
          type: "error",
          title: t(`${NS}:errors.title`),
          text: t(`${NS}:errors.errorOccurredMessage`),
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Ana konu değiştiğinde alt konuları güncelle
  React.useEffect(() => {
    if (formData.mainTopic && refundForm) {
      const selectedTopic = refundForm.find(
        (topic) => topic.name === formData.mainTopic
      );
      if (selectedTopic && selectedTopic.messageType) {
        setSubTopics(selectedTopic.messageType);
      } else {
        setSubTopics([]);
      }
      setFormData((prev) => ({ ...prev, subTopic: "", subSubTopic: "" }));
    }
  }, [formData.mainTopic, refundForm]);

  // Alt konu değiştiğinde alt alt konuları güncelle
  React.useEffect(() => {
    if (formData.subTopic && subTopics.length > 0) {
      const selectedSubTopic = subTopics.find(
        (topic) => topic.messageName === formData.subTopic
      );
      if (selectedSubTopic && selectedSubTopic.subTopic) {
        setSubSubTopics(selectedSubTopic.subTopic);
      } else {
        setSubSubTopics([]);
      }
      setFormData((prev) => ({ ...prev, subSubTopic: "" }));
    }
  }, [formData.subTopic, subTopics]);

  const { t } = useTranslation();
  const NS = "easy-refund";

  return (
    <div className={styles.form_section}>
      <div className={styles.form_container}>
        <h2 className={styles.form_title}>
          {t(`${NS}:fastReturns`).toLocaleUpperCase("tr-TR")}
        </h2>
        <p className={styles.form_disclaimer}>
          {t(`${NS}:formText`)}{" "}
          <Link href="/pages/aydinlatma-metni" passHref>
            <a className={styles.privacy_link}>{t(`${NS}:fromHere`)}</a>
          </Link>{" "}
          {t(`${NS}:toReach`)}
        </p>

        <form onSubmit={handleSubmit} className={styles.contact_form}>
          {/* Honeypot field for spam protection - keep this hidden */}
          <input
            type="checkbox"
            name="botcheck"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Topic Selection */}
          <div className={styles.form_row}>
            <div className={styles.form_group}>
              <label htmlFor="mainTopic">{t(`${NS}:subject`)}</label>
              <select
                id="mainTopic"
                name="mainTopic"
                value={formData.mainTopic}
                onChange={handleChange}
                required
                disabled={!refundForm || refundForm.length === 0}
              >
                <option value="">{t(`${NS}:select`)}</option>
                {refundForm?.map((topic: any, index) => (
                  <option key={index} value={topic.name}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.form_group}>
              <label htmlFor="subTopic">{t(`${NS}:subSubject`)}</label>
              <select
                id="subTopic"
                name="subTopic"
                value={formData.subTopic}
                onChange={handleChange}
                disabled={subTopics.length === 0}
              >
                <option value="">{t(`${NS}:select`)}</option>
                {subTopics.map((topic, index) => (
                  <option key={index} value={topic.messageName}>
                    {topic.messageName}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.form_group}>
              <label htmlFor="subSubTopic">{t(`${NS}:subSubSubject`)}</label>
              <select
                id="subSubTopic"
                name="subSubTopic"
                value={formData.subSubTopic}
                onChange={handleChange}
                disabled={subSubTopics.length === 0}
              >
                <option value="">{t(`${NS}:select`)}</option>
                {subSubTopics.map((topic, index) => (
                  <option
                    key={index}
                    value={topic.topicName || topic.messageName}
                  >
                    {topic.topicName || topic.messageName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Order/Invoice/Product Info */}
          <div className={styles.form_row}>
            <div className={styles.form_group}>
              <label htmlFor="orderNumber">{t(`${NS}:orderNumber`)}</label>
              <input
                type="text"
                id="orderNumber"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="invoiceNumber">{t(`${NS}:invoiceNumber`)}</label>
              <input
                type="text"
                id="invoiceNumber"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="productCode">{t(`${NS}:productCode`)}</label>
              <input
                type="text"
                id="productCode"
                name="productCode"
                value={formData.productCode}
                onChange={handleChange}
                required
              />
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

          <button
            type="submit"
            className={styles.submit_button}
            disabled={isSubmitting}
          >
            {isSubmitting ? t(`${NS}:errors.sending`) : t(`${NS}:submit`)}
          </button>
        </form>
      </div>

      {/* Modal for messages */}
      <Modal
        visible={modal.show}
        title=""
        onClose={() => setModal({ ...modal, show: false })}
      >
        <div className={styles.modal_content}>
          {/* Logo */}
          <img
            src="/image/logo/batik-logo.webp"
            alt="Batik Logo"
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

export default RefundForm;
