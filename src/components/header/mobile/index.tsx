import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Image, Link, useStore, useTranslation } from "@ikas/storefront";
import UIStore from "src/store/ui-store";

import { HeaderProps } from "src/components/__generated__/types";
import FavoriteSVG from "src/components/svg/new-favicon";
import UserIcon from "../../svg/new-user";
import CartIcon from "../../svg/new-cart";
import SearchSVG from "../../svg/new-search";
import MaxQuantityPerCartModal from "src/components/components/modal-max-quantity-per-cart";
import Button from "src/components/components/button";

import IOMenuSVG from "./svg/io-menu";
import IOCloseSVG from "./svg/io-close";
import styles from "./style.module.css";
import CloseIcon from "../../svg/close";
import Plus from "src/components/svg/plus";
import Minus from "src/components/svg/minus";

import CartModal from "../desktop/cartModal";
import { useRouter } from "next/router";
import ArrowRight from "src/components/svg/arrow-right-white";
import { LanguageSelect } from "src/components/language";
import ScrollingText from "../scrolling-text-with-buttons";
import { useScreen } from "src/utils/hooks/useScreen";

import { NS } from "../";

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

const LeftSide = observer((props: HeaderProps) => {
  const uiStore = UIStore.getInstance();

  return (
    <div className={styles.leftSide}>
      <button className={styles.sidenavButton} onClick={uiStore.toggleSidenav}>
        <IOMenuSVG />
      </button>
    </div>
  );
});

const Center = observer((props: HeaderProps) => {
  const { logo, logo_black } = props;
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
            width={150}
            height={45}
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
                    width={150}
                    height={45}
                  />
                </a>
              </Link>
            </div>
            <button
              className={styles.sidenavCloseButton}
              onClick={uiStore.toggleSidenav}
              style={{ width: "20%" }}
            >
              <CloseIcon />
            </button>
          </div>
          <Navigation {...props} />
          <SearchInput {...props} />
        </div>
        <div className={styles.sidenavlang}>
          <LanguageSelect />
        </div>
      </div>
    </>
  );
});

const Navigation = (props: HeaderProps) => {
  const { logo, categoryMenu } = props;
  if (!logo) {
    return null;
  }

  if (!categoryMenu) {
    return null;
  }

  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const renderCategories = (parentId: string | null) => {
    const childCategories = categoryMenu.data.filter(
      (item) => item.parentId === parentId
    );

    return (
      <ul>
        {childCategories.map((childCategory) => (
          <li key={childCategory.id} className={styles.childcategory}>
            <div
              className={styles.top_category_content}
              onClick={() => toggleCategory(childCategory.id)}
            >
              {categoryMenu.data.some(
                (item) => item.parentId === childCategory.id
              ) ? (
                <>
                  <a>{childCategory.name}</a>
                  <span>
                    {expandedCategories.includes(childCategory.id) ? (
                      <Minus />
                    ) : (
                      <Plus />
                    )}
                  </span>
                </>
              ) : (
                <Link href={childCategory.href}>
                  <a>
                    <span>{childCategory.name}</span>
                  </a>
                </Link>
              )}
            </div>
            <div className={styles.subchild}>
              {expandedCategories.includes(childCategory.id) &&
                renderCategories(childCategory.id)}
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
      <ul>
        {renderCategories(null)}

        {/* statick menu */}
        {/* {staticCatMenu?.data.map((item) => {
          return (
            <li key={item.id} className={styles.childcategory}>
              <div className={styles.top_category_content}>
                <Link href={item.href}>
                  <a>{item.name}</a>
                </Link>
              </div>
            </li>
          );
        })} */}
      </ul>
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
      {userToken && (
        <Link href="/account/favorite-products">
          <a className={styles.favoriteWrapper}>
            <FavoriteSVG />
          </a>
        </Link>
      )}

      {userToken ? (
        <Link href="/account">
          <a className={styles.accountWrapper}>
            <UserIcon />
          </a>
        </Link>
      ) : (
        <Link href="/account/login">
          <a className={styles.accountWrapper}>
            <UserIcon />
          </a>
        </Link>
      )}

      <button className={styles.cartWrapper} onClick={uiStore.toggleCartModal}>
        <span>{quantity}</span>
        <CartIcon />
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

//Arama
export const SearchInput = observer((props: HeaderProps) => {
  const { t } = useTranslation();
  const uiStore = UIStore.getInstance();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      router.push(`/search?s=${uiStore.searchKeyword}`);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    uiStore.searchKeyword = event.target.value;
  };

  // Direk focuslanmasını engelle
  // useEffect(() => {
  //   if (searchInputRef.current) {
  //     searchInputRef.current.focus();
  //   }
  // }, []);

  const { logo } = props;
  if (!logo) {
    return null;
  }

  return (
    <div className={styles.mobileSearchContainer}>
      <div className={styles.mobileSearchInputWrapper}>
        <div className={styles.mobileSearchIcon}>
          <SearchSVG />
        </div>
        <input
          type="search"
          value={uiStore.searchKeyword}
          placeholder={t(`${NS}:searchInput.placeholder`)}
          onKeyPress={onKeyPress}
          onChange={onChange}
          ref={searchInputRef}
          className={styles.mobileSearchInput}
        />
      </div>
    </div>
  );
});
