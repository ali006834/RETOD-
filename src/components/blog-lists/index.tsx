import { Link, useTranslation } from "@ikas/storefront";
import { BlogListsProps } from "../__generated__/types";
import Button from "../components/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import NextIcon from "../svg/next";
import PrevIcon from "../svg/prev";
import styles from "./style.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const BlogList: React.FC<BlogListsProps> = (props: BlogListsProps) => {
  const { t } = useTranslation();

  console.log("dwadwadwad", props.blogs);

  const renderBlogItem = (item: any) => (
    <div className={styles.blogItem} key={item.id}>
      {item?.image && <img className={styles.blogImg} src={item?.image.src} />}
      <div className={styles.contentArea}>
        <div className={styles.textContent}>
          <Link href={item.href}>
            <span className={styles.title}>{item.title}</span>
          </Link>
          <p className={styles.shortDescription}>{item.shortDescription}</p>
        </div>
        <div className={styles.readMoreBtn}>
          <Link href={item.href}>
            <button>{t(`blog-lists:blog.readMore`)}</button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {props?.blogs?.count && props?.blogs?.count <= 6 ? (
        // 6 veya daha az blog varsa grid kullan
        <div className={styles.grid}>
          {props?.blogs?.data.map((item) => (
            <Link href={item.href} key={item.id}>
              {renderBlogItem(item)}
            </Link>
          ))}
        </div>
      ) : (
        // 6'dan fazla blog varsa swiper kullan
        <div className={styles.swiperWrapper}>
          <Swiper
            modules={[Navigation, Scrollbar]}
            spaceBetween={5}
            slidesPerView={5.5}
            navigation={{
              nextEl: `.${styles.swiperButtonNext}`,
              prevEl: `.${styles.swiperButtonPrev}`,
            }}
            scrollbar={{
              hide: false,
              draggable: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1.5,
                spaceBetween: 5,
              },
              768: {
                slidesPerView: 1.5,
                spaceBetween: 5,
              },
              1024: {
                slidesPerView: 4.5,
                spaceBetween: 5,
              },
              1280: {
                slidesPerView: 5.5,
                spaceBetween: 5,
              },
            }}
          >
            {props?.blogs?.data.map((item) => (
              <SwiperSlide key={item.id}>
                <Link href={item.href}>{renderBlogItem(item)}</Link>
              </SwiperSlide>
            ))}
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
