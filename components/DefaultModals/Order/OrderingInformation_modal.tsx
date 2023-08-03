import React, { FC, useEffect, useState } from "react";
import styles from "../../../styles/Modals/order/ordering_information.module.scss";
import ISTButtonN from "../../UI/ISTButton/ISTButtonN";
import { OrderedCartWrapper } from "./OrderedCartWrapper";
import { ICartSelected, IOrderingInformation } from "./common";
import { useLazyQuery } from "@apollo/client";
import { GET_CART_COLLECTION_BY_ID } from "../../../queries/cart/cartActions";
import { useLocalStorageManager } from "../../../Hooks/useSessionActions/useLocalStorageManager";
import { cartCollection } from "../../ProductsWrapper/common";
import { useQueryBuilder } from "../../../Hooks/useQueryBuilder/useQueryBuilder";
import LoaderModal from "../Loader/Loader_modal";
import useBaseModal from "../../../Hooks/useBaseModal/useBaseModal";

const OrderingInformation_modal: FC<IOrderingInformation> = ({
  translation,
  totalSelect,
  totalSum,
  region,
  nextModalFunc,
}) => {
  const { getStorageItem } = useLocalStorageManager();

  const [loadingModal, setLoadingModal] = useState<boolean>(false);

  const [ICartData, setCartData] = useState<cartCollection>();
  const [cartErr, setCartErr] = useState<boolean>(false);
  const [cartSelected, setCartSelected] = useState<string[]>([]);

  const { parseQuery } = useQueryBuilder<ICartSelected>();

  const [getCartData] = useLazyQuery<cartCollection>(
    GET_CART_COLLECTION_BY_ID,
    {
      fetchPolicy: "cache-and-network",
      variables: { id: getStorageItem() },
    }
  );

  useEffect(() => {
    setCartSelected(parseQuery()?.cartSelected ?? []);
  }, [parseQuery]);

  useEffect(() => {
    getCartData().then((res) => {
      res?.data ? setCartData(res.data) : res?.error ? setCartErr(true) : null;
    });
  }, [getCartData]);

  const { modalComponent, ModalView } = useBaseModal(undefined, "PopUpBase");

  useEffect(() => {
    modalComponent.switch(loadingModal);
  }, [loadingModal, modalComponent]);

  useEffect(() => {
    if (!ICartData) setLoadingModal(true);
    else setLoadingModal(false);
  },[ICartData]);

  return (
    <>
      <div className={styles.orderBox}>
        <div className={styles.cartProducts}>
          <OrderedCartWrapper selectedIds={cartSelected} cartData={ICartData} />
        </div>

        <div className={styles.cartTotal}>
          <div className="costBox">
            <div className={styles.products}>
              {translation?.products}: {totalSelect}
            </div>
            <div className={styles.sum}>
              {translation?.sum}:{" "}
              {totalSum
                ? `${totalSum.toLocaleString(region.region, {
                    maximumFractionDigits: 2,
                  })}`
                : 0}
              {region.currencySymbol}
            </div>
          </div>
          <div className={styles.boxButtonOrder}>
            <ISTButtonN
              light={{
                fill: true,
                style: {
                  borderRadius: "15px",
                  fillContainer: true,
                },
              }}
              title={{
                caption: translation?.continueOrder,
              }}
              onClick={nextModalFunc}
            />
          </div>
        </div>
      </div>

      <ModalView>
        <LoaderModal />
      </ModalView>
    </>
  );
};

export default OrderingInformation_modal;
