import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  IkasBaseStore,
  IkasThemeJsonPageType,
  Link,
  useStore,
  useTranslation,
} from "@ikas/storefront";

import { useScreen } from "src/utils/hooks/useScreen";
import { NS } from "../..";

import * as S from "./style";
import ExitSvg from "src/components/svg/exit";

const menu = [
  {
    i18nKey: "accountInfo",
    pageType: IkasThemeJsonPageType.ACCOUNT,
    href: "/account",
  },
  {
    i18nKey: "favoriteProducts",
    pageType: IkasThemeJsonPageType.FAVORITE_PRODUCTS,
    href: "/account/favorite-products",
  },
  {
    i18nKey: "orders",
    pageType: IkasThemeJsonPageType.ORDERS,
    href: "/account/orders",
  },
  {
    i18nKey: "addresses",
    pageType: IkasThemeJsonPageType.ADDRESSES,
    href: "/account/addresses",
  },
];

const Menu = () => {
  const { t } = useTranslation();
  const store = useStore();
  const { isMobile } = useScreen();
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);

  const onMenuButtonClick = () => setMobileMenuVisible((prev) => !prev);

  const isListVisible = (isMobile && isMobileMenuVisible) || !isMobile;

  return (
    <>
      {isMobile && isListVisible && <S.MobileOverlay />}
      {isMobile && (
        <FixedMenuToggleButton
          active={isListVisible}
          onMenuButtonClick={onMenuButtonClick}
        />
      )}
      {isListVisible && (
        <S.Wrapper>
          {!isMobile && (
            <S.DesktopTitle>{t(`${NS}:menu.title`)}</S.DesktopTitle>
          )}
          {isMobile && <MobileTitle store={store} />}
          {isListVisible && <List store={store} />}
        </S.Wrapper>
      )}
    </>
  );
};

export default observer(Menu);

const FixedMenuToggleButton = ({
  active,
  onMenuButtonClick,
}: {
  active: boolean;
  onMenuButtonClick: () => void;
}) => {
  return (
    <S.ToggleButton title="Toggle Navigation Menu" onClick={onMenuButtonClick}>
      {active && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40px"
          height="40px"
          viewBox="0 0 20 20"
          version="1.1"
        >
          <g
            id="Free-Icons"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <g
              transform="translate(-821.000000, -156.000000)"
              id="Group"
              stroke="#fff"
              stroke-width="1"
            >
              <g transform="translate(819.000000, 154.000000)" id="Shape">
                <path d="M12,13 C9.23857625,13 7,10.7614237 7,8 C7,5.23857625 9.23857625,3 12,3 C14.7614237,3 17,5.23857625 17,8 C17,10.7614237 14.7614237,13 12,13 Z M11.0150512,21 C9.04777237,21 6.37608863,21 3,21 C3.79921286,17.89195 6.4614209,16.2328962 10.9866241,16.0228387"></path>
                <path d="M21,16 L16,21 M21,21 L16,16"></path>
              </g>
            </g>
          </g>
        </svg>
      )}
      {!active && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40px"
          height="40px"
          viewBox="0 0 20 20"
          version="1.1"
        >
          <g
            id="Free-Icons"
            stroke="#fff"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <g transform="translate(-821.000000, -156.000000)" id="Group">
              <g transform="translate(819.000000, 154.000000)" id="Shape">
                <path d="M12,13 C9.23857625,13 7,10.7614237 7,8 C7,5.23857625 9.23857625,3 12,3 C14.7614237,3 17,5.23857625 17,8 C17,10.7614237 14.7614237,13 12,13 Z M11.0150512,21 C9.04777237,21 6.37608863,21 3,21 C3.79921286,17.89195 6.4614209,16.2328962 10.9866241,16.0228387"></path>

                <path d="M16,16 L21,16"></path>
                <path d="M16,18 L21,18"></path>
                <path d="M16,20 L21,20"></path>
              </g>
            </g>
          </g>
        </svg>
      )}
    </S.ToggleButton>
  );
};

type MobileTitleProps = {
  store: IkasBaseStore;
};

const MobileTitle = observer(({ store }: MobileTitleProps) => {
  const { t } = useTranslation();
  const currentPage = menu.find(
    (item) => item.pageType === store.currentPageType
  );
  const title =
    store.currentPageType === IkasThemeJsonPageType.ORDER_DETAIL
      ? t(`${NS}:menu.orderDetail`)
      : t(`${NS}:menu.${currentPage?.i18nKey}`);

  return (
    <S.TitleWrapper>
      <S.Title>{title}</S.Title>
    </S.TitleWrapper>
  );
});

const List = observer(({ store }: { store: IkasBaseStore }) => {
  const { t } = useTranslation();
  return (
    <S.List>
      {menu.map((item, index) => (
        <S.ListItem
          key={index}
          $selected={store.currentPageType === item.pageType}
        >
          <Link passHref href={item.href}>
            {t(`${NS}:menu.${item.i18nKey}`)}
          </Link>
        </S.ListItem>
      ))}
      <S.ListItem>
        <button onClick={() => store.customerStore.logout()}>
          <ExitSvg />
          {t(`${NS}:menu.logout`)}
        </button>
      </S.ListItem>
    </S.List>
  );
});
