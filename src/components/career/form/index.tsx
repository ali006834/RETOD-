import React, { useRef } from "react";
import styles from "./style.module.css";
import { Link, useTranslation } from "@ikas/storefront";

interface CareerFormProps {
  departments: Array<{
    name: string;
    positions: Array<{
      name: string;
    }>;
  }>;
  otherInformation?: string;
}

const CareerForm: React.FC<CareerFormProps> = ({
  departments,
  otherInformation,
}) => {
  const [formData, setFormData] = React.useState({
    department: "",
    position: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [positions, setPositions] = React.useState<Array<{ name: string }>>([]);

  // CV yükleme için state ve referans
  const [cv, setCv] = React.useState<File | null>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);

  // Loading state
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // CV yükleme işlemi
  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCv(e.target.files[0]);
    }
  };

  // CV silme işlemi
  const removeCv = () => {
    setCv(null);
    if (cvInputRef.current) {
      cvInputRef.current.value = "";
    }
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

  // Form gönderim işlemi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form verilerini kontrol et
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    if (cv) {
      formDataToSend.append("cv", cv);
    }

    try {
      const response = await fetch("/api/career", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Mesajınız başarıyla gönderildi!");
        // Formu sıfırla
        setFormData({
          department: "",
          position: "",
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: "",
        });
        setCv(null);
      } else {
        throw new Error(result.message || "Bir hata oluştu");
      }
    } catch (error) {
      console.error("Gönderim hatası:", error);

      // API'den gelen hata mesajını göster
      if (error instanceof Error) {
        try {
          const errorData = JSON.parse(error.message);
          alert(
            `Hata: ${errorData.message}\n\nDetay: ${
              errorData.error || "Bilinmeyen hata"
            }`
          );
        } catch {
          alert(`Hata: ${error.message}`);
        }
      } else {
        alert("Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
      }
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
      if (selectedDepartment && selectedDepartment.positions) {
        setPositions(selectedDepartment.positions);
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
                  <option key={index} value={position.name}>
                    {position.name}
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

          {/* CV Upload */}
          <div className={styles.form_group}>
            <label>CV</label>
            <div className={styles.file_upload_container}>
              <input
                type="file"
                ref={cvInputRef}
                onChange={handleCvChange}
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
              />
              <button
                type="button"
                className={styles.upload_button}
                onClick={() => cvInputRef.current?.click()}
                disabled={!!cv}
              >
                {cv ? "CV Yüklendi" : "CV Yükle"}
              </button>
              {cv && (
                <div className={styles.file_preview_container}>
                  <div className={styles.file_preview}>
                    <span>{cv.name}</span>
                    <button
                      type="button"
                      onClick={removeCv}
                      className={styles.remove_file}
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
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
      {otherInformation && (
        <div
          className={styles.contact_info}
          dangerouslySetInnerHTML={{ __html: otherInformation }}
        />
      )}
    </div>
  );
};

export default CareerForm;
