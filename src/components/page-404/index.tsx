import React from "react";
import styles from "./style.module.css";
import { Image, Link, useTranslation } from "@ikas/storefront";
import { observer } from "mobx-react-lite";
import { Page404Props } from "../__generated__/types";
import { useRouter } from "next/router";
import UIStore from "src/store/ui-store";
import SearchIcon from "src/components/svg/search";

const NS = "page-404";

const SearchInput = observer(() => {
  const uiStore = UIStore.getInstance();
  const router = useRouter();
  const { t } = useTranslation();

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      router.push(`/search?s=${uiStore.searchKeyword}`);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    uiStore.searchKeyword = event.target.value;
  };

  return (
    <div className={styles.searchInputWrapper}>
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
      <input
        type="search"
        value={uiStore.searchKeyword}
        placeholder={t(`${NS}:searchPlaceholder`)}
        onKeyPress={onKeyPress}
        onChange={onChange}
        className={styles.searchInput}
      />
    </div>
  );
});

const Page404: React.FC<Page404Props> = (props) => {
  const { image } = props;
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      {image && (
        <div className={styles.imageWrapper}>
          <Image
            image={image}
            alt={image?.altText || t(`${NS}:altText`)}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>{t(`${NS}:title`)}</h1>
          <p className={styles.description}>{t(`${NS}:text`)}</p>
          <div className={styles.searchContainer}>
            <SearchInput />
            <div className={styles.actions}>
              <Link href="/">
                <a className={styles.homeLink}>{t(`${NS}:link`)}</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Page404);
