import React, { useEffect, useState } from "react";
import { IkasProductFilterSettings } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";
import Plus from "src/components/svg/plus";
import Minus from "src/components/svg/minus";

import * as S from "./style";

type FiltersOpenWrapperProps = {
  noBorder?: boolean;
  title: string;
  // IkasProductFilterSettings türündeki tüm özellikleri kullanmak zorunda değiliz, Partial kullanarak sadece belirli özellikleri geçirelim:
  settings?: Partial<IkasProductFilterSettings> | null | undefined;
  children: React.ReactNode;
  svg: string;
};

export const FiltersSvgWrapper = (
  props: FiltersOpenWrapperProps & { onClickExpandButton: () => void }
) => {
  const { settings, onClickExpandButton } = props;
  const { isMobile } = useScreen();
  const [active, setActive] = useState(
    isMobile
      ? !!settings?.showCollapsedOnMobile
      : !!settings?.showCollapsedOnDesktop
  );

  useEffect(() => {
    setActive(
      isMobile
        ? !!settings?.showCollapsedOnMobile
        : !!settings?.showCollapsedOnDesktop
    );
  }, [settings, isMobile]);

  return (
    <S.FiltersWrapper $noBorder={props.noBorder}>
      <FilterTitle
        active={active}
        title={props.title}
        svg={props.svg}
        onClickExpandButton={() => {
          onClickExpandButton(); // Dışarıya tıklama işlemini aktarıyoruz
          setActive((prev) => !prev); // Yerel state'i güncelliyoruz
        }}
      />
      {/* {active && props.children} */}
      <S.FiltersContent active={active}>{props.children}</S.FiltersContent>{" "}
      {/* Animasyonlu içerik */}
    </S.FiltersWrapper>
  );
};
type FilterTitleProps = {
  title: string;
  active: boolean;
  onClickExpandButton: () => void;
  svg: string;
};

export const FilterTitle = ({
  title,
  active,
  onClickExpandButton,
  svg,
}: FilterTitleProps) => {
  if (!svg) {
    return null;
  }

  return (
    <S.FilterTitleWrapper onClick={onClickExpandButton}>
      <S.FilterTitle>
        <img src={svg} alt="icon" /> <span>{title}</span>
      </S.FilterTitle>
      <S.FilterTitleExpandButton active={active}>
        {/* + işareti (details btn)*/}
        {active ? <Minus /> : <Plus />}
      </S.FilterTitleExpandButton>
    </S.FilterTitleWrapper>
  );
};
