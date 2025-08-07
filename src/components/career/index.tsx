import React from "react";
import { CareerProps } from "../__generated__/types";
import styles from "./style.module.css";
import NavigationFooterLinks from "./navigation-footer-links";
import { Image, Link, useTranslation } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";
import { toJS } from "mobx";
import DotIcon from "./svg/dot";
import CareerForm from "./form";

const Career: React.FC<CareerProps> = (props) => {
  const {
    web3FormsAccessKey,

    title,
    textPicture,
    imageWeb,
    imageMobile,

    footer_links,

    formTitle,
    careerForm,

    otherInformation,
  } = props;

  const { t } = useTranslation();
  const { isMobile } = useScreen();

  console.log("careerForm:::::::::", careerForm);

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
        <div className={styles.about_content}>
          <div className={styles.content_container}>
            <div className={styles.main_content}>
              <div
                className={styles.about_text}
                dangerouslySetInnerHTML={{ __html: formTitle || "" }}
              />
            </div>
          </div>
          {/* Kariyer Formu */}
          <CareerForm
            departments={
              (Array.isArray(careerForm)
                ? careerForm
                    ?.filter(
                      (item) => typeof item?.name === "string" && item.name
                    )
                    .map((item) => ({
                      name: item.name!,
                      departments: Array.isArray(item.departments)
                        ? item.departments.map((dept) => ({
                            positionName: dept.positionName,
                          }))
                        : [],
                    }))
                : []) as {
                name: string;
                departments: { positionName: string }[];
              }[]
            }
            otherInformation={otherInformation}
            // erişim anahtarları
            accessKey={web3FormsAccessKey || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default Career;
