import React, { useEffect, useState } from "react";
import DefaultLandingPage from "../../components/LandingPages/DefaultLandingPage";
import ISTCartTotalSum, {ICartTotalSum_translation} from "../../components/UI/ISTCartTotalSum";
import { CartWrapper } from "../../components/ProductsWrapper/cartWrapper";
import { ICartSelector_type } from "../../components/UI/ISTProductItem/Abstract/ICartTypes";
import {useTransition} from "../../locales/hook/useTranslation";
import {IFiltersLocale} from "../../locales/filters/filtersLocale";
import {EN_LOCALE, RU_LOCALE} from "../../locales/locales";
import ru_upd from "../../locales/cartTotalSum/ru";
import en_upd from "../../locales/cartTotalSum/en";
import {useAppSelector} from "../../Hooks/reduxSettings";


const CartPage_index = (props) => {

  const [cartSelector, setCartSelector] = useState<ICartSelector_type[]>([]);

  const [numOfSelected, setNumOfSelected] = useState<number>(0);
  const [totalSum, setTotalSum] = useState<number>(0);

    const {currentTranslation} = useTransition<ICartTotalSum_translation>([
        {locale: RU_LOCALE, translation: ru_upd},
        {locale: EN_LOCALE, translation: en_upd}
    ])

    const region = useAppSelector(sel => sel.region);

  return (
    <>
      <div
        className={``}
        style={{
          color: "white",
        }}
      >
        <DefaultLandingPage
          landingDescription={{
            title: "",
            titleOffset: 100,
          }}
          pageId={"CartPage"}
        >
          <div className={`col-12 col-lg-7`}>
            <div
              style={{
                position: "relative",
              }}
            >
              <CartWrapper
                cartID={"e0a9d860-c0f9-4b6a-ace4-04ecf56b0f0c"}
                currency={{
                  currencySymbol: ""
                }}
                cartSelector={{
                  selectedState: cartSelector,
                  setSelectedState: setCartSelector,
                }}
                amountData={{
                  amountQuantitySetter: setNumOfSelected,
                  amountPriceSetter: setTotalSum,
                }}
                itemStyles={{
                  style: {
                    margin: "0 0 15px 0",
                    fill: true,
                  },
                }}
                wrapperStyles={{
                  width: "100%",
                  maxWidth: "550px",
                }}
                mobileTriggerSize={"LG_992"}
              />
            </div>
          </div>

          <div
            className={`col-0 d-lg-block col-lg-5`}
            style={{
              position: "sticky",
              bottom: "0px",
              zIndex: "1"
            }}
          >
            <ISTCartTotalSum
                totalSelect={numOfSelected}
                totalSum={totalSum}
                region={{
                    currencySymbol: region.currency[region.currentCurrencyId]?.currencySymbol ?? "$" ,
                    region: region.region
                }}
                translation={currentTranslation?.translation}
            />

          </div>
        </DefaultLandingPage>
      </div>
    </>
  );
};

export default CartPage_index;

