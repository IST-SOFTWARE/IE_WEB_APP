import React, { useEffect, useState } from "react";
import styles from "./ICatalogHelper.module.scss";
import CatalogHelperButton from "./ICatalogHelperButton";

import searchIcon from "../../../public/MobileHelperIcons/search_icon.svg";
import filterIcon from "../../../public/MobileHelperIcons/filter_icon.svg";
import cartIcon from "../../../public/MobileHelperIcons/cart_icon.svg";
import currencyIcon from "../../../public/MobileHelperIcons/currency_icon.svg";

interface ButtonHelpers {
  icon: string;
  title: string;
  stateSetterFilterPage?: (...props: any) => any;
  stateSetterCartPage?: (...props: any) => any;
  actionFoo?: (...props: any) => any;
}

const ICatalogHelper = ({ stateSetterFilterPage, stateSetterCartPage }) => {
  const buttons = [
    { icon: searchIcon, title: "Search" },
    {
      icon: filterIcon,
      title: "Filters",
      actionFoo: stateSetterFilterPage,
    },
    {
      icon: cartIcon,
      title: "Cart",
      actionFoo: stateSetterCartPage,
    },
    { icon: currencyIcon, title: "USD" },
  ];

  const [buttonHelpers, setButtonHelpers] = useState<ButtonHelpers[]>(buttons);
  const [currentHelper, setCurrentHelper] = useState<number>(null);

  console.log("ICatalogHelper render");

  return (
    <div className={styles.catalog_help_mobile}>
      <div className={styles.catalog_help_mobile_options}>
        {buttonHelpers.map((el, i) => {
          return (
            <CatalogHelperButton
              idx={i}
              key={`HELPER_${i}`}
              title={el.title}
              icon={el.icon}
              isCurrent={currentHelper === i}
              action={setCurrentHelper}
              foo={el.actionFoo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(ICatalogHelper, () => {
  return true;
});
