import React, { useEffect, useState } from "react";
import { IkasProductFilterSettings } from "@ikas/storefront";
import { useScreen } from "src/utils/hooks/useScreen";
import ArrowRight from "src/components/svg/arrow-right";

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
        {/* Eğer SVG istersen aşağıdaki kodu kullanın */}
        {/* <img src={svg} alt="icon" /> <span>{title}</span> */}
        <span>{title}</span>
      </S.FilterTitle>
      <S.FilterTitleExpandButton active={active}>
        {/* Arrow icon with rotation based on active state */}
        <div
          style={{
            transform: active ? "rotate(-90deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <ArrowRight fill="#000" width="0.8em" height="0.8em" />
        </div>
      </S.FilterTitleExpandButton>
    </S.FilterTitleWrapper>
  );
};
