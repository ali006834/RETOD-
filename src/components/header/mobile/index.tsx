import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Image, Link, useStore, useTranslation } from "@ikas/storefront";
import UIStore from "src/store/ui-store";

import { HeaderProps } from "src/components/__generated__/types";
import FavoriteSVG from "src/components/svg/favorite";
import UserIcon from "src/components/svg/user";
import CartIcon from "src/components/svg/cart";
import { SearchInput } from "src/components/header/search";
import MaxQuantityPerCartModal from "src/components/components/modal-max-quantity-per-cart";

import IOMenuSVG from "./svg/io-menu";
import IOCloseSVG from "src/components/svg/close";
import styles from "./style.module.css";
import ArrowRightBlack from "src/components/svg/arrow-right";
import LeftArrow from "src/components/svg/left-arrow";
import NextIcon from "src/components/svg/next";
import PrevIcon from "src/components/svg/prev";

import ScrollingText from "../scrolling-text";

import CartModal from "../desktop/cartModal";
import { useRouter } from "next/router";
import ArrowRight from "src/components/svg/arrow-right-white";
import { LanguageSelect } from "src/components/language";
import { Bell } from "src/components/header/desktop";

const MobileHeader = (props: HeaderProps) => {
  return (
    <>
      <ScrollingText {...props} />
      <header className={styles.header}>
        <div className={styles.row}>
          <LeftSide {...props} />
          <Center {...props} />
          <RightSide {...props} />
        </div>

        <Sidenav {...props} />
      </header>
      <MaxQuantityPerCartModal />
    </>
  );
};

export default observer(MobileHeader);

// Hamburger Menu - İkonu
const LeftSide = observer((props: HeaderProps) => {
  const uiStore = UIStore.getInstance();

  return (
    <div className={styles.leftSide}>
      <button className={styles.sidenavButton} onClick={uiStore.toggleSidenav}>
        <IOMenuSVG width="16px" height="16px" color="#000" strokeWidth="1.1" />
      </button>
      <SearchInput {...props} />
    </div>
  );
});

// Logo
const Center = observer((props: HeaderProps) => {
  const { logo } = props;
  if (!logo) {
    return null;
  }
  return (
    <div className={styles.leftSide}>
      <Link href="/">
        <a>
          <Image
            image={logo}
            alt={logo?.altText || ""}
            width={200}
            height={20}
          />
        </a>
      </Link>
    </div>
  );
});

const Sidenav = observer((props: HeaderProps) => {
  const uiStore = UIStore.getInstance();
  const { logo } = props;
  const [userToken, setUserToken] = useState<string | null>("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [categoryHistory, setCategoryHistory] = useState<string[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    const token: string | null = localStorage.getItem("customerToken");
    setUserToken(token);
  }, []);

  if (!logo) {
    return null;
  }

  return (
    <>
      {uiStore.sidenavVisible && (
        <div
          className={styles.sidenavOverlay}
          onClick={() => uiStore.toggleSidenav()}
        />
      )}
      <div
        className={
          uiStore.sidenavVisible ? styles.sideNav : styles.sideNav_open
        }
      >
        <div>
          <div className={styles.sidenavHeader}>
            <div style={{ width: "70%", textAlign: "center" }}>
              <Link href="/">
                <a>
                  <Image
                    image={logo}
                    alt={logo?.altText || ""}
                    width={180}
                    height={18}
                  />
                </a>
              </Link>
            </div>
            <button
              className={styles.sidenavCloseButton}
              onClick={uiStore.toggleSidenav}
              style={{ width: "30%" }}
            >
              <IOCloseSVG />
            </button>
          </div>
          {expandedCategories.length === 0 && (
            <div className={styles.locationRegisterSection}>
              <div className={styles.locationText}>
                <LanguageSelect />
              </div>
              <div className={styles.userSection}>
                {userToken ? (
                  <Link href="/account">
                    <a className={styles.userButton}>
                      <UserIcon width="16px" height="16px" color="#fff" />
                      <span>{t(`header:headerButton_text.account`)}</span>
                    </a>
                  </Link>
                ) : (
                  <Link href="/account/login">
                    <a className={styles.userButton}>
                      <UserIcon width="16px" height="16px" color="#fff" />
                      <span>{t(`header:mobileHeader.signIn`)}</span>
                    </a>
                  </Link>
                )}
              </div>
            </div>
          )}
          <Navigation
            {...props}
            expandedCategories={expandedCategories}
            setExpandedCategories={setExpandedCategories}
            categoryHistory={categoryHistory}
            setCategoryHistory={setCategoryHistory}
          />
          <div className={styles.customerCategories}>
            <div className={styles.categoryItem}>
              <Link href="/customer-service">
                <a>{t(`header:mobileHeader.customerService`)}</a>
              </Link>
            </div>
            <div className={styles.categoryItem}>
              <Link href="/account/favorite-products">
                <a>{t(`header:mobileHeader.wishList`)}</a>
              </Link>
            </div>
          </div>
          <div className={styles.helpSection}>
            <h3 className={styles.helpTitle}>
              {t(`header:mobileHeader.needHelp`)}
            </h3>
            <p className={styles.helpText}>
              {t(`header:mobileHeader.helpText`)}{" "}
              <Link href="/customer-service">
                <a
                  href="/account/favorite-products"
                  className={styles.helpLink}
                >
                  {t(`header:mobileHeader.visitLink`)}
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
});

const Navigation = (
  props: HeaderProps & {
    expandedCategories: string[];
    setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>;
    categoryHistory: string[];
    setCategoryHistory: React.Dispatch<React.SetStateAction<string[]>>;
  }
) => {
  const {
    categoryMenu,
    expandedCategories,
    setExpandedCategories,
    categoryHistory,
    setCategoryHistory,
  } = props;
  if (!categoryMenu) {
    return null;
  }

  const toggleCategory = (categoryId: string) => {
    setCategoryHistory((prev) => [...prev, categoryId]);
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const goBack = () => {
    setCategoryHistory((prev) => {
      if (prev.length > 0) {
        const newHistory = [...prev];
        const lastCategoryId = newHistory.pop();
        setExpandedCategories((expandedCategories) =>
          expandedCategories.filter((id) => id !== lastCategoryId)
        );
        return newHistory;
      }
      return prev;
    });
  };

  const renderCategories = (parentId: string | null) => {
    const childCategories = categoryMenu.data.filter(
      (item) => item.parentId === parentId
    );

    return (
      <ul>
        {childCategories.map((childCategory) => {
          // Check if this specific category has child categories with images
          const childCategoriesWithImages = categoryMenu.data.filter(
            (item) => item.parentId === childCategory.id && item.image !== null
          );
          const hasImagesInChildren = childCategoriesWithImages.length > 0;

          return (
            <li key={childCategory.id} className={styles.top_category_wrapper}>
              <div className={styles.top_category_content}>
                {categoryMenu.data.some(
                  (item) => item.parentId === childCategory.id
                ) ? (
                  <>
                    <Link href={childCategory.href}>
                      <a>{childCategory.name.toLocaleUpperCase("tr-TR")}</a>
                    </Link>
                    <span onClick={() => toggleCategory(childCategory.id)}>
                      {!expandedCategories.includes(childCategory.id) && (
                        <NextIcon width="24px" height="24px" />
                      )}
                    </span>
                  </>
                ) : (
                  <Link href={childCategory.href}>
                    <a>{childCategory.name.toLocaleUpperCase("tr-TR")}</a>
                  </Link>
                )}
              </div>
              <div>
                {expandedCategories.includes(childCategory.id) && (
                  <ul className={styles.mobil_fixed_menu}>
                    <div className={styles.mobil_back}>
                      <span onClick={goBack}>
                        <PrevIcon width="24px" height="24px" />
                      </span>
                    </div>
                    <div className={styles.parent_category_title}>
                      <h2>{childCategory.name.toLocaleUpperCase("tr-TR")}</h2>
                    </div>
                    {renderMixedCategories(childCategory.id)}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderMixedCategories = (parentId: string) => {
    const allChildCategories = categoryMenu.data.filter(
      (item) => item.parentId === parentId
    );

    const categoriesWithoutImages = allChildCategories.filter(
      (item) => item.image === null || item.image === undefined
    );

    const categoriesWithImages = allChildCategories.filter(
      (item) => item.image !== null && item.image !== undefined
    );

    return (
      <>
        {/* First show categories without images */}
        {categoriesWithoutImages.length > 0 && (
          <div className={styles.mobile_text_categories}>
            {categoriesWithoutImages.map((category) => (
              <div
                key={category.id}
                className={styles.mobile_text_category_item}
              >
                <Link href={category.href}>
                  <a>{category.name.toLocaleUpperCase("tr-TR")}</a>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Then show categories with images */}
        {categoriesWithImages.length > 0 && (
          <div className={styles.mobile_category_images}>
            {categoriesWithImages.map((category) => (
              <div
                key={category.id}
                className={styles.mobile_category_image_item}
              >
                <Link href={category.href}>
                  <a>
                    <img
                      src={category.image?.src}
                      alt={category.image?.altText || category.name}
                      className={styles.mobile_category_image}
                    />
                    <div className={styles.mobile_category_image_info}>
                      <h3 className={styles.mobile_category_image_title}>
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className={styles.mobile_category_image_description}>
                          {category.description}
                        </p>
                      )}
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  const renderCategoriesWithImages = (parentId: string) => {
    const childCategories = categoryMenu.data.filter(
      (item) => item.parentId === parentId && item.image !== null
    );

    return childCategories.map((category) => (
      <div key={category.id} className={styles.mobile_category_image_item}>
        <Link href={category.href}>
          <a>
            <img
              src={category.image?.src}
              alt={category.image?.altText || category.name}
              width={200}
              height={100}
              className={styles.mobile_category_image}
            />
            <div className={styles.mobile_category_image_info}>
              <h3 className={styles.mobile_category_image_title}>
                {category.name}
              </h3>
              {category.description && (
                <p className={styles.mobile_category_image_description}>
                  {category.description}
                </p>
              )}
            </div>
          </a>
        </Link>
      </div>
    ));
  };

  const router = useRouter();
  const uiStore = UIStore.getInstance();

  useEffect(() => {
    uiStore.closeSidenav();
  }, [router]);

  return (
    <div className={styles.mobile_category_container}>
      <ul>{renderCategories(null)}</ul>
    </div>
  );
};

const RightSide = observer((props: HeaderProps) => {
  const store = useStore();
  const { t } = useTranslation();

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
    uiStore.cartModalVisible == false;
  }, [!router.query.beden]);

  useEffect(() => {
    uiStore.closeCartModal();
  }, [router]);

  return (
    <div className={styles.rightSide}>
      <Bell {...props} />

      {userToken && (
        <Link href="/account/favorite-products">
          <a>
            <FavoriteSVG width="20px" height="20px" color="#000" />
          </a>
        </Link>
      )}

      <button className={styles.cartWrapper} onClick={uiStore.toggleCartModal}>
        <div className={styles.cartQuantity}>{quantity}</div>
        <CartIcon width="20px" height="20px" color="#000" />
      </button>
      <div
        className={
          uiStore.cartModalVisible
            ? styles.sideCartModal
            : styles.sideCartModal_open
        }
      >
        <div className={styles.sideCartHeader}>
          <div className={styles.cartClose}>
            <button
              className={styles.sidenavCloseButton}
              onClick={uiStore.toggleCartModal}
            >
              <IOCloseSVG />
            </button>
          </div>
          <CartModal {...props} />
        </div>
        {cart !== undefined && cart !== null && (
          <div className={styles.bottomContent}>
            <div className={styles.buttonPayment}>
              <Link href={"/cart"}>
                <a>
                  <span> {t(`header:summary.cart`)}</span>
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
