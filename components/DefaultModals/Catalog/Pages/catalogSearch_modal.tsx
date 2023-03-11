import React from "react";
import ISTProductItem from "../../../UI/ISTProductItem/ISTProductItem";
import ICheckBoxList from "../../../UI/ICheckBoxList/ICheckBoxList";
import ISTSearch from "../../../UI/ISTSearch/ISTSearch";

const CatalogSearchModal = ({}) => {
  return (
    <>
      {/*Filters bock*/}
      <div
        className={"col-6 h-100"}
        style={{
          border: "solid 1px red",
        }}
      >
        <ISTSearch />
      </div>

      {/*Products bock*/}
      <div
        className={"col-6 h-100"}
        style={{
          border: "solid 1px blue",
        }}
      ></div>
    </>
  );
};

export default CatalogSearchModal;
