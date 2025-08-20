import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useStore, useTranslation, Link, Image } from "@ikas/storefront";
import { HeaderProps } from "src/components/__generated__/types";
import UIStore from "src/store/ui-store";
import MaxQuantityPerCartModal from "src/components/components/modal-max-quantity-per-cart";
import styles from "../style.module.css";
import UserIcon from "../../svg/user";
import FavoriteSVG from "src/components/svg/favorite";
import CartIcon from "../../svg/cart";
import IOCloseSVG from "../../svg/close";
import BellSVG from "../../svg/notification";
import ArrowRight from "../../svg/arrow-right-white";
import Close from "../../svg/close";
import ScrollingText from "../components/scrolling-text";
import { SearchInput } from "../components/search";
import LocalizationBar from "../components/localization-bar";

import { NS } from "../";

import CartModal from "./cartModal";
import { LanguageSelect } from "src/components/language";

const DesktopHeader = (props: HeaderProps) => {
  return (
    <>
      <ScrollingText {...props} />
      <header className={styles.header}>
        <div className={styles.desktopContainer}>
          <div className={styles.innerContainer}>
            <div className={styles.localizationBarWrapper}>
              {/* Dil Seçimi */}
              <LanguageSelect />
              {/* Lokalizasyon Seçimi */}
              <LocalizationBar {...props.localization} />
            </div>
            {/* Logo */}
            <LeftSide {...props} />
            {/* İkonlar */}
            <RightSide {...props} />
          </div>
          {/*//* Kategoriler */}
          <Center {...props} />
        </div>
      </header>
      <MaxQuantityPerCartModal />
    </>
  );
};

export default observer(DesktopHeader);

/* Sol Taraf */
const LeftSide = (props: HeaderProps) => {
  const { logo } = props;
  if (!logo) {
    return null;
  }

  return (
    <div className={styles.logo}>
      <Link href="/">
        <a>
          <Image
            image={logo}
            alt={logo?.altText || ""}
            width={300}
            height={29}
          />
        </a>
      </Link>
    </div>
  );
};

/* Merkez */
const Center = (props: HeaderProps) => {
  const { categoryMenu, staticCategoryMenu } = props;

  const altCat = categoryMenu?.data.filter(
    (item: any) => item.parentId !== null
  );

  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setHoveredCategory(null);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  const handleMouseEnter = (categoryId: string) => {
    setHoveredCategory(categoryId);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div className={styles.header_menu_link_wrapper}>
      {categoryMenu?.data.map((item: any, index: number) => {
        const isHovered = hoveredCategory === item.id;
        return (
          <div
            key={index}
            className={styles.header_menu_link_content}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
          >
            {item.parentId === null && (
              <div className={styles.top_category}>
                <div>
                  <Link href={item.href} passHref>
                    <a>{item?.name.toLocaleUpperCase("tr-TR")}</a>
                  </Link>
                </div>
              </div>
            )}
            {isHovered &&
              altCat?.some(
                (altCategory) => altCategory.parentId === item.id
              ) && (
                <div className={styles.alt_category_wrapper}>
                  <div className={styles.alt_category_wrapper_botom}>
                    {/* statik kategoriler */}
                    <div className={styles.alt_static_category}>
                      <span className={styles.alt_static_category_title}>
                        Önerilen Kategoriler
                      </span>
                      <div>
                        {staticCategoryMenu?.data.map((item, index) => {
                          return (
                            <Link href={item.href} key={index}>
                              <a>
                                {/* <span>{item?.name?.charAt(0)}</span> */}
                                {item.name}
                              </a>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                    {/* Alt kategoriler */}
                    <div className={styles.alt_category_container}>
                      <div className={styles.alt_category_list}>
                        <span className={styles.alt_category_list_title}>
                          Kategoriler
                        </span>
                        {altCat?.map((altCategory: any, index: number) => {
                          return (
                            <>
                              {item.id === altCategory.parentId &&
                                altCategory?.image === null && (
                                  <div key={index}>
                                    <div
                                      className={styles.alt_category_content}
                                    >
                                      <Link href={altCategory.href}>
                                        <a>
                                          <span>{altCategory.name}</span>
                                        </a>
                                      </Link>
                                    </div>
                                  </div>
                                )}
                            </>
                          );
                        })}
                      </div>

                      {/* Resim alanı */}
                      <div className={styles.alt_category_images}>
                        {altCat?.map((altCategory: any, index: number) => {
                          return (
                            <>
                              {item.id === altCategory.parentId &&
                                altCategory?.image !== null && (
                                  <div
                                    key={`image-${index}`}
                                    className={styles.category_image_item}
                                  >
                                    <img
                                      src={altCategory?.image?.src}
                                      alt={altCategory?.image?.altText || ""}
                                    />
                                    <div className={styles.category_image_info}>
                                      <h3
                                        className={styles.category_image_title}
                                      >
                                        {altCategory.name}
                                      </h3>
                                      {altCategory.description && (
                                        <p
                                          className={
                                            styles.category_image_description
                                          }
                                        >
                                          {altCategory.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                )}
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        );
      })}
    </div>
  );
};

/* Sağ taraf | Bell */
export const Bell = observer((props: HeaderProps) => {
  const { special_for_your } = props;

  if (!special_for_your) {
    return null;
  }

  const [openBellModal, setOpenBellModal] = useState(false);

  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (router && router.events) {
      const handleRouteChange = () => {
        setOpenBellModal(false);
      };

      router.events.on("routeChangeStart", handleRouteChange);

      return () => {
        router.events.off("routeChangeStart", handleRouteChange);
      };
    }
  }, [router]);

  const onModalClose = () => {
    setOpenBellModal(false);
  };

  const onOpenMyModal = () => {
    setOpenBellModal(true);
  };

  return (
    <div className={styles.bell}>
      {/* Bell */}
      <span onClick={() => onOpenMyModal()}>
        <BellSVG height="20px" width="20px" color="#000" />
      </span>

      {openBellModal && (
        <div className={styles.special_modal}>
          <div className={styles.modal_wrapper}>
            {/* close */}
            <div className={styles.close_bell}>
              <span onClick={onModalClose}>
                <Close />
              </span>
            </div>
            <div className={styles.modal_bell_icon}>
              <span>
                <BellSVG height="24px" width="24px" color="#000" />
              </span>
            </div>
            <div className={styles.modal_content}>
              <p>{t(`${NS}:specailForYou`)}</p>

              <Link href={special_for_your?.href}>
                <a>{t(`${NS}:beginShopping`)}</a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

{
  /* Sağ taraf*/
}
const RightSide = observer((props: HeaderProps) => {
  const { t } = useTranslation();

  const store = useStore();
  const quantity = store.cartStore.cart?.itemQuantity ?? 0;
  const [userToken, setUserToken] = useState<string | null>("");

  useEffect(() => {
    const token: string | null = localStorage.getItem("customerToken");

    setUserToken(token);
  }, []);

  const uiStore = UIStore.getInstance();
  const { cart } = store.cartStore;
  const router = useRouter();

  useEffect(() => {
    if (router && router.events) {
      const handleRouteChange = () => {
        uiStore.cartModalVisible = false;
      };

      router.events.on("routeChangeStart", handleRouteChange);

      return () => {
        router.events.off("routeChangeStart", handleRouteChange);
      };
    }
  }, [router, uiStore]);

  return (
    <div className={styles.rightSide}>
      {/* Arama */}
      <SearchInput {...props} />

      {/* Zill */}
      <Bell {...props} />

      {userToken && (
        <Link href="/account/favorite-products">
          <a className={styles.favoriteWrapper}>
            <FavoriteSVG height="20px" width="20px" color="#000" />
          </a>
        </Link>
      )}

      {userToken ? (
        <Link href="/account">
          <a className={styles.accountWrapper}>
            <UserIcon height="20px" width="20px" color="#000" />
          </a>
        </Link>
      ) : (
        <Link href="/account/login">
          <a className={styles.accountWrapper}>
            <UserIcon height="20px" width="20px" color="#000" />
          </a>
        </Link>
      )}
      {/* CartIcon */}
      <button className={styles.cartWrapper} onClick={uiStore.toggleCartModal}>
        <span>{quantity}</span>
        <CartIcon height="20px" width="20px" color="#000" />
      </button>
      <div
        className={
          uiStore.cartModalVisible ? styles.sideNav : styles.sideNav_open
        }
      >
        <div className={styles.sidenavHeader}>
          <button
            className={styles.sidenavCloseButton}
            onClick={uiStore.toggleCartModal}
          >
            <IOCloseSVG />
          </button>
          <CartModal {...props} />
        </div>

        {cart !== undefined && cart !== null && (
          <div className={styles.bottomContent}>
            <div className={styles.buttonPayment}>
              <Link href={"/cart"}>
                <a>
                  <span> {t(`${NS}:summary.cart`)}</span>
                  <span>
                    {cart?.formattedTotalPrice} <ArrowRight />
                  </span>
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
