import React, {FC, ReactNode, useState} from "react";
import styles from "../../../../styles/Modals/catalog/mobile/catalogWrapperMobile.module.scss"
import {ICatalogWrapperMobile} from "./common";

const CatalogWrapperMobileModal:FC<ICatalogWrapperMobile> = ({
    children
}) => {

  return (
    <div className={styles.catalogWrapperMobile}>
        {children}
    </div>
  );

};

export default CatalogWrapperMobileModal;
