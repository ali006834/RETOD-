import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useTranslation, Link, Image, IkasProduct } from "@ikas/storefront";
import { HeaderProps } from "src/components/__generated__/types";
import UIStore from "src/store/ui-store";
import IOCloseSVG from "../../svg/close";
import SearchSVG from "../../svg/search";
import { toJS } from "mobx";
import styles from "./style.module.css";

import { NS } from "../";
import { useScreen } from "src/utils/hooks/useScreen";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

/* SearchInput */
export const SearchInput = observer((props: HeaderProps) => {
  const { searchRecomProducts } = props;

  const { t } = useTranslation();
  const uiStore = UIStore.getInstance();
  const router = useRouter();
  const [showInlineSearch, setShowInlineSearch] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      router.push(`/search?s=${uiStore.searchKeyword}`);
      handleCloseSearch();
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    uiStore.searchKeyword = event.target.value;
  };

  const handleSearchClick = () => {
    setShowInlineSearch(true);
    setShowSearchModal(true);
  };

  const handleCloseSearch = () => {
    setShowInlineSearch(false);
    setShowSearchModal(false);
    uiStore.searchKeyword = "";
  };

  // Açıldığında focus al..
  useEffect(() => {
    if (showInlineSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showInlineSearch]);

  //Eğer searchRecomProducts yoksa null dön..
  if (!searchRecomProducts) return null;

  // Proxiden gelen verileri JS'e çevir..
  const searchRecomProductsArr = toJS(searchRecomProducts);
  console.log("searchRecomProductsArr:::", searchRecomProductsArr);

  return (
    <>
      <div className={styles.inlineSearchWrapper}>
        {!showInlineSearch ? (
          <div onClick={handleSearchClick} className={styles.searchIconButton}>
            <SearchSVG height="22px" width="22px" color="#000" />
          </div>
        ) : (
          <div className={styles.inlineSearchContainer}>
            <div className={styles.inlineSearchInput}>
              <SearchSVG height="16px" width="16px" color="#666" />
              <input
                type="search"
                value={uiStore.searchKeyword}
                placeholder={t(`${NS}:searchInput.placeholder`)}
                onKeyPress={onKeyPress}
                onChange={onChange}
                ref={searchInputRef}
              />
              <button
                onClick={handleCloseSearch}
                className={styles.closeSearchButton}
              >
                <IOCloseSVG width="16px" height="16px" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Search Modal */}
      {showSearchModal && (
        <div className={styles.searchModalOverlay}>
          <div className={styles.searchModalContainer}>
            <div className={styles.searchModalContent}>
              <div className={styles.searchModalInner}>
                <div className={styles.searchModalHeader}>
                  <h3 className={styles.searchRecomTitle}>Önerilen Ürünler</h3>
                  <button
                    onClick={handleCloseSearch}
                    className={styles.searchModalCloseButton}
                  >
                    <IOCloseSVG width="24px" height="24px" />
                  </button>
                </div>

                <div className={styles.productsGrid}>
                  {searchRecomProducts.data.map((product, index) => (
                    <div key={product.id} className={styles.productItem}>
                      {product?.selectedVariant?.mainImage?.image?.id && (
                        <Link href={product?.href}>
                          <Image
                            className={styles.productImage}
                            image={product?.selectedVariant?.mainImage?.image}
                            alt={product.name}
                            width={900}
                            height={1350}
                            objectFit="cover"
                          />
                        </Link>
                      )}
                      <ProductTitle product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

type Props = {
  product: IkasProduct;
};

const ProductTitle = observer(({ product }: Props) => (
  <div className={styles.product_title}>
    {/* <span>{product?.brand?.name}</span> */}
    <Link href={product.href}>
      <a>
        <h2>{product.name}</h2>
      </a>
    </Link>
  </div>
));
