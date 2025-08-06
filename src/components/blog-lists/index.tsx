import { Link, useTranslation } from "@ikas/storefront";
import { BlogListsProps } from "../__generated__/types";
import Button from "../components/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import NextIcon from "../svg/next";
import PrevIcon from "../svg/prev";
import styles from "./style.module.css";
import { toJS } from "mobx";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const BlogList: React.FC<BlogListsProps> = (props: BlogListsProps) => {
  const { t } = useTranslation();

  // Blog'a ait kategori adını al..
  const categoryArr = toJS(props.blogs?.data[0]?.category);

  // Blogların görsellerini ve başlıklarını render eden fonksiyon
  const renderBlogItem = (item: any) => (
    <div className={styles.blogItem} key={item.id}>
      {item?.image && <img className={styles.blogImg} src={item?.image.src} />}
      <div className={styles.contentArea}>
        <span className={styles.blogCategory}>{categoryArr?.name}</span>
        <div className={styles.textContent}>
          <span className={styles.title}>{item.title}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.bannerTitle}>{props?.bannerTitle}</div>
      {props?.blogs?.count && props?.blogs?.count <= 6 ? (
        // 6 veya daha az blog varsa grid kullan
        <div className={styles.grid}>
          {props?.blogs?.data.map((item) => {
            console.log("🚀 Blog render edildi - Grid:", item.href); // Debug: Blog render ediliyor mu?
            return (
              <div
                key={item.id}
                onClick={() => {
                  console.log("🚀 Blog tıklandı - Grid:", {
                    title: item.title,
                    href: item.href,
                    id: item.id,
                  });
                }}
                style={{ cursor: "pointer" }}
              >
                <Link href={item.href}>{renderBlogItem(item)}</Link>
              </div>
            );
          })}
        </div>
      ) : (
        // 6'dan fazla blog varsa swiper kullan
        <div className={styles.swiperWrapper}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={5.5}
            navigation={{
              nextEl: `.${styles.swiperButtonNext}`,
              prevEl: `.${styles.swiperButtonPrev}`,
            }}
            // scrollbar={{
            //   hide: false,
            //   draggable: false,
            // }}
            breakpoints={{
              320: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4.5,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 5.5,
                spaceBetween: 20,
              },
            }}
          >
            {props?.blogs?.data.map((item) => {
              console.log("🚀 Blog render edildi - Swiper:", item.href); // Debug: Blog render ediliyor mu?
              return (
                <SwiperSlide key={item.id}>
                  <div
                    onClick={() => {
                      console.log("🚀 Blog tıklandı - Swiper:", {
                        title: item.title,
                        href: item.href,
                        id: item.id,
                      });
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <Link href={item.href}>{renderBlogItem(item)}</Link>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {/* <div className={styles.swiperButtonPrev}>
            <PrevIcon />
          </div>
          <div className={styles.swiperButtonNext}>
            <NextIcon />
          </div> */}
        </div>
      )}
    </div>
  );
};

export default BlogList;
