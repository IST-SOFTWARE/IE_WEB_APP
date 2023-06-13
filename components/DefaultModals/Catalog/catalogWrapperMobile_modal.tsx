import React, {FC, ReactNode, useState} from "react";
import styles from "../../../styles/Modals/catalog/mobile/catalogWrapperMobile.module.scss"

interface catalogWrapperMobile{
    children: ReactNode
}

const CatalogWrapperMobileModal:FC<catalogWrapperMobile> = ({
    children
}) => {

  return (
    <div className={styles.catalogWrapperMobile}>
        {children}
    </div>
  );

};

export default CatalogWrapperMobileModal;
