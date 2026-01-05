import React from "react";
import styles from "./style.module.css";
import { IkasNavigationLink, Link } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import SwiperCore from "swiper";
import { Scrollbar } from "swiper/modules";

SwiperCore.use([Scrollbar]);

const NavigationFooterLinks = ({
  footer_links,
}: {
  footer_links: IkasNavigationLink[] | undefined;
}) => {
  const { isMobile } = useScreen();

  if (!footer_links) {
    return null;
  }

  if (isMobile) {
    return (
      <div className={styles.mobile_footer_links}>
        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          scrollbar={{ draggable: true }}
          breakpoints={{
            0: { slidesPerView: 1.5 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
          }}
        >
          {footer_links.map((item, index) => (
            <SwiperSlide key={index}>
              <Link href={item.href}>
                <a className={styles.mobile_link_item}>{item.label}</a>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  return (
    <div className={styles.footer_link}>
      {footer_links.map((item, index) => (
        <Link key={index} href={item.href}>
          <a className={styles.nav_link}>
            <span className={styles.link_text}>{item.label}</span>
            <span className={styles.link_underline}></span>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default NavigationFooterLinks;
