import React from "react";
import { BannerThinProps } from "../__generated__/types";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";
import { Link, Image } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";

const BannerThin = (props: BannerThinProps) => {
  const { banner_center, banner_cente_mobile, banner_center_link } = props;

  const { isMobile } = useScreen();

  if (!banner_center || (isMobile && !banner_cente_mobile)) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.bannerWrapper}>
          {!isMobile && (
            <div className={styles.bannerLink}>
              <Link href={banner_center_link?.href || ""}>
                {/* Web */}
                <div className={styles.desktopImage}>
                  <Image
                    width={2880}
                    height={330}
                    alt={banner_center?.altText || ""}
                    image={banner_center}
                    useBlur={true}
                    className={`${styles.bannerImage}`}
                  />
                </div>
              </Link>
            </div>
          )}

          {/* Mobil */}
          {isMobile && banner_cente_mobile && (
            <div className={styles.bannerLink}>
              <Link href={banner_center_link?.href || ""}>
                <div className={styles.mobileImage}>
                  {banner_cente_mobile && (
                    <Image
                      width={750}
                      height={329}
                      alt={
                        banner_cente_mobile?.altText ||
                        banner_cente_mobile?.altText ||
                        ""
                      }
                      image={banner_cente_mobile}
                      useBlur={true}
                      className={`${styles.bannerImage} `}
                    />
                  )}
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(BannerThin);
