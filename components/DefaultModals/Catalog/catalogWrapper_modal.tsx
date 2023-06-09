import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { modalStater } from "../../ISTModals/modalSetter";
import styles from "../../../styles/Modals/catalog/catalogWrapper.module.scss";
import { useRouter } from "next/router";

import { useAppSelector } from "../../../Hooks/reduxSettings";
import {
  setCatalogState,
  switchCatalog,
} from "../../../store/slices/catalogSlices/catalogSlice";

import { useCatalog } from "../../../Hooks/useCatalog/useCatalog";
import { useDispatch } from "react-redux";

import { ICatalogQueries } from "../../../Hooks/useCatalog/ICatalogQueries";
import { ICatalogFiltersType } from "../../../store/slices/common/catalogFiltersType";

import ISTProductItem from "../../UI/ISTProductItem/ISTProductItem";
import ISTFiltersList from "../../UI/ISTFiltersList/components/ISTFiltersList";
import HeaderCatalog from "../../Catalog/HeaderCatalog/HeaderCatalog";
import { setSearch } from "../../../store/slices/catalogSlices/catalogSlice";
import { incOffset } from "../../../store/slices/catalogSlices/catalogPaginationSlice";
import useBaseModal from "../../ISTModals/useBaseModal";
import { toc_filter_page_mobile } from "../table_of_contents/Catalog/mobile/toc_filter_page_mobile";
import CatalogTestProdsModal from "./Pages/catalogTestProds_modal";

interface catalogWrapper {
  data?: modalStater;
  children: ReactNode;

  stateSetter?: (...props: any) => any;
  stateSetterFilterPage?: (...props: any) => any;
  stateSetterCartPage?: (...props: any) => any;
}

const CatalogWrapperModal: FC<catalogWrapper> = ({
  children,
  stateSetter,
  stateSetterFilterPage,
  stateSetterCartPage,
}) => {
  const dispatch = useDispatch();
  const reduxCatalogState = useAppSelector((state) => state.catalog);

  const [searching, setSearching] = useState<string>("");
  const [st, sSt] = useState<boolean>(false);

  const childrenRef = useRef<HTMLDivElement>(null);

  //
  // const { currentState } = useCatalog<ICatalogQueries<ICatalogFiltersType>>();
  //
  // useEffect(()=>{
  // },[reduxCatalogState.catalog])
  //

  const { modalComponent, ModalView } = useBaseModal(
    "APP_BODY_WRAPPER",
    "CatalogSpace_modal"
  );

  useEffect(() => {
    if (modalComponent) {
      modalComponent.editModals([toc_filter_page_mobile], 0);
    }
  }, [modalComponent]);

  useEffect(() => {
    dispatch(setSearch(searching));
  }, [searching]);

  const onReviewsWrapperScroll = useCallback(() => {
    if (childrenRef.current) {
      const win = childrenRef.current;
      if (win.scrollHeight - win.clientHeight < win.scrollTop + 1)
        dispatch(incOffset());
    }
  }, [childrenRef]);

  useEffect(() => {
    if (childrenRef && childrenRef.current) {
      const win = childrenRef.current;

      win.addEventListener("scroll", onReviewsWrapperScroll);
      return () => {
        win.removeEventListener("scroll", onReviewsWrapperScroll);
      };
    }
  }, [onReviewsWrapperScroll, childrenRef]);

  return (
    <>
      <div className={styles.catalog_wrapper} ref={childrenRef}>
        <div
          className={"container-fluid"}
          style={{
            maxWidth: "1480px",
          }}
        >
          <HeaderCatalog
            logo={{ logoSrc: "/Logo/w_logo_svg.svg", forwardingPath: "Logo" }}
            onClose={() => {
              dispatch(setCatalogState(false));
            }}
            searchingElement={{
              searchField: true,

              searchSetter: setSearching,
              searchValue: searching,
            }}
          />
          <button
            onClick={() => {
              modalComponent
                .applyModalByName(toc_filter_page_mobile.typeName)
                .then(() => sSt(!st));
            }}
          >
            testpage_mobile
          </button>
          <div
            style={{
              color: "#fff",
              position: "absolute",
              top: "50px",
              maxWidth: "350px",
              left: "5%",
              background: "black",
              zIndex: "2000",
              opacity: "0.5",
            }}
          >
            REDUX:
            {JSON.stringify(reduxCatalogState)}
            <br />
            OUT FROM LINK:
          </div>

          <div className={`row ${styles.catalogContent}`}>
            {children}
            <ModalView>
              {modalComponent.isCurrentModal(
                toc_filter_page_mobile.typeName
              ) ? (
                <CatalogTestProdsModal pageDesignation="type" />
              ) : null}
            </ModalView>
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogWrapperModal;
