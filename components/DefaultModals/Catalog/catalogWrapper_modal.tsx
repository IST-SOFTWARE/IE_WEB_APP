import React, {FC, ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import { modalStater } from "../../../Hooks/baseModal/modalSetter";
import styles from "../../../styles/Modals/catalog/catalogWrapper.module.scss";
import {useAppSelector} from "../../../Hooks/hooks";
import {switchCatalog} from "../../../store/slices/catalogSlice/catalogSlice";
import {useDispatch} from "react-redux";
import queryString from "query-string";

interface catalogWrapper {
  data?: modalStater;
  children: ReactNode
}

const CatalogWrapperModal: FC<catalogWrapper> = ({
    children
}) => {

  const dispatch = useDispatch();
  const reduxCatalogState = useAppSelector(state => state.catalog);

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
                <button onClick={() =>
                    dispatch(switchCatalog())
                }
                >Close</button>


              {/*Current state*/}
                  <div style={{
                      color: "#fff"
                  }}>
                      {JSON.stringify(reduxCatalogState)}
                      {JSON.stringify(queryString.parse(location.search,
                          {
                              arrayFormat: 'bracket-separator',
                              arrayFormatSeparator: '|'
                          }
                      ))}
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
