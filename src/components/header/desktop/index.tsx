import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useStore, useTranslation, Link, Image } from "@ikas/storefront";
import { HeaderProps } from "src/components/__generated__/types";
import FavoriteSVG from "src/components/svg/favorite";
import BellSVG from "src/components/svg/bell";
import UIStore from "src/store/ui-store";
import MaxQuantityPerCartModal from "src/components/components/modal-max-quantity-per-cart";
import styles from "../style.module.css";
import UserIcon from "../../svg/user";
import CartIcon from "../../svg/cart";
import IOCloseSVG from "../../svg/close";
import ArrowRight from "src/components/svg/arrow-right-white";
import Close from "src/components/svg/close";

import { NS } from "../";

import CartModal from "./cartModal";

const DesktopHeader = (props: HeaderProps) => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.desktopContainer}>
          <div className={styles.innerContainer}>
            {/* Arama */}
            <SearchInput {...props} />
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

{
  /* Sol Taraf */
}
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
            width={275}
            height={30}
          />
        </a>
      </Link>
    </div>
  );
};

{
  /* Merkez */
}
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
                    <a>{item?.name}</a>
                  </Link>
                </div>
              </div>
            )}
            {isHovered && (
              <div className={styles.alt_category_wrapper}>
                <div className={styles.alt_category_wrapper_botom}>
                  <div className={styles.alt_static_category}>
                    <div>
                      {staticCategoryMenu?.data.map((item, index) => {
                        return (
                          <Link href={item.href} key={index}>
                            <a>
                              <span>{item?.name?.charAt(0)}</span>
                              {item.name}
                            </a>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div className={styles.alt_category_container}>
                    {altCat?.map((altCategory: any, index: number) => {
                      return (
                        <>
                          {item.id === altCategory.parentId && (
                            <div key={index}>
                              <div className={styles.alt_category_content}>
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
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

{
  /* SearchInput */
}
export const SearchInput = observer((props: HeaderProps) => {
  const { t } = useTranslation();
  const uiStore = UIStore.getInstance();
  const router = useRouter();

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const searchUrl = `/search?s=${encodeURIComponent(
        uiStore.searchKeyword
      )}`;

      // Router'da URL'i güncelle ve sayfayı yeniden yükle
      router.replace(searchUrl).then(() => {
        window.location.reload(); // Sayfayı yeniden yükle
      });
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Arama kelimesini store'a kaydet
    uiStore.searchKeyword = event.target.value;
  };

  return (
    <div className={styles.searchInputWrapper}>
      <input
        type="search"
        value={uiStore.searchKeyword}
        placeholder={t(`${NS}:searchInput.placeholder`)}
        onKeyDown={onKeyDown} // Enter tuşunu dinler
        onChange={onChange} // Değişiklikleri kaydeder
      />
    </div>
  );
});

{
  /* Sağ taraf | Bell */
}
// export const Bell = observer((props: HeaderProps) => {
//   const { special_for_your } = props;

//   if (!special_for_your) {
//     return null;
//   }

//   const [openBellModal, setOpenBellModal] = useState(false);

//   const { t } = useTranslation();
//   const router = useRouter();

//   useEffect(() => {
//     if (router && router.events) {
//       const handleRouteChange = () => {
//         setOpenBellModal(false);
//       };

//       router.events.on("routeChangeStart", handleRouteChange);

//       return () => {
//         router.events.off("routeChangeStart", handleRouteChange);
//       };
//     }
//   }, [router]);

//   const onModalClose = () => {
//     setOpenBellModal(false);
//   };

//   const onOpenMyModal = () => {
//     setOpenBellModal(true);
//   };

//   return (
//     <div className={styles.bell}>
//       {/* Bell */}
//       <span onClick={() => onOpenMyModal()}>
//         <BellSVG />
//       </span>

//       {openBellModal && (
//         <div className={styles.special_modal}>
//           <div className={styles.modal_wrapper}>
//             {/* close */}
//             <div className={styles.close_bell}>
//               <span onClick={onModalClose}>
//                 <Close />
//               </span>
//             </div>
//             <div className={styles.modal_bell_icon}>
//               <span>
//                 <BellSVG />
//               </span>
//             </div>
//             <div className={styles.modal_content}>
//               <p>{t(`${NS}:specailForYou`)}</p>

//               <Link href={special_for_your?.href}>
//                 <a>{t(`${NS}:beginShopping`)}</a>
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// });

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
      {/* <Bell {...props} /> */}

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
      {/* CartIcon */}
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
          <CartModal />
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
