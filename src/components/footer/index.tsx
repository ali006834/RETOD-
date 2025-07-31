import { observer } from "mobx-react-lite";
import { FooterProps } from "../__generated__/types";
import styles from "./style.module.css";
import { Image, Link } from "@ikas/storefront";

import EmailSubscription from "./email-subscription";
import { LanguageSelect } from "../language";
import { useTranslation } from "@ikas/storefront";

import Facebook from "../svg/facebook";
import Instagram from "../svg/instagram";
import PinterestIcon from "../svg/pinterest";
import WhatsappIcon from "../svg/whatsapp";
import YoutubeIcon from "../svg/youtube";
import { toJS } from "mobx";

export const NS = "footer";

const Footer: React.FC<FooterProps> = (props) => {
  const { legalLinks, supportLinks, logo, shoppingPolicies, socialMediaList } =
    props;

  const { t } = useTranslation();

  const shoppingPoliciesArr = toJS(shoppingPolicies);
  const socialMediaListArr = toJS(socialMediaList);

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
          {/* Shopping Policies - 3 columns */}
          <div className={styles.shoppingPolicies}>
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

          {/* Customer Services - 3 columns */}
          <div className={styles.page_links}>
            {/* <span className={styles.headingsInFooter}>
              {t(`${NS}:services`).toLocaleUpperCase("tr-TR")}
            </span> */}
            {legalLinks?.map((item, index) => (
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
          {/* Sol taraf - MR PORTER */}
          <div className={styles.middleLeft}>
            <h2 className={styles.middleTitle}>MR PORTER</h2>
            <p className={styles.middleText}>
              Shop from over 500 of the world's finest luxury designer brands &
              be dressed for any occasion
            </p>
            <button className={styles.middleButton}>Visit MRPORTER.COM</button>
          </div>

          {/* Sağ taraf - NET-A-PORTER APP */}
          <div className={styles.middleRight}>
            <h2 className={styles.appTitle}>GET THE NET-A-PORTER APP</h2>

            <div className={styles.qrSection}>
              <div className={styles.qrImageArea}>
                {logo && (
                  <Image
                    image={logo}
                    alt="QR Code"
                    layout="fill"
                    objectFit="contain"
                  />
                )}
              </div>
              <p className={styles.qrText}>
                Scan the QR code with your iOS or Android smartphone to download
                the app
              </p>
            </div>

            <div className={styles.acceptsSection}>
              <h3 className={styles.acceptsTitle}>Net-A-Porter accepts</h3>
              {/* Bu kısım daha sonra doldurulacak */}
            </div>
          </div>
        </div>
      </div>

      {/* Lower Footer */}
      <div className={styles.lowerFooter}>
        <div className={styles.payment}>
          <span>{t(`${NS}:copyrightText`)}</span>
          {/* Support Linkler  */}
          <div className={styles.page_links_lf}>
            {supportLinks?.map((item, index) => (
              <div key={index}>
                <Link href={item.href}>
                  <a>{item.label}</a>
                </Link>
              </div>
            ))}
          </div>
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
