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
  const {
    legalLinks,
    supportLinks,
    logoDeltix,
    shoppingPolicies,
    socialMediaList,
  } = props;

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
            {logoDeltix && (
              <Image
                image={logoDeltix}
                alt={logoDeltix.altText || "Logo"}
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
                  dangerouslySetInnerHTML={{ __html: item.iconSP || "" }}
                />
                <span>{item.contentSP}</span>
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
                  {item.isExternal_SM ? (
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
