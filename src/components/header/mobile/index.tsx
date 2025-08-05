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

import CartModal from "../desktop/cartModal";
import { useRouter } from "next/router";
import ArrowRight from "src/components/svg/arrow-right-white";
import { LanguageSelect } from "src/components/language";
import { Bell } from "src/components/header/desktop";

const MobileHeader = (props: HeaderProps) => {
  return (
    <>
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
            <div style={{ width: "15%" }}></div>
            <div style={{ width: "65%", textAlign: "center" }}>
              <Link href="/">
                <a>
                  <Image
                    image={logo}
                    alt={logo?.altText || ""}
                    width={230}
                    height={30}
                  />
                </a>
              </Link>
            </div>
            <button
              className={styles.sidenavCloseButton}
              onClick={uiStore.toggleSidenav}
              style={{ width: "20%" }}
            >
              <IOCloseSVG />
            </button>
          </div>
          <Navigation {...props} />
        </div>
        <div className={styles.sidenavlang}>
          <LanguageSelect />
        </div>
      </div>
    </>
  );
});

const Navigation = (props: HeaderProps) => {
  const { categoryMenu } = props;
  if (!categoryMenu) {
    return null;
  }

  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [categoryHistory, setCategoryHistory] = useState<string[]>([]);

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
        {childCategories.map((childCategory) => (
          <li key={childCategory.id} className={styles.top_category_wrapper}>
            <div className={styles.top_category_content}>
              {categoryMenu.data.some(
                (item) => item.parentId === childCategory.id
              ) ? (
                <>
                  <Link href={childCategory.href}>
                    <a>{childCategory.name}</a>
                  </Link>
                  <span onClick={() => toggleCategory(childCategory.id)}>
                    {!expandedCategories.includes(childCategory.id) && (
                      <ArrowRightBlack />
                    )}
                  </span>
                </>
              ) : (
                <Link href={childCategory.href}>
                  <a>{childCategory.name}</a>
                </Link>
              )}
            </div>
            <div>
              {expandedCategories.includes(childCategory.id) && (
                <ul className={styles.mobil_fixed_menu}>
                  <div className={styles.mobil_back}>
                    <span onClick={goBack}>
                      <LeftArrow />
                    </span>
                  </div>
                  {renderCategories(childCategory.id)}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
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

      {userToken ? (
        <Link href="/account">
          <a>
            <UserIcon width="20px" height="20px" color="#000" />
          </a>
        </Link>
      ) : (
        <Link href="/account/login">
          <a>
            <UserIcon width="20px" height="20px" color="#000" />
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
          <CartModal />
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
