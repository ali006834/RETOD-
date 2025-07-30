import React from "react";
import { observer } from "mobx-react-lite";
import { IkasProductList, useTranslation } from "@ikas/storefront";

import { useTotalAppliedFiltersCount } from "./useTotalAppliedFiltersCount";

import * as S from "./style";
import { Loading } from "src/components/components/button";

type Props = {
  productList?: IkasProductList;
};

export const FiltersMainTitle = observer(({ productList }: Props) => {
  if (!productList) {
    return null;
  }

  const { t } = useTranslation();
  const appliedCount = useTotalAppliedFiltersCount(productList);

  return (
    <S.TitleWrapper>
      <S.ClearFiltersButton
        onClick={() => {
          productList.clearFilters();
        }}
      >
        {t("productList.clearFilters")}
        <span>
          {productList.isLoading && <Loading height="1.2rem" width="1.2rem" />}
        </span>
      </S.ClearFiltersButton>
    </S.TitleWrapper>
  );
});
