import React, { useEffect, useState } from "react";
import { StoresProps } from "../__generated__/types";
import styles from "./style.module.css";
import NavigationFooterLinks from "./navigation-footer-links";
import { Image, Link, useTranslation } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";
import { toJS } from "mobx";
import DotIcon from "./svg/dot";

import PhoneIcon from "./svg/phone";
import LocationIcon from "./svg/location";
import MessageIcon from "./svg/message";

// Bu kısımda interface tanımlamaları yapıyoruz.
interface WorkingHours {
  checkInTime: string;
  checkOutTime: string;
  dayName: string;
}

interface DistrictStore {
  name: string;
  address: string;
  phone?: string;
  email?: string;
  link?: string;
  isAvm?: boolean;
  workingHours?: WorkingHours[];
}

interface Store {
  districtName: string;
  districtStores: DistrictStore[];
}

interface Province {
  provinceName: string;
  stores: Store[];
}
const Stores: React.FC<StoresProps> = (props) => {
  const { imageWeb, imageMobile, title, textPicture, footer_links, storeList } =
    props;

  const { t } = useTranslation();
  const { isMobile } = useScreen();

  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [filteredStores, setFilteredStores] = useState<DistrictStore[]>([]);
  const [showWorkingHours, setShowWorkingHours] = useState<boolean>(false);
  const [currentStoreHours, setCurrentStoreHours] = useState<WorkingHours[]>(
    []
  );
  const [selectedStore, setSelectedStore] = useState<DistrictStore | null>(
    null
  );
  const [provinces, setProvinces] = useState<Province[]>([]);

  // bu hook ile storeList'i alıyoruz ve provinces'e atıyoruz.
  useEffect(() => {
    if (storeList) {
      const storeListArr = toJS(storeList) as any as Province[];

      // iLLER Türkçeye sıralama yap.. (A-Z)
      const sortedProvinces = [...storeListArr].sort((a, b) =>
        a?.provinceName?.localeCompare(b?.provinceName, "tr", {
          sensitivity: "base",
        })
      );

      setProvinces(sortedProvinces);

      if (sortedProvinces.length > 0) {
        const firstProvince = sortedProvinces[0]?.provinceName;
        setSelectedProvince(firstProvince);

        // İlk il'in ilk ilçesini seç
        const firstProvinceData = sortedProvinces.find(
          (p) => p?.provinceName === firstProvince
        );
        if (firstProvinceData && firstProvinceData?.stores?.length > 0) {
          // İlçeleri de sırala
          const sortedStores = [...firstProvinceData?.stores].sort((a, b) =>
            a?.districtName?.localeCompare(b?.districtName, "tr", {
              sensitivity: "base",
            })
          );

          const firstDistrict = sortedStores[0]?.districtName;
          setSelectedDistrict(firstDistrict);
          setFilteredStores(sortedStores[0]?.districtStores);
        }
      }
    }
  }, [storeList]);

  // Seçili il için ilçeleri getir
  const getDistricts = () => {
    if (!selectedProvince) return [];
    const province = provinces.find(
      (p) => p?.provinceName === selectedProvince
    );
    if (!province || !province.stores) return []; // stores null/undefined kontrolü

    // İlçeleri Türkçe sırala (A-Z)
    return [...(province?.stores || [])] // null/undefined fallback
      .sort((a, b) =>
        a?.districtName?.localeCompare(b?.districtName, "tr", {
          sensitivity: "base",
        })
      )
      .map((store) => store?.districtName);
  };
  // İl değişikliğini yöneten fonskiyon
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceName = e.target.value;
    setSelectedProvince(provinceName);
    setSelectedDistrict("");
    setFilteredStores([]);

    // burada karşılaştırma yapıyoruz.
    const selectedProvinceData = provinces.find(
      (p) => p.provinceName === provinceName
    );
    if (selectedProvinceData && selectedProvinceData?.stores?.length > 0) {
      const firstDistrict = selectedProvinceData?.stores[0]?.districtName;
      setSelectedDistrict(firstDistrict);
      setFilteredStores(selectedProvinceData?.stores[0]?.districtStores);
    }
  };

  // İlçe değişikliklerini yöneten fonksiyon
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);

    if (selectedProvince && districtName) {
      const province = provinces.find(
        (p) => p.provinceName === selectedProvince
      );
      if (province) {
        const districtStore = province.stores.find(
          (s) => s.districtName === districtName
        );
        setFilteredStores(districtStore ? districtStore.districtStores : []);
      }
    }
  };

  // Bileşenin geri kalanı aynı kalır...
  const handleDirectionsClick = (link: string) => {
    window.open(link, "_blank");
  };

  const handleWorkingHoursClick = (
    hours: WorkingHours[],
    store: DistrictStore
  ) => {
    setCurrentStoreHours(hours);
    setShowWorkingHours(true);
    setSelectedStore(store);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.heroViewport}>
        <div className={styles.heroImage}>
          {(isMobile ? imageMobile : imageWeb) && (
            <Image
              layout="responsive"
              width={isMobile ? "800px" : "3000px"}
              height={isMobile ? "495px" : "797px"}
              objectFit="contain"
              useBlur={true}
              image={isMobile ? imageMobile! : imageWeb!}
              alt={
                isMobile
                  ? imageMobile?.altText || undefined
                  : imageWeb?.altText || undefined
              }
            />
          )}
        </div>
        <div className={styles.heroContent}>
          {title && <h1 className={styles.title}>{title}</h1>}
          {textPicture && <p className={styles.textPicture}>{textPicture}</p>}
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.FooterLinks}>
          <NavigationFooterLinks footer_links={footer_links} />
          <div className={styles.navDivider}></div>
        </div>

        {/* Content Section */}
        {/* Content */}
        <div className={styles.about_content}>
          <div className={styles.content_container}>
            <div className={styles.main_content}>
              {/* Store Selection */}
              <div className={styles.store_selection}>
                <h2 className={styles.section_title}>
                  {t("stores:findStore")}
                </h2>
                <p className={styles.section_subtitle}>
                  {t("stores:selectRegion")}
                </p>

                <div className={styles.select_container}>
                  <div className={styles.select_wrapper}>
                    <select
                      className={styles.custom_select}
                      value={selectedProvince}
                      onChange={handleProvinceChange}
                    >
                      {provinces?.map((province, index) => (
                        <option key={index} value={province?.provinceName}>
                          {province?.provinceName}
                        </option>
                      ))}
                    </select>
                    <span className={styles.select_arrow}></span>
                  </div>

                  {selectedProvince && (
                    <div className={styles.select_wrapper}>
                      <select
                        className={styles.custom_select}
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                      >
                        {getDistricts().map((district, index) => (
                          <option key={index} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                      <span className={styles.select_arrow}></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Store List */}
              {filteredStores?.length > 0 && (
                <div className={styles.store_list}>
                  <h3 className={styles.store_list_title}>
                    {selectedDistrict} - {t("stores:ourStores")}
                    <span className={styles.store_count}>
                      {filteredStores.length} {t("stores:store")}
                    </span>
                  </h3>

                  <div className={styles.store_grid}>
                    {filteredStores.map((store, index) => (
                      <div key={index} className={styles.store_card}>
                        <div className={styles.store_content}>
                          <h4 className={styles.store_name}>{store?.name}</h4>
                          <div className={styles.store_info}>
                            <div className={styles.info_item}>
                              <span className={styles.info_icon}>
                                <LocationIcon />
                              </span>
                              <p>{store?.address}</p>
                            </div>
                            {store?.phone && (
                              <div className={styles.info_item}>
                                <span className={styles.info_icon}>
                                  <PhoneIcon />
                                </span>
                                <a href={`tel:${store?.phone}`}>
                                  {store?.phone}
                                </a>
                              </div>
                            )}
                            {store?.email && (
                              <div className={styles.info_item}>
                                <span className={styles.info_icon}>
                                  <MessageIcon />
                                </span>
                                <a href={`mailto:${store?.email}`}>
                                  {store?.email}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={styles.store_buttons}>
                          {store?.link && (
                            <button
                              className={styles.directions_button}
                              onClick={() =>
                                handleDirectionsClick(store?.link!)
                              }
                            >
                              {t("stores:getDirections")}
                            </button>
                          )}
                          <button
                            className={styles.hours_button}
                            onClick={() =>
                              handleWorkingHoursClick(
                                store.workingHours || [],
                                store
                              )
                            }
                          >
                            {t("stores:workingHours")}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Working Hours Modal */}
        {showWorkingHours && (
          <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
              <button
                className={styles.modal_close}
                onClick={() => {
                  setShowWorkingHours(false);
                  setSelectedStore(null);
                }}
              >
                &times;
              </button>
              <h3>{t("stores:workingHours")}</h3>
              {/* Standart AVM saatleri */}
              {selectedStore?.isAvm === true ? (
                <div className={styles.hours_list}>
                  <div className={styles.hour_item}>
                    <span className={styles.day}>{t("stores:weekDays")}</span>
                    <span className={styles.time}>10:00 - 22:00</span>
                  </div>
                  <div className={styles.hour_item}>
                    <span className={styles.day}>{t("stores:weekEnds")}</span>
                    <span className={styles.time}>10:00 - 22:00</span>
                  </div>
                </div>
              ) : (
                /* Özel AVM saatleri */
                <div className={styles.hours_list}>
                  {currentStoreHours.map((hour, index) => (
                    <div key={index} className={styles.hour_item}>
                      <span className={styles.day}>{hour?.dayName}:</span>
                      <span className={styles.time}>
                        {hour?.checkInTime} - {hour?.checkOutTime}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stores;
