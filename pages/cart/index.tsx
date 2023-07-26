import React, { useCallback, useEffect, useState } from "react";
import DefaultLandingPage from "../../components/LandingPages/DefaultLandingPage";
import ISTCartTotalSum, {
  ICartTotalSum_translation,
} from "../../components/UI/ISTCartTotalSum";
import { CartWrapper } from "../../components/ProductsWrapper/cartWrapper/cartWrapper";
import { ICartSelector_type } from "../../components/UI/ISTProductItem/Abstract/ICartTypes";
import { useTransition } from "../../locales/hook/useTranslation";
import { IFiltersLocale } from "../../locales/filters/filtersLocale";
import { EN_LOCALE, RU_LOCALE } from "../../locales/locales";
import ru_upd from "../../locales/cartTotalSum/ru";
import en_upd from "../../locales/cartTotalSum/en";
import { useAppSelector } from "../../Hooks/reduxSettings";
import useBaseModal from "../../Hooks/useBaseModal/useBaseModal";
import PuWrapper from "../../components/DefaultModals/popUp/puWrapper";
import { toc_order_information } from "../../components/DefaultModals/table_of_contents/order/toc_order_information";
import { toc_order_request } from "../../components/DefaultModals/table_of_contents/order/toc_order_request";
import OrderingInformation_modal, {
  IOrderingInformation_translation,
} from "../../components/DefaultModals/CallBack/order/OrderingInformation_modal";
import OrderingRequest_modal, {
  IOrderRequest_translation,
} from "../../components/DefaultModals/CallBack/order/OrderingRequest_modal";
import ru_order_information from "../../locales/orderInformation/ru";
import en_order_information from "../../locales/orderInformation/en";
import ru_order_request from "../../locales/orderRequest/ru";
import en_order_request from "../../locales/orderRequest/en";
import LoaderModal from "../../components/DefaultModals/Loader/Loader_modal";

const CartPage_index = ({}) => {
  const [cartSelector, setCartSelector] = useState<ICartSelector_type[]>([]);
  const [cartModalSwitch, setCartModalSwitch] = useState(0);

  const [numOfSelected, setNumOfSelected] = useState<number>(0);
  const [totalSum, setTotalSum] = useState<number>(0);

  const { modalComponent, ModalView } = useBaseModal(
    "APP_BODY_WRAPPER",
    "PopUpBase"
  );
  const [loadingModal, setLoadingModal] = useState<boolean>(false);

  const currentTranslation = useTransition<ICartTotalSum_translation>([
    { locale: RU_LOCALE, translation: ru_upd },
    { locale: EN_LOCALE, translation: en_upd },
  ]);

  const currentTranslationOrderInformation =
    useTransition<IOrderingInformation_translation>([
      { locale: RU_LOCALE, translation: ru_order_information },
      { locale: EN_LOCALE, translation: en_order_information },
    ]);

  const currentTranslationOrderRequest =
    useTransition<IOrderRequest_translation>([
      { locale: RU_LOCALE, translation: ru_order_request },
      { locale: EN_LOCALE, translation: en_order_request },
    ]);

  const region = useAppSelector((sel) => sel.region);

  useEffect(() => {
    if (!modalComponent) return;

    modalComponent.editModals(
      [
        {
          typeName: toc_order_information.typeName,
          _header: currentTranslationOrderInformation?.translation.order,
          _paragraph:
            currentTranslationOrderInformation?.translation.detailsOrder,
        },

        {
          typeName: toc_order_request.typeName,
          _header: currentTranslationOrderRequest?.translation?.order,
          _paragraph: currentTranslationOrderRequest?.translation?.detailsOrder,
        },
      ],
      cartModalSwitch
    );
  }, [modalComponent]);

  const handleSwitcherCartModalRequest = useCallback(() => {
    modalComponent
      .applyModalByName(toc_order_request?.typeName)
      .then((value) => {
        setCartModalSwitch(value.index);
      });
  }, [modalComponent]);

  const handleSwitcherCartModalInformation = useCallback(() => {
    modalComponent
      .applyModalByName(toc_order_information?.typeName)
      .then((value) => {
        setCartModalSwitch(value.index);
      });
  }, [modalComponent]);

  useEffect(() => {
    modalComponent.switch(loadingModal);
  }, [loadingModal, modalComponent]);

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
            loadingSetter={setLoadingModal}
  
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
            bottom: "0px"
          }}
        >
          <ISTCartTotalSum
            totalSelect={numOfSelected}
            totalSum={totalSum}
            region={{
              currencySymbol:
                region.currency[region.currentCurrencyId]?.currencySymbol ??
                "$",
              region: region.region,
            }}
            translation={currentTranslation?.translation}
            sendOrderFun={() => {
              modalComponent.switch(true);
            }}
          />
        </div>
      </DefaultLandingPage>

      <ModalView>
        {loadingModal ? (
          <LoaderModal />
        ) : (
          <PuWrapper data={modalComponent}>
            {modalComponent.isCurrentModal(toc_order_information.typeName) ? (
              <OrderingInformation_modal
                translation={currentTranslationOrderInformation?.translation}
                nextModalFunc={handleSwitcherCartModalRequest}
              />
            ) : modalComponent.isCurrentModal(toc_order_request.typeName) ? (
              <OrderingRequest_modal
                translation={currentTranslationOrderRequest?.translation}
                previousModalFunc={handleSwitcherCartModalInformation}
              />
            ) : null}
          </PuWrapper>
        )}
      </ModalView>
    </>
  );
};

export default CartPage_index;
