import React, { useState, useEffect } from "react";
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

const ProductList = (props: ProductListProps) => {
  const { productList, categories, categorNames } = props;

  if (!productList) {
    return null;
  }

  const { t } = useTranslation();
  const { isMobile, isTablet, isDesktop } = useScreen();

  const loadMoreProducts = async () => {
    if (!productList.hasNext) {
      return;
    }

    try {
      const nextPage = productList.page + 1;

      productList.getNext();
      await productList.getPage(nextPage);
    } catch (error) {
      console.error("Daha fazla ürün yüklenemedi:", error);
    }
  };

  // Grid leyout view selector işlemleri (Sayfada ürün kaç sütunlu gözüksün?)
  const getDefaultColumns = () => {
    if (isMobile) return 2; // Mobile için varsayılan 2 sütun (%50)
    if (isTablet) return 2; // Tablet için varsayılan 2 sütun
    return 4; // Desktop için varsayılan 4 sütun ...
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
              header_text={matchedCategory.header_text}
              content_text={matchedCategory.content_text}
              bg_color={matchedCategory.bg_color}
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
              header_text={matchedCategory.header_text}
              content_text={matchedCategory.content_text}
              bg_color={matchedCategory.bg_color}
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
                  <Product key={index} product={product} columns={columns} />
                );
              })}
            </div>
          ) : (
            <div className={styles.product_list_no_product}>
              {t("common:list.noProduct")}
            </div>
          )}

          <div className={styles.loadmore}>
            {productList.isLoading ? (
              <Loading />
            ) : (
              <div>
                {productList.hasNext === true && (
                  <button onClick={() => loadMoreProducts()}>
                    {t("common:list.loadMoreProducts")}
                  </button>
                )}
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
