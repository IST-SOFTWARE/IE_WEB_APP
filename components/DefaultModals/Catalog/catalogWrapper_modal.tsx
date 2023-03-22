import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { modalStater } from "../../../Hooks/baseModal/modalSetter";
import styles from "../../../styles/Modals/catalog/catalogWrapper.module.scss";
import { useRouter } from "next/router";
import { useCatalog } from "../../Catalog/useCatalog";
import ISTProductItem from "../../UI/ISTProductItem/ISTProductItem";
import ICheckBoxList from "../../UI/ICheckBoxList/ICheckBoxList";
import ICatalogHelper from "../../UI/ICatalogHelper/ICatalogHelper";
import searchIcon from "../../../public/MobileHelperIcons/search_icon.svg";
import filterIcon from "../../../public/MobileHelperIcons/filter_icon.svg";
import cartIcon from "../../../public/MobileHelperIcons/cart_icon.svg";
import currencyIcon from "../../../public/MobileHelperIcons/currency_icon.svg";

interface catalogWrapper {
  data?: modalStater;
  children: ReactNode;
  stateSetter?: (...props: any) => any;
  stateSetterFilterPage?: (...props: any) => any;
  stateSetterCartPage?: (...props: any) => any;
}

const CatalogWrapperModal: FC<catalogWrapper> = ({
  children,
  stateSetter,
  stateSetterFilterPage,
  stateSetterCartPage,
}) => {
  const { closeCatalog } = useCatalog({});

  return (
    <>
      <div className={styles.catalog_wrapper}>
        <div
          className={"container-fluid h-100"}
          style={{
            maxWidth: "1430px",
          }}
        >
          <div
            className={"row"}
            style={{
              border: "solid 1px red",
            }}
          >
            <button onClick={() => closeCatalog()}>Close</button>
            {/* <button
              onClick={() => {
                stateSetter ? stateSetter() : null;
              }}
            >
              Switch to mobile filters
            </button> */}
          </div>
          <div
            className={"row h-100"}
            style={{
              border: "solid 1px blue",
            }}
          >
            {children}
            <ICatalogHelper
              buttonts={[
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
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogWrapperModal;
