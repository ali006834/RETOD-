import React from "react";
import { CampaignsProps } from "../__generated__/types";
import styles from "./style.module.css";
import NavigationFooterLinks from "./navigation-footer-links";
import { Image, Link, useTranslation } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";
import { toJS } from "mobx";
import DotIcon from "./svg/dot";

const Campaigns: React.FC<CampaignsProps> = (props) => {
  const {
    imageWeb,
    imageMobile,
    textPicture,

    footer_links,

    title,
    campaigns,
  } = props;

  const { t } = useTranslation();
  const { isMobile } = useScreen();
  const campaignsArr = toJS(campaigns);

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
        <div className={styles.main_content}>
          {campaignsArr &&
            campaignsArr.map((campaign: any, index: number) => (
              <React.Fragment key={index}>
                <div className={styles.campaign_card}>
                  {/* Fotoğraf  */}
                  <div className={styles.campaign_image_container}>
                    <Image
                      image={campaign.campaignImage}
                      layout="responsive"
                      width={845}
                      height={423}
                      alt={campaign.campaignTitle}
                      className={styles.campaign_image}
                    />
                  </div>

                  {/* info  */}
                  <div className={styles.campaign_info}>
                    {/* Başlık  */}
                    <h2 className={styles.campaign_title}>
                      {campaign.campaignTitle}
                    </h2>

                    {/* Açıklama  */}
                    <p
                      className={styles.campaign_description}
                      dangerouslySetInnerHTML={{
                        __html: campaign.campaignDescription,
                      }}
                    />

                    {/* Tarih  */}
                    <p className={styles.campaign_date}>
                      {campaign.isActive ? (
                        <span>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: campaign.campaignDate,
                            }}
                          />
                          <DotIcon fill="#006C35" />{" "}
                          <p className={styles.campaign_status_active}>
                            {t("common:active")}
                          </p>
                        </span>
                      ) : (
                        <span>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: campaign.campaignDate,
                            }}
                          />
                          <DotIcon fill="#FF0000" />{" "}
                          <p className={styles.campaign_status_passive}>
                            {t("common:inactive")}
                          </p>
                        </span>
                      )}
                    </p>

                    {/* Koşullar  */}
                    <p
                      className={styles.campaign_conditions}
                      dangerouslySetInnerHTML={{
                        __html: campaign.campaignConditions,
                      }}
                    />

                    {campaign.isActive ? (
                      <button className={styles.campaign_button}>
                        {campaign.btnText}
                      </button>
                    ) : (
                      <div className={styles.completed_label}>
                        {t("common:completed")}
                      </div>
                    )}
                  </div>
                </div>

                {/* {index < campaignsArr.length - 1 && (
                  <div className={styles.zigzag_separator}>
                    <svg viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path
                        d="M0,5 L20,0 L40,10 L60,0 L80,10 L100,5"
                        stroke="#444"
                        strokeWidth="1"
                        fill="none"
                      />
                    </svg>
                  </div>
                )} */}
                {index < campaignsArr.length - 1 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "20px 0 40px 0",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{ height: "1px", background: "#eee", flex: 1 }}
                    ></div>
                    <span
                      style={{
                        padding: "0 20px",
                        color: "#999",
                        fontSize: "22px",
                        letterSpacing: "3px",
                        fontWeight: "500",
                        opacity: "0.7",
                      }}
                    >
                      DİZAYNELLA
                    </span>
                    <div
                      style={{ height: "1px", background: "#eee", flex: 1 }}
                    ></div>
                  </div>
                )}
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
