import React, { FC, useState } from "react";
import styles from "../../../../../styles/Modals/catalog/mobile/modalMobilePage.module.scss";
import { IModalMobilePage } from "./Abstract/IModalMobilePage";

const ModalMobilePage: FC<IModalMobilePage> = ({
    children,
    header
}) => {

  return (
    <div className={styles.mobilePageWrapper}>
      <div
        className={`${styles.header} ${
            header.type === "routingBack_MMHeaderType" ? 
                styles.routingBack : ""
        }`}

        onClick={() => {
          header.arrowHandler();
        }}
      >
        {header ? header.title : "no title"}
        <div
          className={`${styles[`${header.type}`]}`}
        />
      </div>

      <div className={styles.childrenLayout}>
          {children}
      </div>

    </div>
  );
};

export default ModalMobilePage;
