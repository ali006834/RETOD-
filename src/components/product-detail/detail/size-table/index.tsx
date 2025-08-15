import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import CloseSvg from "src/components/svg/close";
import { useTranslation } from "@ikas/storefront";
import MeterIcon from "./svg/meter";

interface RowData {
  size: string;
  waist?: string;
  hip?: string;
  chest?: string;
  neck?: string;
  arm?: string;
}

interface TableData {
  table1: RowData[];
  table2: RowData[];
}

const generateTableData = (value: string): TableData => {
  const { t } = useTranslation();

  switch (value) {
    case `${t("product-detail:bodyTable.clothes")}`:
      return {
        table1: [
          {
            size: `${t("product-detail:bodyTable.size")}`,
            chest: `${t("product-detail:bodyTable.chest")} (cm)`,
            waist: `${t("product-detail:bodyTable.waist")} (cm)`,
            hip: `${t("product-detail:bodyTable.hip")} (cm)`,
          },
          { size: "34", chest: "82", waist: "62", hip: "90" },
          { size: "36", chest: "86", waist: "66", hip: "94" },
          { size: "38", chest: "90", waist: "70", hip: "98" },
          { size: "40", chest: "94", waist: "74", hip: "102" },
          { size: "42", chest: "98", waist: "78", hip: "106" },
          { size: "44", chest: "102", waist: "82", hip: "110" },
        ],
        table2: [
          {
            size: `${t("product-detail:bodyTable.size")}`,
            chest: `${t("product-detail:bodyTable.chest")} (cm)`,
            waist: `${t("product-detail:bodyTable.waist")} (cm)`,
            hip: `${t("product-detail:bodyTable.hip")} (cm)`,
          },
          { size: "XS", chest: "82", waist: "62", hip: "90" },
          { size: "S", chest: "86", waist: "66", hip: "94" },
          { size: "M", chest: "90", waist: "70", hip: "98" },
          { size: "L", chest: "94", waist: "74", hip: "102" },
          { size: "XL", chest: "98", waist: "78", hip: "106" },
          { size: "XXL", chest: "102", waist: "82", hip: "110" },
        ],
      };
    case `${t("product-detail:bodyTable.top")}`:
      return {
        table1: [
          {
            size: `${t("product-detail:bodyTable.size")}`,
            chest: `${t("product-detail:bodyTable.chest")}`,
            waist: `${t("product-detail:bodyTable.waist")}`,
            arm: `${t("product-detail:bodyTable.arm")}`,
          },
          { size: "36", chest: "86", waist: "66", arm: "59" },
          { size: "38", chest: "90", waist: "70", arm: "59" },
          { size: "40", chest: "94", waist: "74", arm: "60" },
          { size: "42", chest: "98", waist: "78", arm: "60" },
          { size: "44", chest: "102", waist: "82", arm: "60" },
          { size: "46", chest: "108", waist: "88", arm: "60" },
          { size: "48", chest: "112", waist: "92", arm: "60" },
          { size: "50", chest: "116", waist: "96", arm: "60" },
        ],
        table2: [
          {
            size: `${t("product-detail:bodyTable.size")}`,
            chest: `${t("product-detail:bodyTable.chest")}`,
            waist: `${t("product-detail:bodyTable.waist")}`,
            arm: `${t("product-detail:bodyTable.arm")}`,
          },
          { size: "+44", chest: "105", waist: "90", arm: "59" },
          { size: "+46", chest: "111", waist: "96", arm: "59" },
          { size: "+48", chest: "117", waist: "102", arm: "60" },
          { size: "+50", chest: "123", waist: "108", arm: "60" },
          { size: "+52", chest: "129", waist: "114", arm: "60" },
          { size: "+54", chest: "135", waist: "120", arm: "60" },
          { size: "+56", chest: "141", waist: "126", arm: "60" },
          { size: "+58", chest: "147", waist: "132", arm: "60" },
        ],
      };
    case `${t("product-detail:bodyTable.dress")}`:
      return {
        table1: [
          {
            size: `${t("product-detail:bodyTable.size")}`,
            chest: `${t("product-detail:bodyTable.chest")}`,
            waist: `${t("product-detail:bodyTable.waist")}`,
            arm: `${t("product-detail:bodyTable.arm")}`,
          },
          { size: "36", chest: "86", waist: "66", arm: "59" },
          { size: "38", chest: "90", waist: "70", arm: "59" },
          { size: "40", chest: "94", waist: "74", arm: "60" },
          { size: "42", chest: "98", waist: "78", arm: "60" },
          { size: "44", chest: "102", waist: "82", arm: "60" },
          { size: "46", chest: "108", waist: "88", arm: "60" },
          { size: "48", chest: "112", waist: "92", arm: "60" },
          { size: "50", chest: "116", waist: "96", arm: "60" },
        ],
        table2: [
          {
            size: `${t("product-detail:bodyTable.size")}`,
            chest: `${t("product-detail:bodyTable.chest")}`,
            waist: `${t("product-detail:bodyTable.waist")}`,
            arm: `${t("product-detail:bodyTable.arm")}`,
          },
          { size: "+44", chest: "105", waist: "90", arm: "59" },
          { size: "+46", chest: "111", waist: "96", arm: "59" },
          { size: "+48", chest: "117", waist: "102", arm: "60" },
          { size: "+50", chest: "123", waist: "108", arm: "60" },
          { size: "+52", chest: "129", waist: "114", arm: "60" },
          { size: "+54", chest: "135", waist: "120", arm: "60" },
          { size: "+56", chest: "141", waist: "126", arm: "60" },
          { size: "+58", chest: "147", waist: "132", arm: "60" },
        ],
      };
    case `${t("product-detail:bodyTable.trouser")}`:
      return {
        table1: [
          {
            size: `${t("product-detail:bodyTable.size")}`,
            waist: `${t("product-detail:bodyTable.waist")}`,
            hip: `${t("product-detail:bodyTable.hip")}`,
          },
          { size: "36", waist: "66", hip: "92" },
          { size: "38", waist: "70", hip: "96" },
          { size: "40", waist: "74", hip: "100" },
          { size: "42", waist: "78", hip: "104" },
          { size: "44", waist: "82", hip: "108" },
          { size: "46", waist: "88", hip: "114" },
          { size: "48", waist: "92", hip: "118" },
          { size: "50", waist: "96", hip: "122" },
        ],
        table2: [
          {
            size: `${t("product-detail:bodyTable.size")}`,
            waist: `${t("product-detail:bodyTable.waist")}`,
            hip: `${t("product-detail:bodyTable.hip")}`,
          },
          { size: "+44", waist: "90", hip: "112" },
          { size: "+46", waist: "96", hip: "118" },
          { size: "+48", waist: "102", hip: "124" },
          { size: "+50", waist: "108", hip: "130" },
          { size: "+52", waist: "114", hip: "136" },
          { size: "+54", waist: "120", hip: "142" },
          { size: "+56", waist: "126", hip: "148" },
          { size: "+58", waist: "132", hip: "154" },
        ],
      };
    default:
      return { table1: [], table2: [] };
  }
};

const MeasurementGuide: React.FC = () => {
  const { t } = useTranslation();

  const measurements = [
    {
      image: "/image/size-guide/vucut-olcu-ust.jpg",
      title: t("product-detail:bodyTable.chestMeasurement"),
      description: t("product-detail:bodyTable.chestDescription"),
    },
    {
      image: "/image/size-guide/vucut-olcu-bel.jpg",
      title: t("product-detail:bodyTable.waistMeasurement"),
      description: t("product-detail:bodyTable.waistDescription"),
    },
    {
      image: "/image/size-guide/vucut-olcu-alt.jpg",
      title: t("product-detail:bodyTable.hipMeasurement"),
      description: t("product-detail:bodyTable.hipDescription"),
    },
  ];

  return (
    <div className={styles.measurement_guide}>
      <h4>{t("product-detail:bodyTable.howToMeasure")}</h4>
      <div className={styles.measurement_items}>
        {measurements.map((item, index) => (
          <div key={index} className={styles.measurement_item}>
            <img src={item.image} alt={item.title} />
            <h5>{item.title}</h5>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <p className={styles.measurement_note}>
        {t("product-detail:bodyTable.measurementUnit")}
      </p>
    </div>
  );
};

const TabHeaders: React.FC<{
  values: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}> = ({ values, selectedValue, onSelect }) => {
  return (
    <div className={styles.tab_headers}>
      {values.map((value: string, index: number) => (
        <div
          key={index}
          className={`${styles.tab_header} ${
            selectedValue === value ? styles.active_tab : ""
          }`}
          onClick={() => onSelect(value)}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

const Table: React.FC<{ data: RowData[]; title: string }> = ({
  data,
  title,
}) => {
  return (
    <>
      <table className={styles.custom_table}>
        <p>{title}</p>
        <tbody>
          {data.map((row: any, index: any) => (
            <tr key={index}>
              {data[0]?.size && <td>{row.size}</td>}
              {data[0]?.neck && <td>{row.neck}</td>}
              {data[0]?.chest && <td>{row.chest}</td>}
              {data[0]?.waist && <td>{row.waist}</td>}
              {data[0]?.hip && <td>{row.hip}</td>}
              {data[0]?.arm && <td>{row.arm}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const SizeTable: React.FC = () => {
  const { t } = useTranslation();

  const [ShowSizeModal, setShowSizeModal] = useState(false);

  useEffect(() => {
    if (ShowSizeModal) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [ShowSizeModal]);

  const values: any = [
    `${t("product-detail:bodyTable.clothes")}`,
    `${t("product-detail:bodyTable.top")}`,
    `${t("product-detail:bodyTable.dress")}`,
    `${t("product-detail:bodyTable.trouser")}`,
  ];

  const [selectedValue, setSelectedValue] = useState<any>(values[0]);

  const [tableData, setTableData] = useState<any>(
    generateTableData(selectedValue).table1
  );
  const [tableData2, setTableData2] = useState(
    generateTableData(selectedValue).table2
  );

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    const generatedData = generateTableData(value);
    setTableData(generatedData.table1 || []);
    setTableData2(generatedData.table2 || []);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div>
          <MeterIcon />
        </div>
        <span onClick={() => setShowSizeModal(true)}>
          {t("product-detail:bodyTable.size_table")}
        </span>
      </div>
      {ShowSizeModal && (
        <div className={styles.table_modal}>
          <div className={styles.table_content}>
            <div
              className={styles.close}
              onClick={() => setShowSizeModal(false)}
            >
              <CloseSvg />
            </div>
            <div className={styles.table_container}>
              <h3>{t("product-detail:bodyTable.size_table")}</h3>
              <TabHeaders
                values={values}
                selectedValue={selectedValue}
                onSelect={handleSelect}
              />
              <div className={styles.tables_wrapper}>
                <Table data={tableData} title="" />
                {tableData2.length > 0 && (
                  <Table
                    data={tableData2}
                    title={
                      selectedValue ===
                      `${t("product-detail:bodyTable.clothes")}`
                        ? ""
                        : t("product-detail:bodyTable.bigSize")
                    }
                  />
                )}
              </div>
              {selectedValue === `${t("product-detail:bodyTable.clothes")}` && (
                <MeasurementGuide />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SizeTable;
