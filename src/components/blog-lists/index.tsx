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

  // GEÇİCİ VERİLER - IKAS KAPALI OLDUĞU İÇİN
  const tempBlogData = [
    {
      id: 1,
      href: "/blog/gecici-blog-1",
      title: "Blog Yazısı Başlığı 1",
      shortDescription:
        "Bu geçici bir blog yazısı açıklamasıdır. CSS düzenlemeleri için kullanılmaktadır.",
      image: {
        src: "/image/image_blog.webp",
      },
    },
    {
      id: 2,
      href: "/blog/gecici-blog-2",
      title: "Blog Yazısı Başlığı 2",
      shortDescription:
        "İkinci geçici blog yazısı açıklaması. Tasarım çalışmaları için örnek içerik.",
      image: {
        src: "/image/image_blog.webp",
      },
    },
    {
      id: 3,
      href: "/blog/gecici-blog-3",
      title: "Blog Yazısı Başlığı 3",
      shortDescription:
        "Üçüncü geçici blog yazısı. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      image: {
        src: "/image/image_blog.webp",
      },
    },
    {
      id: 4,
      href: "/blog/gecici-blog-4",
      title: "Blog Yazısı Başlığı 4",
      shortDescription:
        "Dördüncü geçici blog yazısı örneği. CSS testleri için kullanılıyor.",
      image: {
        src: "/image/image_blog.webp",
      },
    },
    {
      id: 5,
      href: "/blog/gecici-blog-5",
      title: "Blog Yazısı Başlığı 5",
      shortDescription:
        "Beşinci geçici blog yazısı. Slider özelliğini test etmek için eklendi.",
      image: {
        src: "/image/image_blog.webp",
      },
    },
    {
      id: 6,
      href: "/blog/gecici-blog-6",
      title: "Blog Yazısı Başlığı 6",
      shortDescription: "Altıncı geçici blog yazısı. Grid'in son elemanı.",
      image: {
        src: "/image/image_blog.webp",
      },
    },
    {
      id: 7,
      href: "/blog/gecici-blog-7",
      title: "Blog Yazısı Başlığı 7",
      shortDescription:
        "Yedinci blog yazısı. Bu noktadan sonra slider aktif olacak.",
      image: {
        src: "/image/image_blog.webp",
      },
    },
    {
      id: 8,
      href: "/blog/gecici-blog-8",
      title: "Blog Yazısı Başlığı 8",
      shortDescription: "Sekizinci blog yazısı. Slider test verisi.",
      image: {
        src: "/image/image_blog.webp",
      },
    },
  ];

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
            {tempBlogData.map((item) => (
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
