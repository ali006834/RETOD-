import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const EmailSubscription = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-bottom: 50px;
  margin-right: auto;

  @media (min-width: ${breakpoints.md}) {
    margin-bottom: 20px;
    margin-left: unset;
    text-align: left;
    margin-right: unset;
  }
`;

export const CustomForm = styled.form`
  border: 1px solid #d1d5db;
  border-radius: 0;
  display: flex;
  align-items: center;
  padding: 10px;
  background: red;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const FloatingLabel = styled.span<{ $isFocused: boolean }>`
  position: absolute;
  left: 0;
  top: ${({ $isFocused }) => ($isFocused ? "0" : "50%")};
  transform: translateY(${({ $isFocused }) => ($isFocused ? "0" : "-50%")});
  font-size: ${({ $isFocused }) => ($isFocused ? "12px" : "14px")};
  color: #8a8b94;
  transition: all 0.3s ease;
  pointer-events: none;
  padding: 10px;
`;

export const ArrowButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: #f0f0f0;
  border: none;
  border-radius: 0;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;

  &:hover {
    background: #333;
    svg {
      fill: #fff;
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 16px;
    height: 16px;
    fill: #333;
    transition: fill 0.3s ease;
  }
`;

export const ResponseStatus = styled.p<{ $status: "error" | "success" }>`
  color: ${({ $status, theme }) =>
    $status === "error" ? theme.color?.red : theme.color?.green};
`;

export const Title = styled.p`
  margin-bottom: 8px;
  font-size: 17px;
  text-align: center;
  color: #121314;
  font-family: "Helvetica" !important;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 15px 0;
`;

export const Checkbox = styled.input`
  margin-right: 10px;
  margin-top: 3px;
`;

export const CheckboxLabel = styled.label`
  font-size: 11px;
  color: #666;
  line-height: 1.4;
`;
