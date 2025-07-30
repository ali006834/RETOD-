import React, { useState } from "react";
import { IkasProductFilterSettings } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";
import Plus from "src/components/svg/plus";
import Minus from "src/components/svg/minus";

import * as S from "./style";

type FiltersOpenWrapperProps = {
  noBorder?: boolean;
  title: string;
  settings?: IkasProductFilterSettings | null | undefined;
  children: React.ReactNode;
};

export const FiltersOpenWrapper = (props: FiltersOpenWrapperProps) => {
  const { settings } = props;
  const { isMobile } = useScreen();
  const [active, setActive] = useState(
    isMobile
      ? !!settings?.showCollapsedOnMobile
      : !!settings?.showCollapsedOnDesktop
  );

  return (
    <S.FiltersWrapper $noBorder={props.noBorder}>
      <FilterTitle
        active={active}
        title={props.title}
        onClickExpandButton={() => setActive((prev) => !prev)}
      />
      {!active && props.children}
    </S.FiltersWrapper>
  );
};

type FilterTitleProps = {
  title: string;
  active: boolean;
  onClickExpandButton: () => void;
};

export const FilterTitle = ({
  title,
  active,
  onClickExpandButton,
}: FilterTitleProps) => {
  return (
    <S.FilterTitleWrapper onClick={onClickExpandButton}>
      <S.FilterTitle>{title}</S.FilterTitle>
      <S.FilterTitleExpandButton>
        {active ? <Plus /> : <Minus />}
      </S.FilterTitleExpandButton>
    </S.FilterTitleWrapper>
  );
};
