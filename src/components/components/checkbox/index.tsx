import React from "react";
import { FormItemStatus } from "../form/form-item";
import * as S from "./style";
import CheckSVG from "src/components/svg/check";

type Props = {
  checked?: boolean;
  status?: FormItemStatus;
  children?: React.ReactNode;
  onChange?: (checked: boolean) => void;
};

const Checkbox = (props: Props) => {
  return (
    <S.Wrapper $status={props.status}>
      <S.HiddenCheckbox
        type="checkbox"
        className="visually-hidden"
        checked={!!props.checked}
        onChange={(event) =>
          props.onChange && props.onChange(!!event.target.checked)
        }
      />
      <S.CustomCheckboxInnerWrapper $mr={!!props.children}>
        <S.CustomCheckbox $status={props.status}>
          {!!props.checked && <CheckSVG />}
        </S.CustomCheckbox>
      </S.CustomCheckboxInnerWrapper>
      {!!props.children && props.children}
    </S.Wrapper>
  );
};

export default Checkbox;
