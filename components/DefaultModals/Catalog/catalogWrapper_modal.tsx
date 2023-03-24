import React, {FC, ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import { modalStater } from "../../ISTModals/modalSetter";
import styles from "../../../styles/Modals/catalog/catalogWrapper.module.scss";
import { useRouter } from "next/router";

import {useAppSelector} from "../../../Hooks/hooks";
import {setCatalogState, switchCatalog} from "../../../store/slices/catalogSlice/catalogSlice";

import {useCatalog} from "../../../Hooks/useCatalog/useCatalog";
import {useDispatch} from "react-redux";


import {ICatalogQueries} from "../../ISTCatalog/ICatalogQueries";
import {ICatalogFiltersType} from "../../../store/slices/catalogSlice/catalogFiltersType";

import ISTProductItem from "../../UI/ISTProductItem/ISTProductItem";
import ICheckBoxList from "../../UI/ISTFiltersList/ICheckBoxList";

import ICatalogHelper from "../../UI/ICatalogHelper/ICatalogHelper";
import searchIcon from "../../../public/MobileHelperIcons/search_icon.svg";
import filterIcon from "../../../public/MobileHelperIcons/filter_icon.svg";
import cartIcon from "../../../public/MobileHelperIcons/cart_icon.svg";
import currencyIcon from "../../../public/MobileHelperIcons/currency_icon.svg"

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

    const dispatch = useDispatch();
    const reduxCatalogState = useAppSelector(state => state.catalog);
    const {currentState} = useCatalog<ICatalogQueries<ICatalogFiltersType>>()

  return (
    <>
      <div className={styles.catalog_wrapper}>
        <div className={"container-fluid h-100"}
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
            <button onClick={() =>{
                dispatch(setCatalogState(false));
            }}>Close</button>

              {/*Current state*/}
              <div style={{
                  color: "#fff"
              }}>
                  REDUX:
                  {JSON.stringify(reduxCatalogState)}<br/>
                  OUT FROM LINK:
                  {JSON.stringify(currentState)}
              </div>

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
