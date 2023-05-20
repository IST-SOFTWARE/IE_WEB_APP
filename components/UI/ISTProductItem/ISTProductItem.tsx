import React, { CSSProperties, FC, useEffect, useState } from "react";
import { maxLengthText } from "../common";
import CatalogView from "./ProductViews/CatalogDefault/Index";
import CatalogInline from "./ProductViews/CatalogInline";
import CartInformational from "./ProductViews/CartFunctional_mobile";
import CartFunctional from "./ProductViews/CartFunctional";
import { IProductItem } from "./common";
import CartDistributor from "./ProductViews/CartDistributor";
import {ISTProductItemDistributor_Context} from "./Context";

const IstProductItem: FC<IProductItem> = ({
  itemType,
  style,
  currency,
  cartSelector,
}) => {

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
      return(
          <ISTProductItemDistributor_Context.Provider value={{
            data: itemType.data,
            currency: currency,
            style: style,
            cartSelector: cartSelector,
            mobileSettings: itemType.mobileSettings
          }}>

              <CartDistributor/>

          </ISTProductItemDistributor_Context.Provider>
      )
    }
  }
};

export default IstProductItem;
