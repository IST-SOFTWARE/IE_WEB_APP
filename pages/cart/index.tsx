import React, { useCallback, useEffect, useState } from "react";
import DefaultLandingPage from "../../components/LandingPages/DefaultLandingPage";
import ISTCartTotalSum, {
  ICartTotalSum_translation,
} from "../../components/UI/ISTCartTotalSum";
import { CartWrapper } from "../../components/ProductsWrapper/cartWrapper/cartWrapper";
import { ICartSelector_type } from "../../components/UI/ISTProductItem/Abstract/ICartTypes";
import { useTransition } from "../../Hooks/useTranslation/useTranslation";
import { EN_LOCALE, RU_LOCALE } from "../../locales/locales";
import ru_upd from "../../locales/cartTotalSum/ru";
import en_upd from "../../locales/cartTotalSum/en";
import { useAppSelector } from "../../Hooks/reduxSettings";
import useBaseModal from "../../Hooks/useBaseModal/useBaseModal";
import LoaderModal from "../../components/DefaultModals/Loader/Loader_modal";
import OrderingModal from "../../components/DefaultModals/Order/OrderingModal";
import { useDispatch } from "react-redux";
import { useQueryBuilder } from "../../Hooks/useQueryBuilder/useQueryBuilder";
import { ICartSelected } from "../../components/DefaultModals/Order/common";
import { setCatalogState } from "../../store/slices/catalogSlices/catalogSlice";

const CartPage = ({}) => {
  // REDUX
  const region = useAppSelector((sel) => sel.region);

  // CART SELECTOR / TOTAL SUM
  const [cartSelector, setCartSelector] = useState<ICartSelector_type[]>([]);
  const [numOfSelected, setNumOfSelected] = useState<number>(0);
  const [totalSum, setTotalSum] = useState<number>(0);
 
  //LOADING STATE
  const [loadingModal_cartData, setLoadingModal_cartData] =
    useState<boolean>(false);

  const [loadingModal_cartSelected, setLoadingModal_cartSelected] =
    useState<boolean>(false);

  // LOADING MODAL
  const { modalComponent: LoadingModalComponent, ModalView: LoadingModalView } =
    useBaseModal(undefined, "LoadingSpace");

  useEffect(() => {
    LoadingModalComponent.switch(
      loadingModal_cartData || loadingModal_cartSelected
    );
  }, [LoadingModalComponent, loadingModal_cartData, loadingModal_cartSelected]);

  // TRANSLATION
  const currentTranslation = useTransition<ICartTotalSum_translation>([
    { locale: RU_LOCALE, translation: ru_upd },
    { locale: EN_LOCALE, translation: en_upd },
  ]);

  // QUERY HANDLING
  const { pushToQuery } = useQueryBuilder<ICartSelected>();

  const pushSelectedItemsToQuery = useCallback(() => {
    const newIDsArray = new Array<string>();
    cartSelector.map((el) => newIDsArray.push(el.id.toString()));

    if (newIDsArray.length > 0) {
      pushToQuery({
        cartSelected: newIDsArray,
      })
    }
  }, [cartSelector, pushToQuery]);

  return (
    <>
      <DefaultLandingPage
        landingDescription={{
          title: null,
          titleOffset: 100,
        }}
        pageId={"CartPage"}
      >
        <div className={`col-12 col-lg-7 position-relative`}>
          <CartWrapper
            loadingSetter={setLoadingModal_cartData}
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

        <div
          className={`col-0 d-lg-block col-lg-5`}
          style={{
            position: "sticky",
            bottom: "0px",
          }}
        >
          <ISTCartTotalSum
            totalSelect={numOfSelected}
            totalSum={totalSum}
            region={{
              currencySymbol:
                region.currency[region.currentCurrencyId]?.currencySymbol ??
                "$",
              // НЕ НАДО ИСПОЛЬЗОВАТЬ МАГИЧЕСКИЕ ВСЯКИЕ СИМВОЛЫ.
              // ДАННЫЙ СИМВОЛ ОПРЕДЕЛЕН ДЛЯ ЛОКАЛИ EN-US,
              // НЕ ЗАБЫВАЕМ ПРО ПРИМЕРЫ ))
              region: region.region,
            }}
            translation={currentTranslation?.translation}
            sendOrderFun={() => {
              pushSelectedItemsToQuery();
            }}
          />
        </div>
      </DefaultLandingPage>

      {/* LOADING MODAL */}
      <LoadingModalView>
        <LoaderModal />
      </LoadingModalView>

      {/* CART ORDERING MODAL */}

      <OrderingModal
        loadingSetter={setLoadingModal_cartSelected}
      />
    </>
  );
};

export default CartPage;
