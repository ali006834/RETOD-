import React from "react";
import Checkbox from "src/components/components/checkbox";
import * as S from "./style";

type FilterCheckboxProps = {
  checked: boolean;
  label: string;
  resultCount: number;
  onChange: () => void;
  radioStyle?: boolean;
};

export const FilterCheckbox = ({
  checked,
  label,
  resultCount,
  onChange,
  radioStyle,
}: FilterCheckboxProps) => {
  const formatLabel = (text: string) => {
    if (!text) return text;

    // Tamamı büyük harfle yazılması gereken beden değerlerinin listesi
    const sizeValues = [
      "xs",
      "s",
      "m",
      "l",
      "xl",
      "2xl",
      "3xl",
      "4xl",
      "xxl",
      "xxxl",
    ];

    // Gelen veri üstteki bedenkerden birine eşitse, tamamı büyük harfle yaz
    const isSizeValue = sizeValues.some(
      (size) => text.toLowerCase() === size.toLowerCase()
    );

    if (isSizeValue) {
      return text.toUpperCase();
    }

    // değilse her kelimenin ilk harfini büyük yap
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const formattedLabel = formatLabel(label);

  return (
    <Checkbox checked={checked} onChange={onChange} radioStyle={radioStyle}>
      <S.FilterCheckboxLabel $isSelected={checked}>
        {radioStyle ? formattedLabel : `${formattedLabel} (${resultCount})`}
      </S.FilterCheckboxLabel>
    </Checkbox>
  );
};
