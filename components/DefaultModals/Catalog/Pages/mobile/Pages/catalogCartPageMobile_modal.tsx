import React, { FC, useCallback, useEffect, useState } from "react";
import styles from "../../../../../../styles/Modals/catalog/mobile/catalogCartPageMobileModal.module.scss";
import ISTButtonN from "../../../../../UI/ISTButton/ISTButtonN";
import { CartWrapper } from "../../../../../ProductsWrapper/cartWrapper/cartWrapper";
import { ICartSelector_type } from "../../../../../UI/ISTProductItem/Abstract/ICartTypes";
import { useAppSelector } from "../../../../../../Hooks/reduxSettings";
import useBaseModal from "../../../../../../Hooks/useBaseModal/useBaseModal";
import LoaderModal from "../../../../Loader/Loader_modal";
import { useQueryBuilder } from "../../../../../../Hooks/useQueryBuilder/useQueryBuilder";
import { ICartSelected } from "../../../../Order/common";

export interface ICatalogCartPageMobileModal_translation {
  currency: boolean;
  select: string;
  amount: string;
  currencyStyle: string;
  order: string;
}

interface ICatalogCartPageMobileModal {
  translation: ICatalogCartPageMobileModal_translation;
}

const CatalogCartPageMobileModal: FC<ICatalogCartPageMobileModal> = ({
  translation,
}) => {
  const [cartSelector, setCartSelector] = useState<ICartSelector_type[]>([]);

  const [numOfSelected, setNumOfSelected] = useState<number>(0);
  const [totalSum, setTotalSum] = useState<number>(0);

  const region = useAppSelector((selector) => selector.region);

  const { pushToQuery } = useQueryBuilder<ICartSelected>();

  // Loading modal
  const [loadingModal, setLoadingModal] = useState<boolean>(false);
  const { modalComponent, ModalView } = useBaseModal(undefined, "LoadingSpace");

  const transitionAndPushSelectedItemsToQuery = useCallback(() => {
    const newIDsArray = new Array<string>();
    cartSelector.map((el) => newIDsArray.push(el.id.toString()));

    if (newIDsArray.length > 0) {
      pushToQuery({ cartSelected: newIDsArray }, "cart");
    }
  }, [cartSelector, pushToQuery]);

  useEffect(() => {
    modalComponent.switch(loadingModal);
  }, [loadingModal, modalComponent]);

  return (
    <>
      <div className={styles.mobileModalCartWrapper}>
        <div className={styles.cartWrapper}>
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
            wrapperStyles={{
              width: "100%",
              maxWidth: "100%",
              padding: "0px 5px",
            }}
            itemStyles={{
              style: {
                margin: "0 0 15px 0",
                fill: true,
              },
            }}
            mobileTriggerSize={"LG_992"}
          />
        </div>

        <div className={styles.cartTotalSum_and_order}>
          <div className={styles.totalSum}>
            <div className={styles.selected}>
              <div className={styles.selected_txt}>{translation?.select}</div>
              <div className={styles.selected_num}>{numOfSelected}</div>
            </div>

            <div className={styles.selected}>
              <div className={styles.selected_txt}>{translation?.amount}</div>
              <div className={styles.selected_num}>
                {`${totalSum.toLocaleString(
                  region.currency[region.currentCurrencyId]?.targetRegion,
                  {
                    maximumFractionDigits: 2,
                  }
                )} ${
                  region.currency[region.currentCurrencyId]?.currencySymbol
                }`}
              </div>
            </div>
          </div>

          <div className={styles.btnPlace}>
            <ISTButtonN
              title={{
                caption: translation?.order,
              }}
              light={{
                fill: true,
                style: {
                  fillContainer: true,
                  borderRadius: "10px",
                },
              }}
              onClick={transitionAndPushSelectedItemsToQuery}
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

export default CatalogCartPageMobileModal;
