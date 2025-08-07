import React, { useRef } from "react";
import styles from "./style.module.css";
import { Link, useTranslation } from "@ikas/storefront";
import Modal from "src/components/components/modal";
import Success from "./svg/success";
import Error from "./svg/error";

interface ContactFormProps {
  contactForm: Array<{
    name: string;
    messageType: Array<{
      messageName: string;
      subTopic?: Array<{
        messageName: string;
        subTopic?: any;
      }>;
    }>;
  }>;
  contactInformation?: string;
  mapLink?: string;
  accessKey: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  contactForm,
  contactInformation,
  mapLink,
  accessKey,
}) => {
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

  // Form verilerini güncelleme fonksiyonu
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form gönderim işlemi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Web3Forms için form verilerini hazırla
    const formDataToSend = new FormData();

    // Web3Forms access key - Bu anahtarı web3forms.com'dan almanız gerekiyor
    formDataToSend.append("access_key", accessKey); // Bu anahtarı değiştirin

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
        // Formu sıfırla
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
    if (formData.mainTopic && contactForm) {
      const selectedTopic = contactForm.find(
        (topic) => topic.name === formData.mainTopic
      );
      if (selectedTopic && selectedTopic.messageType) {
        setSubTopics(selectedTopic.messageType);
      } else {
        setSubTopics([]);
      }
      setFormData((prev) => ({ ...prev, subTopic: "", subSubTopic: "" }));
    }
  }, [formData.mainTopic, contactForm]);

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
  const NS = "contact";

  return (
    <div className={styles.form_section}>
      <div className={styles.form_container}>
        <h2 className={styles.form_title}>
          {t(`${NS}:communication`).toLocaleUpperCase("tr-TR")}
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
                disabled={!contactForm || contactForm.length === 0}
              >
                <option value="">{t(`${NS}:select`)}</option>
                {contactForm?.map((topic, index) => (
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
                  <option key={index} value={topic.messageName}>
                    {topic.messageName}
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
            {isSubmitting ? "Gönderiliyor..." : t(`${NS}:submit`)}
          </button>
        </form>
      </div>

      {/* Contact Information */}
      {contactInformation && (
        <div
          className={styles.contact_info}
          dangerouslySetInnerHTML={{ __html: contactInformation }}
        />
      )}

      {/* Map */}
      {mapLink && (
        <div
          className={styles.map_container}
          dangerouslySetInnerHTML={{ __html: mapLink }}
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

export default ContactForm;
