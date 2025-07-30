//Son olan bu

import React from "react";
import styles from "./bank.module.css";
import * as S from "../style";
import { useBankTable } from "../../BankTableContext";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { ProductDetailProps } from "src/components/__generated__/types";

const BankTable = observer(
  (props: { product: ProductDetailProps["product"] }) => {
    const { bankTable } = useBankTable();
    const safeBankTable = bankTable || []; // Eğer bankTable undefined veya null ise boş bir arr döndür...
    //= Ürünün Fiyatını Alma
    const price = props.product?.selectedVariant.formattedFinalPrice || "";

    //= Tablo Başlıkları
    const titles = Array.from(bankTable || []).map((bankProxy) => {
      const bank = JSON.parse(JSON.stringify(bankProxy));
      return bank?.enterTitles;
    });
    const tableHeaders = titles[0] ? Object.values(titles[0]) : [];

    //= Faiz oranını rate'e göre seçme
    const getInterestRate = (rate: number, interestRates: any) => {
      const parseRate = (rateValue: any) => {
        const parsed = parseFloat(rateValue);
        return isNaN(parsed) ? 0 : parsed;
      };

      const cleanPrice = price.replace(/[^\d.-]/g, "");
      const priceValue = parseFloat(cleanPrice);

      let calculatedValue: number | null = null;

      if (rate === 1 || rate === 2) {
        calculatedValue = 0; // Peşin fiyatla aynı, faiz yok
      } else if (rate >= 3 && rate <= 6) {
        calculatedValue =
          parseRate(interestRates.interestRate_3_6) * priceValue;
      } else if (rate >= 7 && rate <= 12) {
        calculatedValue =
          parseRate(interestRates.interestRate_6_12) * priceValue;
      }

      const totalPayment = priceValue + (calculatedValue || 0);

      return calculatedValue !== null ? `₺ ${totalPayment.toFixed(2)}` : null;
    };

    //= taksit tutarını hesaplama
    const calculateInstallment = (rate: any, interestRates: any) => {
      const totalPayment = getInterestRate(rate, interestRates);

      const totalPaymentValue = totalPayment
        ? parseFloat(totalPayment.replace("₺", "").trim())
        : 0;

      const installmentAmount = totalPaymentValue / rate;

      return installmentAmount > 0
        ? `₺ ${installmentAmount.toFixed(2)}`
        : price;
    };

    //= Tablo İçeriği
    return (
      <>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Banka</th>
              {tableHeaders.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {safeBankTable.map((bankProxy: any, bankIndex: number) =>
              bankProxy.enterLogoAndProportions.map(
                (proportion: any, proportionIndex: number) => {
                  // Her `enterLogoAndProportions` için ilgili `installmentContent` değerlerini al
                  const installments = proportion.content.flatMap(
                    (contentItem: any) =>
                      Array.isArray(contentItem.installmentContent)
                        ? contentItem.installmentContent
                        : contentItem.installmentContent
                        ? [contentItem.installmentContent]
                        : []
                  );

                  // Her proportion için interestRates değerlerini al
                  const interestRates = proportion.interestRates;

                  return (
                    <React.Fragment key={`${bankIndex}-${proportionIndex}`}>
                      {installments.map((taksit: any, i: number) => (
                        <tr key={`${bankIndex}-${proportionIndex}-${i}`}>
                          {i === 0 && (
                            <td
                              rowSpan={installments.length}
                              className={styles.bankLogoCell}
                            >
                              {/* Burada her proportion için logo'yu alıyoruz */}
                              <img
                                src={
                                  proportion.logo?.src ||
                                  proportion.logo?.getSrc()
                                }
                                alt={proportion.logo?.altText}
                                className={styles.logo}
                              />
                            </td>
                          )}
                          {/* Taksit Oranı */}
                          <td>{taksit.rate}</td>
                          {/*Taksit Tutarı*/}
                          <td>
                            {calculateInstallment(taksit.rate, interestRates)}
                          </td>
                          {/*toplam Tutar*/}
                          <td>
                            {getInterestRate(taksit.rate, interestRates) ||
                              price}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                }
              )
            )}
          </tbody>
        </table>
      </>
    );
  }
);

export default BankTable;
