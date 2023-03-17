import React, {FC, ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import { modalStater } from "../../../Hooks/baseModal/modalSetter";
import styles from "../../../styles/Modals/catalog/catalogWrapper.module.scss";
import { useCatalog } from "../../Catalog/useCatalog";


interface catalogWrapper {
  data?: modalStater;
  children: ReactNode
}

const CatalogWrapperModal: FC<catalogWrapper> = ({
    children
                                                 }) => {
  const { closeCatalog } = useCatalog({});



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
