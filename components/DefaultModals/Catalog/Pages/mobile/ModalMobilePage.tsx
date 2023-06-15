import React, { FC, useState } from "react";
import styles from "../../../../../styles/Modals/catalog/mobile/modalMobilePage.module.scss";
import { IModalMobilePage } from "./Abstract/IModalMobilePage";

const ModalMobilePage: FC<IModalMobilePage> = ({ children, header }) => {
  const [openState, setOpenState] = useState<boolean>(true);
  return (
    <div className={styles.mobilePageWrapper}>
      <div
        className={styles.header}
        onClick={() => {
          openState ? setOpenState(false) : setOpenState(true);
          header.arrowHandler();
        }}
      >
        {header ? header.title : "no title"}
        <div
          className={`${styles[`${header.type}`]} ${
            styles[`${openState ? "active" : ""}`]
          } `}
        />
      </div>
      <div className={styles.childrenLayout}>{openState ? children : ""}</div>
    </div>
  );
};

export default ModalMobilePage;
