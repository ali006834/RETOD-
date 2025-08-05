import React from "react";
import styles from "./../style.module.css";
import { IkasNavigationLink, Link } from "@ikas/storefront";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { useScreen } from "src/utils/hooks/useScreen";

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
      <div className={styles.footer_link_swiper}>
        <Swiper
          spaceBetween={10}
          slidesPerView="auto"
          freeMode={true}
          modules={[FreeMode]}
          className="mySwiper"
        >
          {footer_links?.map((item, index) => {
            return (
              <SwiperSlide key={index} className={styles.footer_link_slide}>
                <Link href={item.href}>
                  <a>{item.label}</a>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  }

  return (
    <div className={styles.footer_link}>
      {footer_links?.map((item, index) => {
        return (
          <div key={index}>
            <Link href={item.href}>
              <a>{item.label}</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default NavigationFooterLinks;
