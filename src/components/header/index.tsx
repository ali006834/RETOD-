import React from "react";
import { observer } from "mobx-react-lite";
import { HeaderProps } from "../__generated__/types";
import DesktopHeader from "./desktop";
import MobileHeader from "./mobile";
import styles from "./style.module.css";

export const NS = "header";

const Header: React.FC<HeaderProps> = (props: any) => {
  return (
    <>
      <div className={styles.mobile_header}>
        <MobileHeader {...props} />
      </div>
      <div className={styles.desktop_header}>
        <DesktopHeader {...props} />
      </div>
    </>
  );
};

export default observer(Header);
