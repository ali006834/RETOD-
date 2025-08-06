import React, { useRef } from "react";
import styles from "./style.module.css";
import { Link, useTranslation } from "@ikas/storefront";
import emailjs from "@emailjs/browser";

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
}

const ContactFormEmailJS: React.FC<ContactFormProps> = ({
  contactForm,
  contactInformation,
  mapLink,
}) => {
  const form = useRef<HTMLFormElement>(null);
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

  // Dosya yükleme için state ve referans
  const [files, setFiles] = React.useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Loading state
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Dosya yükleme işlemi
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).slice(0, 4 - files.length);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  // Dosya silme işlemi
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

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

  // EmailJS ile form gönderim işlemi
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!form.current) return;

    // EmailJS konfigürasyonu - bu değerleri değiştirin
    const serviceId = "YOUR_SERVICE_ID"; // EmailJS service ID
    const templateId = "YOUR_TEMPLATE_ID"; // EmailJS template ID
    const publicKey = "YOUR_PUBLIC_KEY"; // EmailJS public key

    // Template parametreleri
    const templateParams = {
      mainTopic: formData.mainTopic,
      subTopic: formData.subTopic,
      subSubTopic: formData.subSubTopic,
      orderNumber: formData.orderNumber,
      invoiceNumber: formData.invoiceNumber,
      productCode: formData.productCode,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      files: files.map((file) => file.name).join(", "), // Dosya isimleri
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(
        () => {
          alert("Mesajınız başarıyla gönderildi!");
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
          setFiles([]);
        },
        (error) => {
          console.error("EmailJS Error:", error);
          alert("Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
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

        <form
          ref={form}
          onSubmit={handleSubmit}
          className={styles.contact_form}
        >
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

          {/* File Upload */}
          <div className={styles.form_group}>
            <label>
              {t(`${NS}:photos`)} - {t(`${NS}:maxPhotoLimit`)}
            </label>
            <div className={styles.file_upload_container}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                accept="image/*"
                style={{ display: "none" }}
              />
              <button
                type="button"
                className={styles.upload_button}
                onClick={() => fileInputRef.current?.click()}
                disabled={files.length >= 4}
              >
                {t(`${NS}:uploadPhotos`)}
              </button>
              <div className={styles.file_preview_container}>
                {files.map((file, index) => (
                  <div key={index} className={styles.file_preview}>
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className={styles.remove_file}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
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
    </div>
  );
};

export default ContactFormEmailJS;
