import React, { createContext, useContext } from "react";
import { ProductDetailProps } from "../__generated__/types";

interface BankTableContextType {
  bankTable?: ProductDetailProps["bankTable"];
}

const BankTableContext = createContext<BankTableContextType | undefined>(
  undefined
);

export const BankTableProvider: React.FC<{
  bankTable?: ProductDetailProps["bankTable"];
  children: React.ReactNode;
}> = ({ bankTable, children }) => {
  return (
    <BankTableContext.Provider value={{ bankTable }}>
      {children}
    </BankTableContext.Provider>
  );
};

export const useBankTable = () => {
  const context = useContext(BankTableContext);
  if (!context) {
    throw new Error("useBankTable must be used within a BankTableProvider");
  }
  return context;
};
