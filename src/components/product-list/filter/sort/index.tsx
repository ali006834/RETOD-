import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  IkasProductList,
  IkasProductListSortType,
  useTranslation,
} from "@ikas/storefront";

import Loading from "src/components/svg/loading";
import styles from "./style.module.css";
import ArrowDown from "src/components/svg/arrow-down";

import { useRouter } from "next/router";

type Props = {
  productList?: IkasProductList;
};

type Option = {
  value: string;
  labelKey: string;
  router_number: string;
};

const Sorting: React.FC<Props> = (props: Props) => {
  return (
    <>
      <SortSelect {...props} />
    </>
  );
};

export default observer(Sorting);

const SortSelect = observer(({ productList }: Props) => {
  if (!productList) {
    return null;
  }

  const { t } = useTranslation();
  const router = useRouter();

  const [ShowFeatured, setShowFeatured] = useState<boolean>(false);

  const onSelectChange = (item: any) => {
    if (productList.isLoading) return;
    productList.setSortType(item.value);

    setShowFeatured(false);
  };

  const enabledOptions = options.filter((option) => {
    const isFeaturedSort = option.value === IkasProductListSortType.FEATURED;
    const isFeaturedSortEnabled =
      isFeaturedSort && !productList.isFeaturedSortEnabled;

    return isFeaturedSort ? isFeaturedSortEnabled : true;
  });

  return (
    <div className={styles.featuredSelect}>
      <div
        className={styles.featuredSelect_title}
        onClick={() => setShowFeatured(!ShowFeatured)}
      >
        <span className={styles.sortLabel}>{t(`productList.sort.label`)}</span>
        <span
          className={`${styles.arrowContainer} ${
            ShowFeatured ? styles.arrowRotated : ""
          }`}
        >
          <ArrowDown strokeColor="#222" height="2em" width="2em" />
        </span>
        <span>{productList.isLoading && <Loading />}</span>
      </div>
      {ShowFeatured && (
        <div className={styles.featuredSelect_content}>
          {enabledOptions.map((item, index) => {
            return (
              <div key={index}>
                <div
                  onClick={() => onSelectChange(item)}
                  className={
                    item.router_number === router?.query?.o
                      ? styles.selected
                      : styles.not_selected
                  }
                >
                  {t(`productList.sort.${item.labelKey}`)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

const options: Option[] = [
  {
    value: IkasProductListSortType.FEATURED,
    labelKey: "featured",
    router_number: "7",
  },
  {
    labelKey: "increasingPrice",
    value: IkasProductListSortType.INCREASING_PRICE,
    router_number: "1",
  },
  {
    labelKey: "decreasingPrice",
    value: IkasProductListSortType.DECREASING_PRICE,
    router_number: "2",
  },
  {
    labelKey: "increasingDiscount",
    value: IkasProductListSortType.INCREASING_DISCOUNT,
    router_number: "5",
  },
  {
    labelKey: "decrasingDiscount",
    value: IkasProductListSortType.DECRASING_DISCOUNT,
    router_number: "6",
  },
  {
    labelKey: "firstAdded",
    value: IkasProductListSortType.FIRST_ADDED,
    router_number: "4",
  },
  {
    labelKey: "lastAdded",
    value: IkasProductListSortType.LAST_ADDED,
    router_number: "3",
  },
];
