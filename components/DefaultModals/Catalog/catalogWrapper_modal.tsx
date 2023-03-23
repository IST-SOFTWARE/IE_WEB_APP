import React, {FC, ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import { modalStater } from "../../ISTModals/modalSetter";
import styles from "../../../styles/Modals/catalog/catalogWrapper.module.scss";
import {useAppSelector} from "../../../Hooks/hooks";
import {setCatalogState, switchCatalog} from "../../../store/slices/catalogSlice/catalogSlice";
import {useDispatch} from "react-redux";
import queryString from "query-string";
import {useCatalog} from "../../../Hooks/useCatalog/useCatalog";
import {ICatalogQueries} from "../../ISTCatalog/ICatalogQueries";
import {ICatalogFiltersType} from "../../../store/slices/catalogSlice/catalogFiltersType";

interface catalogWrapper {
  data?: modalStater;
  children: ReactNode
}

const CatalogWrapperModal: FC<catalogWrapper> = ({
    children
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
              {/*Closer*/}
                <button onClick={() => {
                    dispatch(setCatalogState(false));
                }}
                >Close</button>


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
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogWrapperModal;
