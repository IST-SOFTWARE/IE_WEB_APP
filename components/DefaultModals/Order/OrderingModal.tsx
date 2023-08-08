import { FC, useCallback, useEffect, useState } from "react";
import useBaseModal from "../../../Hooks/useBaseModal/useBaseModal";
import { useQueryBuilder } from "../../../Hooks/useQueryBuilder/useQueryBuilder";
import PuWrapper from "../popUp/puWrapper";
import {
  ICartSelected,
  IOrderRequest_translation,
  IOrderingInformation_translation,
  IOrderingModal,
} from "./common";
import { useTransition } from "../../../Hooks/useTranslation/useTranslation";
import { EN_LOCALE, RU_LOCALE } from "../../../locales/locales";

import { toc_order_information } from "../../DefaultModals/table_of_contents/order/toc_order_information";
import { toc_order_request } from "../../DefaultModals/table_of_contents/order/toc_order_request";

import ru_order_information from "../../../locales/orderInformation/ru";
import en_order_information from "../../../locales/orderInformation/en";

import ru_order_request from "../../../locales/orderRequest/ru";
import en_order_request from "../../../locales/orderRequest/en";
import { useAppSelector } from "../../../Hooks/reduxSettings";
import { useCartActions } from "../../../Hooks/useCartActions/useCartActions";
import { ICartSelector_type } from "../../UI/ISTProductItem/Abstract/ICartTypes";
import OrderingInformation_modal from "./OrderingInformation_modal";
import OrderingRequest_modal from "./OrderingRequest_modal";
import { useImageOptimization } from "../../../Hooks/useImageOptimization/useImageOptimization";
import { OrderedCartWrapper } from "./OrderedCartWrapper";
import { useDispatch } from "react-redux";
import { setCatalogState } from "../../../store/slices/catalogSlices/catalogSlice";

const OrderingModal: FC<IOrderingModal> = ({ loadingSetter }) => {
  // IMAGE OPTIMIZATION
  let cloudinary_acc = process.env.NEXT_PUBLIC_CLOUDINARY_ACC;
  const PROD_IMAGES_ROOT = process.env.NEXT_PUBLIC_PROD_IMAGES_ROOT;
  const PROD_NAME_INCLUDED_PART =
    process.env.NEXT_PUBLIC_PROD_NAME_INCLUDED_PART;

  const { sourcedLoader } = useImageOptimization(
    cloudinary_acc,
    PROD_NAME_INCLUDED_PART,
    PROD_IMAGES_ROOT
  );

  // REGION & TRANSLATION
  const regionHandler = useAppSelector((selector) => selector.region);

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

  // CART ORDERING MODAL
  const [currentCartModalIndex, setCurrentCartModalIndex] = useState(0);
  const { modalComponent: puModalComponent, ModalView: PU_ModalView } =
    useBaseModal("APP_BODY_WRAPPER", "PopUpBase");

  useEffect(() => {
    if (!puModalComponent) return;

    puModalComponent.editModals(
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
      currentCartModalIndex
    );
  }, [puModalComponent]);

  const handleSwitcherCartModalRequest = useCallback(() => {
    puModalComponent
      .applyModalByName(toc_order_request?.typeName)
      .then((value) => {
        setCurrentCartModalIndex(value.index);
      });
  }, [puModalComponent]);

  const handleSwitcherCartModalInformation = useCallback(() => {
    puModalComponent
      .applyModalByName(toc_order_information?.typeName)
      .then((value) => {
        setCurrentCartModalIndex(value.index);
      });
  }, [puModalComponent]);

  // CART ITEMS HANDLING
  const [cartSelector, setCartSelector] = useState<ICartSelector_type[]>([]);
  const dispatch = useDispatch();
  const { parseQuery, router } = useQueryBuilder<ICartSelected>();
  const { cItemById, cData, cMeta } = useCartActions({
    cartAutoFetching: true,
    regionHandler: regionHandler,
  });

  useEffect(() => {
    loadingSetter(cMeta.loading && !puModalComponent.getState);
  }, [cMeta, loadingSetter, puModalComponent.getState]);

  useEffect(() => {
    const _selected = parseQuery()?.cartSelected;
    if (!(_selected?.length > 0) || !(cData?.length > 0)) return;

    const _cartItemsData = [] as ICartSelector_type[];

    const _cartData_filtered = cData.filter((cd) => {
      return _selected.indexOf(cd?.productId?.toString()) > -1;
    });

    _cartData_filtered.map((el) => {
      _cartItemsData.push({
        id: el.productId,
        quantity: el.quantity,
      });
    });
    setCartSelector(_cartItemsData);
  }, [cData, parseQuery]);

  const openOrderingModal = useCallback(() => {
    const _HasSelected =
      cartSelector?.length > 0 &&
      !(cMeta.loading || cMeta.error)
    puModalComponent.switch(_HasSelected).then(() => {
      dispatch(setCatalogState(false));
    });
  }, [cartSelector?.length, cMeta, puModalComponent, dispatch]);

  useEffect(() => {
    if (router) openOrderingModal();
  }, [openOrderingModal, router]);

  return (
    <PU_ModalView>
      {puModalComponent.isCurrentModal(toc_order_information.typeName) ? (
        <PuWrapper data={puModalComponent}>
          <OrderingInformation_modal
            translation={currentTranslationOrderInformation?.translation}
            openRequestPage={handleSwitcherCartModalRequest}
          >
            <OrderedCartWrapper
              selectedItems={cartSelector}
              cartItemGetter={cItemById}
              region={regionHandler}
              imageOptimization={{
                loader: sourcedLoader,
                sizes: "350px",
              }}
            />
          </OrderingInformation_modal>
        </PuWrapper>
      ) : puModalComponent.isCurrentModal(toc_order_request.typeName) ? (
        <PuWrapper data={puModalComponent}>
          <OrderingRequest_modal
            translation={currentTranslationOrderRequest?.translation}
            openOrderingInfo={handleSwitcherCartModalInformation}
          />
        </PuWrapper>
      ) : null}
    </PU_ModalView>
  );
};

export default OrderingModal;
