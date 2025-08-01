import { observer } from "mobx-react-lite";
import { FooterProps } from "../__generated__/types";
import styles from "./style.module.css";
import { Image, Link } from "@ikas/storefront";

import EmailSubscription from "./email-subscription";
import { LanguageSelect } from "../language";
import { useTranslation } from "@ikas/storefront";

import { toJS } from "mobx";

export const NS = "footer";

const Footer: React.FC<FooterProps> = (props) => {
  const {
    legalLinks,
    supportLinks,
    logo,
    shoppingPolicies,
    socialMediaList,
    footerLower,
  } = props;

  const { t } = useTranslation();

  const shoppingPoliciesArr = toJS(shoppingPolicies);
  const socialMediaListArr = toJS(socialMediaList);
  const acceptedCardsArr = toJS(footerLower?.acceptedCardsImages);

  return (
    <div className={styles.footerContainer}>
      {/* Upper Footer */}
      <div className={styles.upperFooter}>
        <div className={styles.logoTriangleContainer}>
          <div className={styles.triangle}></div>
          <div className={styles.logoContainer}>
            {logo && (
              <Image
                image={logo}
                alt={logo.altText || "Logo"}
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
        </div>

        <div className={styles.upperFooterContent}>
          {/* Legal Links - 3 columns */}
          <div className={styles.page_links}>
            {legalLinks?.map((item, index) => (
              <div key={index}>
                <Link href={item.href}>
                  <a>{item.label}</a>
                </Link>
              </div>
            ))}
          </div>

          {/* Support Links - 3 columns */}
          <div className={styles.page_links}>
            {supportLinks?.map((item, index) => (
              <div key={index}>
                <Link href={item.href}>
                  <a>{item.label}</a>
                </Link>
              </div>
            ))}
          </div>

          {/* Email Subscription - 4 columns */}
          <div className={styles.emailSection}>
            <EmailSubscriptionAndLanguageSelect />
          </div>

          {/* Social Media - 2 columns */}
          <div className={styles.socialMediaSection}>
            <span className={styles.socialMediaTitle}>
              {t(`${NS}:follow_us`)}
            </span>
            <div className={styles.socialLinks}>
              {socialMediaListArr?.map((item, index) => (
                <Link key={index} href={item?.link_SM?.href || "/"}>
                  {item?.isExternal_SM ? (
                    <a target="_blank" className={styles.socialLink}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item?.icon_SM || "",
                        }}
                      />
                    </a>
                  ) : (
                    <a className={styles.socialLink}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item?.icon_SM || "",
                        }}
                      />
                    </a>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Footer */}
      <div className={styles.middleFooter}>
        <div className={styles.middleContent}>
          {/* Shopping Policies - 3 columns */}
          <div className={styles.shoppingPoliciesMiddle}>
            {shoppingPoliciesArr?.map((item, index) => (
              <div key={index} className={styles.policyItem}>
                <div
                  className={styles.policyIcon}
                  dangerouslySetInnerHTML={{ __html: item?.iconSP || "" }}
                />
                <span>{item?.contentSP}</span>
              </div>
            ))}
          </div>

          {/* Sol taraf - MR PORTER - 4 columns */}
          <div className={styles.middleLeft}>
            <h2 className={styles.middleTitle}>{footerLower?.title}</h2>
            <p className={styles.middleText}>{footerLower?.content}</p>
            <Link href={footerLower?.btnLink?.href || "#"}>
              <button className={styles.middleButton}>
                {footerLower?.btnText}
              </button>
            </Link>
          </div>

          {/* Sağ taraf - NET-A-PORTER APP - 5 columns */}
          <div className={styles.middleRight}>
            <h2 className={styles.appTitle}>{footerLower?.qrTitle}</h2>

            {/* QR alanı  */}
            <div className={styles.qrSection}>
              <div className={styles.qrImageArea}>
                {footerLower?.qrImage && (
                  <Image
                    image={footerLower.qrImage}
                    alt="QR Code"
                    layout="fill"
                    objectFit="contain"
                  />
                )}
              </div>
              <p className={styles.qrText}>{footerLower?.qrContent}</p>
            </div>

            {/* Kredi kartları alanı */}
            <div className={styles.acceptsSection}>
              <h3 className={styles.acceptsTitle}>
                {footerLower?.acceptedCardsTitle}
              </h3>
              <div className={styles.acceptedCards}>
                {Array.isArray(acceptedCardsArr) &&
                  acceptedCardsArr.map((item: any, index: number) => (
                    <div
                      key={index}
                      className={styles.cardIcon}
                      dangerouslySetInnerHTML={{
                        __html: item?.acceptedCardsImage || "",
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Footer */}
      <div className={styles.lowerFooter}>
        <div className={styles.payment}>
          <span>{t(`${NS}:copyrightText`)}</span>
        </div>
      </div>
    </div>
  );
};

const EmailSubscriptionAndLanguageSelect = observer(() => {
  return (
    <div className={styles.emailSubscriptionAndLanguage}>
      <EmailSubscription />
    </div>
  );
});

export default observer(Footer);
