import React, { useState, useEffect, useRef, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useStore, useTranslation, Link, Image } from "@ikas/storefront";
import { HeaderProps } from "src/components/__generated__/types";
import UIStore from "src/store/ui-store";
import MaxQuantityPerCartModal from "src/components/components/modal-max-quantity-per-cart";
import styles from "../style.module.css";
import FavoriteSVG from "src/components/svg/new-favicon";
import SearchSVG from "src/components/svg/new-search";
import UserIcon from "../../svg/new-user";
import CartIcon from "../../svg/new-cart";
import IOCloseSVG from "../../svg/close";
import ArrowRight from "src/components/svg/arrow-right-white";

import { NS } from "../";

import CartModal from "./cartModal";
// import ScrollingText from "../scrolling-text-with-buttons";
import { useScreen } from "src/utils/hooks/useScreen";
import Button from "src/components/components/button";
import ScrollingText from "../scrolling-text-with-buttons";

const DesktopHeader = (props: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ScrollingText {...props} />
      {isScrolled ? (
        <div
          className={`${styles.headerWrapper} ${
            isScrolled ? styles.headerWrapperScrolled : ""
          }`}
        >
          <header className={styles.header}>
            <div className={`${styles.desktopContainer}`}>
              <div
                className={`${
                  isScrolled
                    ? styles.innerContainerScrolled
                    : styles.innerContainer
                }`}
              >
                <LeftSide {...props} />
                <Center {...props} />
                <RightSide {...props} />
              </div>
            </div>
          </header>
        </div>
      ) : (
        <div
          className={`${styles.headerWrapper} ${
            isScrolled ? styles.headerWrapperScrolled : ""
          }`}
        >
          <header className={styles.header}>
            <div className={`${styles.desktopContainer}`}>
              <div className={styles.innerContainer}>
                <LeftSide {...props} />
                <SearchInput {...props} />
                <RightSide {...props} />
              </div>
            </div>
          </header>
          <div className={styles.divider} />
          <Center {...props} />
        </div>
      )}

      <MaxQuantityPerCartModal />
    </>
  );
};

export default observer(DesktopHeader);

//= Sol Taraf
const LeftSide = (props: HeaderProps) => {
  const { logo, logo_black } = props;

  const { isMobile } = useScreen();

  if (!logo || !logo) {
    return null;
  }
  //Logo Boyut:320 170
  return (
    <div>
      <Link href="/">
        <a>
          <Image
            image={logo}
            alt={logo?.altText || ""}
            width={isMobile ? 150 : 210}
            height={isMobile ? 75 : 60}
          />
        </a>
      </Link>
    </div>
  );
};

//= Merkez
const Center = (props: HeaderProps) => {
  const { categoryMenu } = props;

  const anaKategoriler =
    categoryMenu?.data.filter((item: any) => item.parentId === null) || [];

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
    // Önce bu kategorinin alt kategorisi var mı kontrol edelim
    const hasSubCategories = altCat?.some(
      (item: any) => item.parentId === categoryId
    );
    if (hasSubCategories) {
      setHoveredCategory(categoryId);
    }
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div className={styles.header_menu_link_wrapper}>
      {categoryMenu?.data.map((item: any, index: number) => {
        const isHovered = hoveredCategory === item.id;
        const isLastAnaKategori =
          anaKategoriler.length > 0 &&
          item.id === anaKategoriler[anaKategoriler.length - 1].id;
        const hasSubCategories = altCat?.some(
          (altItem: any) => altItem.parentId === item.id
        );

        return (
          <div
            key={index}
            className={`${styles.header_menu_link_content} ${
              isLastAnaKategori ? styles.last_category : ""
            }`}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
          >
            {item.parentId === null && (
              <div className={styles.top_category}>
                <div>
                  <Link href={item.href} passHref>
                    <a
                      className={
                        isLastAnaKategori ? styles.last_category_link : ""
                      }
                    >
                      {item?.name.toLocaleUpperCase("tr-TR")}
                    </a>
                  </Link>
                </div>
              </div>
            )}
            {isHovered && hasSubCategories && (
              <div className={styles.alt_category_wrapper}>
                <div className={styles.alt_category_wrapper_botom}>
                  <div className={styles.alt_category_container}>
                    {altCat?.map((altCategory: any, index: number) => {
                      return (
                        <React.Fragment key={index}>
                          {item.id === altCategory.parentId && (
                            <div className={styles.alt_category_item}>
                              <Link href={altCategory.href}>
                                <a className={styles.alt_category_link}>
                                  {altCategory?.image && (
                                    <div
                                      className={
                                        styles.alt_category_image_wrapper
                                      }
                                    >
                                      <img
                                        src={altCategory.image.src}
                                        alt={
                                          altCategory.image.altText ||
                                          altCategory.name
                                        }
                                        className={styles.alt_category_image}
                                      />
                                    </div>
                                  )}
                                  <span className={styles.alt_category_name}>
                                    {altCategory.name}
                                  </span>
                                </a>
                              </Link>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* Parent Category Image Section */}
                  {item.image && (
                    <div className={styles.parent_category_section}>
                      <div className={styles.parent_category_image_wrapper}>
                        <img
                          src={item.image.src}
                          alt={item.name}
                          className={styles.parent_category_image}
                        />
                        <div className={styles.parent_category_name}>
                          {item?.name.toLocaleUpperCase("tr-TR")}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

//= Arama
export const SearchInput = observer((props: HeaderProps) => {
  const uiStore = UIStore.getInstance();
  const router = useRouter();
  const { categoryMenu } = props;

  if (!categoryMenu) {
    return null;
  }
  const allCatName = categoryMenu?.data?.map((item) => {
    return item.name;
  });

  const [currentMessage, setCurrentMessage] = useState<string>(allCatName[0]);
  const messageIndexRef = useRef<number>(0);
  const charIndexRef = useRef<number>(0);
  const isDeletingRef = useRef<boolean>(false);
  const messageRef = useRef<number | null>(null);

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      router.push(`/search?s=${uiStore.searchKeyword}`);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    uiStore.searchKeyword = event.target.value;
  };

  const handleTyping = useCallback(() => {
    const currentMessageIndex = messageIndexRef.current;
    const currentCharIndex = charIndexRef.current;
    const isDeleting = isDeletingRef.current;
    const current = allCatName[currentMessageIndex];

    if (!isDeleting && currentCharIndex < current.length) {
      charIndexRef.current = currentCharIndex + 1;
      setCurrentMessage(current.slice(0, charIndexRef.current));
    } else if (isDeleting && currentCharIndex > 0) {
      charIndexRef.current = currentCharIndex - 1;
      setCurrentMessage(current.slice(0, charIndexRef.current));
    } else if (!isDeleting && currentCharIndex === current.length) {
      isDeletingRef.current = true;
      messageRef.current = window.setTimeout(handleTyping, 1500);
      return;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeletingRef.current = false;
      messageIndexRef.current = (currentMessageIndex + 1) % allCatName.length;
    }

    messageRef.current = window.setTimeout(
      handleTyping,
      isDeleting ? 100 : 200
    );
  }, []);

  useEffect(() => {
    messageRef.current = window.setTimeout(handleTyping, 200);

    return () => {
      if (messageRef.current) {
        clearTimeout(messageRef.current);
      }
    };
  }, [handleTyping]);

  return (
    <div className={styles.searchInputWrapper}>
      <input
        type="search"
        value={uiStore.searchKeyword}
        placeholder={currentMessage}
        onKeyPress={onKeyPress}
        onChange={onChange}
      />
    </div>
  );
});

//= Scroll olurken Arama
export const SearchInputWhenScrolled = observer((props: HeaderProps) => {
  const { t } = useTranslation();
  const uiStore = UIStore.getInstance();
  const router = useRouter();
  const [ShowSearch, setShowSearch] = useState<boolean>(true);
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

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.value = "";
    }
  }, [ShowSearch]);

  const { logo, logo_black } = props;
  if (!logo) {
    return null;
  }

  const { isMobile } = useScreen();

  return (
    <div className={styles.searchInputWrapperS}>
      {/* Search Icon */}
      <div onClick={() => setShowSearch(!ShowSearch)}>
        <div className={styles.headerButtonBottomTextSearchS}>
          <SearchSVG />
        </div>
      </div>

      {!ShowSearch && (
        <div className={styles.searchInputContainerS}>
          <div className={styles.maxWidthContainer}>
            <div className={styles.searchInputLayout}>
              {/* Logo - Left */}
              <div className={styles.logoContainer}>
                <Image
                  image={logo}
                  alt={logo?.altText || ""}
                  width={isMobile ? 150 : 210}
                  height={isMobile ? 75 : 60}
                />
              </div>

              {/* Search - Center */}
              <div className={styles.searchInputContent}>
                <div className={styles.searchInput}>
                  <input
                    type="search"
                    value={uiStore.searchKeyword}
                    placeholder={t(`${NS}:searchInput.placeholder`)}
                    onKeyPress={onKeyPress}
                    onChange={onChange}
                    ref={searchInputRef}
                  />
                </div>
              </div>

              {/* Close Button - Right */}
              <div
                className={styles.closeButtonContainer}
                onClick={() => setShowSearch(!ShowSearch)}
              >
                <Button buttonType="primary">
                  {t(`${NS}:headerButton_text.close`)}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

//= Sağ Taraf
const RightSide = observer((props: HeaderProps) => {
  const { t } = useTranslation();

  const store = useStore();
  const quantity = store.cartStore.cart?.itemQuantity ?? 0;
  const [userToken, setUserToken] = useState<string | null>("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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
      {isScrolled && <SearchInputWhenScrolled {...props} />}
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
