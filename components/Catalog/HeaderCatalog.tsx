import React, { Dispatch, FC, useEffect, useState } from "react";
import styles from "./headerCatalog.module.scss";
import { mobileTrigger_size } from "../UI/common";
import Image from "next/image";
import IstInput, { inputTypesVars } from "../UI/ISTInput/ISTInput";
import closeBtnImage from "./close_btn.svg";
import Link from "next/link";
import { truncate } from "fs";

interface IHeader {
  onClose: (...props: any) => any;
  mobileTriggerSize?: mobileTrigger_size;
  searchingElement: ISearchOptions;
  logo: ILogoOptions;
}

type ISearchOptions = {
  searchField: boolean;
  searchSetter: Dispatch<string>;
  searchValue: string;
};

type ILogoOptions = {
  forwardingPath: string;
  logoSrc: string;
};

const HeaderCatalog: FC<IHeader> = ({
  logo,
  onClose,
  searchingElement,
  mobileTriggerSize,
}) => {

  return (
    <>
      <div
        className={`${
          mobileTriggerSize ? styles[`header_${mobileTriggerSize}`] : styles[`header_MD_768`]
        } ${styles[`header`]}`}
      >
        <div
          className={
            "h-100 row pr-3 pl-3 justify-content-center position-sticky fixed-top"
          }
        >
          <div
            className={`col-11 col-md-2 p-0 h-100 align-items-center ${styles.logoBlock}`}
          >
            <Link href={logo?.forwardingPath ? logo.forwardingPath : ""}>
              <div className={styles.logoContainer}>
                <Image
                  src={logo?.logoSrc}
                  alt={"Header Logo"}
                  fill={true}
                  style={{
                    objectFit: "contain",
                    objectPosition: "left",
                  }}
                />
              </div>
            </Link>
          </div>
          {searchingElement?.searchField ? (
            <div
              className={`col-8 d-none col-lg-6 mr-auto ${styles.searchBlock}`}
            >
              <div className={styles.searchContainer}>
                <IstInput
                  inputType={inputTypesVars.any_string}
                  placeholder={"Request message"}
                  required={false}
                  outDataSetter={searchingElement.searchSetter}
                  actualData={searchingElement.searchValue}
                  style={{ borderRadius: "15px", height: "55px" }}
                />
              </div>
            </div>
          ) : (
            ""
          )}

          <div
            className={`col-1 p-0 d-flex align-items-center justify-content-end ${styles.closeBlock}`}
          >
            <div className={styles.closeContainer} onClick={onClose}>
              <Image
                src={"/PU_closer.svg"}
                alt={"Close"}
                fill={true}
                sizes={"17px"}
                style={{
                  objectFit: "contain",
                  objectPosition: "right",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderCatalog;
