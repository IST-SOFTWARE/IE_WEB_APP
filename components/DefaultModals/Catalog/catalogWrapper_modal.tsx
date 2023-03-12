import React, {FC, ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import { modalStater } from "../../../Hooks/baseModal/modalSetter";
import styles from "../../../styles/Modals/catalog/catalogWrapper.module.scss";
import { useCatalog } from "../../Catalog/useCatalog";
import {useAppDispatch, useAppSelector} from "../../../Hooks/hooks";
import {updateFilters} from "../../../store/slices/catalogSlice/catalogSlice";
import {newCatalog} from "../../Catalog/ICatalogQueries";
import {ICatalogFiltersType} from "../../../store/slices/catalogSlice/catalogFiltersType";


interface catalogWrapper {
  data?: modalStater;
  children: ReactNode
}

const CatalogWrapperModal: FC<catalogWrapper> = ({
    children
                                                 }) => {
  const { closeCatalog } = useCatalog({});
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.catalog);

  useEffect(()=>{
      console.log("STATE", state)
  },[state])

    const handleFilter = () => {
      const data = newCatalog<ICatalogFiltersType>();
      data.addFilter<"mfg">(["1", "2", "3"]);
      console.log("DATA: ", data);
    }

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
            <button onClick={() => closeCatalog()}>Close</button>
            <button onClick={()=>{
                handleFilter()
            }}>SHOW</button>
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
