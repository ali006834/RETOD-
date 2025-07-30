import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { ProductListProps } from "src/components/__generated__/types";
import Link from "next/link";
import styles from "./style.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRouter } from "next/router";

interface ChildCategoriesProps extends ProductListProps {
  currentCategoryId?: string;
}

const ChildCategories = observer((props: ChildCategoriesProps) => {
  const { categories, productList } = props;
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mevcut kategori ID'sini al
  const currentCategoryId =
    router.query?.categoryId?.toString() ||
    (productList as any)?.pageSpecificData?.id;

  // Yalnızca mevcut kategoriye ait alt kategorileri filtrele
  const childCategories = categories?.data?.filter(
    (item: any) => item.parentId === currentCategoryId
  );

  // Eğer alt kategori yoksa bileşeni render etme
  if (!childCategories || childCategories.length === 0) {
    return null;
  }

  return (
    <div className={styles.swiperContainer}>
      <Swiper
        slidesPerView={isSmallScreen ? "auto" : "auto"}
        spaceBetween={12}
        className={styles.swiperWrapper}
        centeredSlides={false}
        freeMode={true}
      >
        {childCategories?.map((item: any) => (
          <SwiperSlide key={item.id} className={styles.swiperSlide}>
            <div className={styles.categoryCard}>
              <Link href={item.href || "#"} passHref legacyBehavior>
                <a className={styles.categoryName}>{item.name}</a>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

export default ChildCategories;
