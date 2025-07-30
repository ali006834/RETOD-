import React, { useState } from "react";
import { IkasProductFilterSettings } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";
import ArrowRight from "src/components/svg/arrow-right";
import ArrowDown from "src/components/svg/arrow-down";
import * as S from "./style";

type DropDwonWrapperProps = {
  noBorder?: boolean;
  title: string;
  settings?: IkasProductFilterSettings | null | undefined;
  children: React.ReactNode;
};

export const DropDownWrapper = (props: DropDwonWrapperProps) => {
  const { settings } = props;
  const { isMobile } = useScreen();
  const [active, setActive] = useState(true);

  return (
    <S.FiltersWrapper $noBorder={props.noBorder}>
      <FilterTitle
        active={active}
        title={props.title}
        onClickExpandButton={() => setActive((prev) => !prev)}
      />
      {active && props.children}
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
        {active ? <ArrowDown /> : <ArrowRight />}
      </S.FilterTitleExpandButton>
    </S.FilterTitleWrapper>
  );
};
