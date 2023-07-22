import React, { FC } from "react";
import { mobileBar } from "../common";
import { useRouter } from "next/router";
import ru from "../../../../../locales/ru";
import en from "../../../../../locales/en";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../../Hooks/reduxSettings";
import { setSearch } from "../../../../../store/slices/catalogSlices/catalogSlice";
import ISTMobileBar from "../../../../UI/ISTMobileBar/ISTMobileBar";
import search_ico from "../../../../../public/MobileHelperIcons/search_icon.svg";
import filters_ico from "../../../../../public/MobileHelperIcons/filter_icon.svg";
import cart_ico from "../../../../../public/MobileHelperIcons/cart_icon.svg";
import currency_ico from "../../../../../public/MobileHelperIcons/currency_icon.svg";
import { switchCurrency } from "../../../../../store/slices/regionSlice/regionSlice";

export interface IMobileBar_translation {
  searchTitle: string;
  filtersTitle: string;
  cartTitle: string;
  currencyTitle: string;
  inputPlaceholder: string;
}

interface ICatalogWrapperModal extends mobileBar {
  translation: IMobileBar_translation;
}

const CatalogWrapperModal_mobileBar: FC<ICatalogWrapperModal> = ({
  cart,
  filters,
  inputOptions,
  search,
  translation,
}) => {
  const dispatch = useDispatch();

  const catalog = useAppSelector((selector) => selector.catalog);
  const region = useAppSelector((selector) => selector.region);

  const setSearch_helper = (val: string) => {
    dispatch(setSearch(val));
  };

  return (
    <>
      <ISTMobileBar
        buttons={[
          {
            title: translation?.searchTitle,
            image: search_ico,
            action: () => {
              search.action(true);
            },
            isActive: false,
          },
          {
            title: translation?.filtersTitle,
            image: filters_ico,
            action: filters.action,
            isActive: filters.state,
          },
          {
            title: translation?.cartTitle,
            image: cart_ico,
            action: cart.action,
            isActive: cart.state,
          },
          {
            title: region.currency[region.currentCurrencyId]?.currencyName,
            image: currency_ico,
            action: () => {
              dispatch(switchCurrency());
            },
            isActive: false,
          },
        ]}
        style={{
          height: "100%",
          borderRadius: "10px",
        }}
        inputOptions={{
          placeholder: translation?.inputPlaceholder + "...",
          state: inputOptions.state,
          onBlur: () => {
            inputOptions.onBlur(false);
          },

          currentDataSetter: setSearch_helper,
          currentData: catalog?.search,
        }}
        mobileTriggerSize={"LG_992"}
      />
    </>
  );
};

export default CatalogWrapperModal_mobileBar;
