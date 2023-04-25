import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { modalStater } from "../../ISTModals/modalSetter";
import styles from "../../../styles/Modals/catalog/catalogWrapper.module.scss";
import { useRouter } from "next/router";

import { useAppSelector } from "../../../Hooks/reduxSettings";
import {
  setCatalogState,
  switchCatalog,
} from "../../../store/slices/catalogSlice/catalogSlice";

import { useCatalog } from "../../../Hooks/useCatalog/useCatalog";
import { useDispatch } from "react-redux";

import { ICatalogQueries } from "../../../Hooks/useCatalog/ICatalogQueries";
import { ICatalogFiltersType } from "../../../store/slices/catalogSlice/catalogFiltersType";

import ISTProductItem from "../../UI/ISTProductItem/ISTProductItem";
import ISTFiltersList from "../../UI/ISTFiltersList/components/ISTFiltersList";

import ICatalogHelper from "../../UI/ICatalogHelper/ICatalogHelper";

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
  const reduxCatalogState = useAppSelector((state) => state.catalog);
  const { currentState } = useCatalog<ICatalogQueries<ICatalogFiltersType>>();

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
            className={`row sticky-top ${styles.catalogHeader}`}
          >
            <button
              onClick={() => {
                dispatch(setCatalogState(false));
              }}
            >
              Close
            </button>

            {/*Current state*/}
            <div
              style={{
                color: "#fff",
              }}
            >
              REDUX:
              {JSON.stringify(reduxCatalogState)}
              <br />
              OUT FROM LINK:
              {JSON.stringify(currentState)}
            </div>
          </div>

          <div
            className={`row ${styles.catalogContent}`}
          >
            {children}

          </div>

        </div>
      </div>
    </>
  );
};

export default CatalogWrapperModal;
