import React, { useState, useEffect, useRef, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { ProductListProps } from "../__generated__/types";
import Product from "./product";
import styles from "./style.module.css";
import { IkasProductList, useTranslation } from "@ikas/storefront";
import ModalFilter from "./filter/modal";
import { useRouter } from "next/router";
import Sort from "./filter/sort";
import ChildCategories from "./child-categories";
import { Loading } from "../components/button";
import SidebarFilter from "./sidebar-filter";
import Link from "next/link";
import ArrowRightIcon from "src/components/svg/arrow-right";
import CloseIcon from "src/components/svg/close";
import { useScreen } from "src/utils/hooks/useScreen";
import ViewSelector from "./view-selector";
import SpecialDiscountBanner from "./special-discount-banner";
import Pagination from "./pagination";

const ProductList = (props: ProductListProps) => {
  const { productList, categories, categorNames, isWidthVideo, tags, alignTagsRight, campaignList, showTags } = props;

  if (!productList) {
    return null;
  }

  const { t } = useTranslation();
  const { isMobile, isTablet, isDesktop } = useScreen();

  // Loading state ekle
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Sayfa yüklendiğinde loading state'i false yap
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 100); // 100ms sonra loading'i kapat

    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer için ref
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadMoreProducts = useCallback(async () => {
    if (!productList.hasNext || productList.isLoading) {
      return;
    }

    try {
      const nextPage = productList.page + 1;
      productList.getNext();
      await productList.getPage(nextPage);
    } catch (error) {
      console.error("Daha fazla ürün yüklenemedi:", error);
    }
  }, [productList]);

  // Intersection Observer ile otomatik yükleme
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (
          entry.isIntersecting &&
          productList.hasNext &&
          !productList.isLoading
        ) {
          loadMoreProducts();
        }
      },
      {
        rootMargin: "100px", // Sayfanın altından 100px önce tetikle
        threshold: 0.1,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.observe(loadMoreRef.current);
      }
    };
  }, [loadMoreProducts, productList.hasNext, productList.isLoading]);

  //+ Grid leyout view selector işlemleri (Sayfada ürün kaç sütunlu gözüksün?)
  const getDefaultColumns = () => {
    if (isMobile) return 2; // Mobile için varsayılan 2 sütun (%50)
    if (isTablet) return 2; // Tablet için varsayılan 2 sütun
    return 3; // Desktop için varsayılan 4 sütun ...
  };

  const [columns, setColumns] = useState(getDefaultColumns());

  // Ekran boyutu değiştiğinde varsayılan değeri güncelle
  useEffect(() => {
    setColumns(getDefaultColumns());
  }, [isMobile, isTablet, isDesktop]);

  const gridStyle = {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  };

  //+Special Discount Banner İşlemleri
  // İndirim Banner gösterilecek kategoriyi bul.. ve MobX proxy nesnelerini normal nesnelere dönüştür
  const normalCategorNames = categorNames
    ? JSON.parse(JSON.stringify(categorNames))
    : [];

  // Sayfa adını güvenli şekilde alalım...
  const pageName =
    (productList as any).pageSpecificData?.name?.toLowerCase() || "";

  //Kategori adı interface
  interface CategoryType {
    cat_names?: Array<{
      category_name: string;
    }>;
    header_text?: string;
    content_text?: string;
    bg_color?: string;
    header_color?: string;
    content_color?: string;
    isColorEffectEnabled?: boolean;
    isTextEffectEnabled?: boolean;
  }
  const matchedCategory = normalCategorNames?.find((category: CategoryType) =>
    category?.cat_names?.some((cat) =>
      pageName.includes(cat?.category_name.toLowerCase() || "")
    )
  );

  return (
    <div className={styles.product_list_wrapper}>
      {/*//= Divider - Ayrık Çizgisi */}
      {!isMobile && <div className={styles.divider} />}

      {/*//= İçerikler*/}
      {!isDesktop ? (
        <div className={styles.product_list_header}>
          {/* Özel indirim bannerı (Sadece eşleşen kategoride görünür) */}
          {matchedCategory && (
            <SpecialDiscountBanner
              header_text={matchedCategory?.header_text}
              content_text={matchedCategory?.content_text}
              bg_color={matchedCategory?.bg_color}
              header_color={matchedCategory?.header_color}
              content_color={matchedCategory?.content_color}
              isColorEffectEnabled={matchedCategory?.isColorEffectEnabled}
              isTextEffectEnabled={matchedCategory?.isTextEffectEnabled}
            />
          )}
          <div className={styles.product_list_top_mobile}>
            <ModalFilter {...props} />
            <Header productList={productList} />
            <Sort {...props} />
          </div>
          <div>
            <ChildCategories {...props} />
            <ViewSelector columns={columns} onChange={setColumns} />
          </div>
        </div>
      ) : (
        <div className={styles.product_list_top}>
          {/* Özel indirim bannerı (Sadece eşleşen kategoride görünür) */}
          {matchedCategory && (
            <SpecialDiscountBanner
              header_text={matchedCategory?.header_text}
              content_text={matchedCategory?.content_text}
              bg_color={matchedCategory?.bg_color}
              header_color={matchedCategory?.header_color}
              content_color={matchedCategory?.content_color}
              isColorEffectEnabled={matchedCategory?.isColorEffectEnabled}
              isTextEffectEnabled={matchedCategory?.isTextEffectEnabled}
            />
          )}
          <div className={styles.product_list_breadcrumb}>
            <Header productList={productList} />
          </div>
          <div className={styles.product_list_top_container}>
            <div className={styles.left}>
              <ChildCategories {...props} />
            </div>
            <div className={styles.right}>
              <ViewSelector columns={columns} onChange={setColumns} />
              <Sort {...props} />
            </div>
          </div>
        </div>
      )}

      {/*//! Sidebar - Sadece Desktop */}
      <div className={styles.product_list_container}>
        {/* Sol sidebar için yeni div */}
        {isDesktop && (
          <div className={styles.filter_sidebar}>
            <SidebarFilter {...props} />
          </div>
        )}

        {/*//! Ana içerik alanı */}
        <div className={styles.product_list_content}>
          {/* Loading overlay ekle */}
          {isInitialLoading && (
            <div className={styles.loading_overlay}>
              <div className={styles.loading_logo}>
                <img
                  src="/image/logo/logo-dizaynella.png"
                  alt="Dizaynella Logo"
                  className={styles.logo_image}
                />
              </div>
            </div>
          )}

          <div className={styles.selectedFilters_container}>
            {productList?.filters?.map((item, index) => {
              return (
                <div key={index} className={styles.filter_values_container}>
                  {item.displayedValues.map((item2) => {
                    if (item2.isSelected === true) {
                      return (
                        <div>
                          <div
                            key={item2.id}
                            className={styles.filter_value_item}
                          >
                            <div
                              onClick={() => {
                                item.onFilterValueClick(item2);
                              }}
                              className={styles.filter_values}
                            >
                              <span> {item2.name}</span>
                              <span style={{ marginTop: "7px" }}>
                                <CloseIcon
                                  height="1em"
                                  width="1em"
                                  color="#000"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              );
            })}
          </div>

          {productList?.data.length > 0 ? (
            <div className={styles.product_list_products} style={gridStyle}>
              {productList?.data.map((product, index) => {
                return (
                  <Product
                    key={index}
                    product={product}
                    columns={columns}
                    isWidthVideo={isWidthVideo}
                    tags={tags}
                    alignTagsRight={alignTagsRight}
                    campaignList={campaignList}
                    showTags={showTags}
                  />
                );
              })}
            </div>
          ) : (
            <div className={styles.product_list_no_product}>
              {t("common:list.noProduct")}
            </div>
          )}

          {/* Otomatik yükleme için gözlemci div */}
          <div ref={loadMoreRef} className={styles.loadmore}>
            {productList.isLoading && (
              <div className={styles.loading_text}>
                {t("common:list.loading") || "Yükleniyor..."}
              </div>
            )}
            {!productList.hasNext && productList.data.length > 0 && (
              <div className={styles.no_more_products}>
                {productList.data.length}{" "}
                {t("common:list.noMoreProducts") || "Gösterildi"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

type HeaderProps = {
  productList: IkasProductList | undefined;
};

//= Header Bölümü
export const Header = observer((props: HeaderProps) => {
  const { productList } = props;
  const newProductList: any = productList;
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className={styles.tittle_container}>
      <Link href="/">
        <a> {t("common:list.home")}</a>
      </Link>
      <span>
        <ArrowRightIcon />
      </span>
      <div className={styles.title}>
        {router.query?.s ? (
          <>"{router?.query?.s}"</>
        ) : (
          <>
            {newProductList?.pageSpecificData?.name?.toLocaleUpperCase("tr-TR")}
          </>
        )}
      </div>
    </div>
  );
});

export default observer(ProductList);
