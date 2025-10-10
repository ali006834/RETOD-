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

  const isSlider = props.isSlider; // Bu değeri daha sonra İKAS'tan dinamik olarak alacağız

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
      {!isSlider ? (
        // isSlider false ise grid kullan (Web: 4, Tablet: 3, Mobil: 2)
        <div className={styles.grid}>
          {props?.blogs?.data.map((item) => {
            return (
              <div key={item.id} style={{ cursor: "pointer" }}>
                <Link href={item.href}>{renderBlogItem(item)}</Link>
              </div>
            );
          })}
        </div>
      ) : (
        // isSlider true ise swiper slider kullan
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
              return (
                <SwiperSlide key={item.id}>
                  <div style={{ cursor: "pointer" }}>
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
