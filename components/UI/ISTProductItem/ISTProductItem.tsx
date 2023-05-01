import React, { CSSProperties, FC, useEffect, useState } from "react";
import { maxLengthText } from "../common";
import CatalogView from "./ProductViews/CatalogView/Index";
import CatalogInline from "./ProductViews/CatalogInline";
import CartInformational from "./ProductViews/CartInformational";
import CartFunctional from "./ProductViews/CartFunctional";
import { IProductItem } from "./common";


const IstProductItem: FC<IProductItem> = ({ itemType, style, currency }) => {

  switch (itemType.productType) {
    case "catalog": {
      if (itemType.parameters.inline) {
        return (
          <CatalogInline
            data={itemType.data}
            style={style}
            currency={currency}
            cartaAdder={itemType.parameters.cartAdder}
          />
        );
      } else {
        return (
          <CatalogView
            data={itemType.data}
            style={style}
            currency={currency}
            cartaAdder={itemType.parameters.cartAdder}
          />
        );
      }
    }
    case "cart": {
      if (itemType.displayingOption === "Informational") {
        return (
          <CartInformational
            style={style}
            currency={currency}
            data={itemType.data}
          />
        );
      }
      if (itemType.displayingOption === "Functional") {
        return (
          <CartFunctional
            style={style}
            currency={currency}
            data={itemType.data}
          />
        );
      }
    }
  }
};

export default IstProductItem;
