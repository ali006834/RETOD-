import React from "react";
import styles from "./../style.module.css";
import { IkasNavigationLink, Link } from "@ikas/storefront";

const NavigationFooterLinks = ({
  footer_links,
}: {
  footer_links: IkasNavigationLink[] | undefined;
}) => {
  if (!footer_links) {
    return null;
  }

  return (
    <div className={styles.footer_link}>
      {footer_links?.map((item, index) => {
        return (
          <div key={index}>
            <Link href={item.href}>
              <a>{item.label}</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default NavigationFooterLinks;
