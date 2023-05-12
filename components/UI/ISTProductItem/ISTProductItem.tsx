import React, { CSSProperties, FC, useEffect, useState } from "react";
import { maxLengthText } from "../common";
import CatalogView from "./ProductViews/CatalogView/Index";
import CatalogInline from "./ProductViews/CatalogInline";
import CartInformational from "./ProductViews/CartFunctional_mobile";
import CartFunctional from "./ProductViews/CartFunctional";
import { IProductItem } from "./common";
import CartDistributer from "./ProductViews/CartDistributor";

const IstProductItem: FC<IProductItem> = ({
  itemType,
  style,
  currency,
  mobileSettings,
  cartSelector
}) => {
  const [mobileState, setMobileState] = useState<boolean>(false);

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
      return (
        <CartDistributer
          data={itemType.data}
          currency={currency}
          style={style}
          mobileSettings={mobileSettings}
          cartSelector={cartSelector}
        />
      );
    }
  }
};

export default IstProductItem;
