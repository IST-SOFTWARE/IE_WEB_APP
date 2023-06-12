import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo, useRef,
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

import { useDispatch } from "react-redux";
import HeaderCatalog from "../../Catalog/HeaderCatalog/HeaderCatalog";
import { setSearch } from "../../../store/slices/catalogSlices/catalogSlice";
import {incOffset} from "../../../store/slices/catalogSlices/catalogPaginationSlice";
import useBaseModal from "../../ISTModals/useBaseModal";
import {toc_filter_page_mobile} from "../table_of_contents/Catalog/mobile/toc_filter_page_mobile";
import {toc_catalog_search} from "../table_of_contents/Catalog/toc_catalog_search";

interface catalogWrapper {
  data?: modalStater;
  children: ReactNode;
}

const CatalogWrapperModal: FC<catalogWrapper> = ({
    children,
    data
}) => {

  const dispatch = useDispatch();

  const [searching, setSearching] = useState<string>("");
  const { modalComponent, ModalView } = useBaseModal(
    "Catalog_Modal_wrapper",
    "CatalogSpace_mobile_modal"
  );

  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalComponent) {
      modalComponent.editModals([toc_filter_page_mobile], 0);
    }
  }, [modalComponent]);

  useEffect(() => {
    dispatch(setSearch(searching));
  }, [searching]);

  const onReviewsWrapperScroll = useCallback(()=>{
    if(childrenRef.current) {
      const win = childrenRef.current;
      if (win.scrollHeight - win.clientHeight < win.scrollTop + 1)
        dispatch(incOffset());
    }
  }, [childrenRef]);

  useEffect(()=>{
    if(childrenRef && childrenRef.current) {
      const win = childrenRef.current;

      win.addEventListener("scroll", onReviewsWrapperScroll)
      return () => {
        win.removeEventListener("scroll", onReviewsWrapperScroll)
      }
    }
  },[onReviewsWrapperScroll, childrenRef])

  return (
    <>
      <div
        className={styles.catalog_wrapper}
        ref={childrenRef}
        id={"Catalog_Modal_wrapper"}
      >
        <div
          className={"container-fluid"}
          style={{
            maxWidth: "1480px"
          }}
        >
          <HeaderCatalog
            logo={{ logoSrc: "/Logo/w_logo_svg.svg", forwardingPath: "Logo" }}
            onClose={() => {
              dispatch(setCatalogState(false));
            }}
            searchingElement={{
              searchField: !data?.isCurrentModal(toc_catalog_search.typeName),

              searchSetter: setSearching,
              searchValue: searching,
            }}
          />

          {/*<div*/}
          {/*  style={{*/}
          {/*    color: "#fff",*/}
          {/*    position: "absolute",*/}
          {/*    top: "50px",*/}
          {/*    maxWidth: "350px",*/}
          {/*    left: "5%",*/}
          {/*    background: "black",*/}
          {/*    zIndex: "2000",*/}
          {/*    opacity: "0.5"*/}
          {/*  }}*/}
          {/*>*/}
          {/*  REDUX:*/}
          {/*  {JSON.stringify(reduxCatalogState)}*/}
          {/*  <br />*/}
          {/*  OUT FROM LINK:*/}
          {/*  /!*{JSON.stringify(currentState)}*!/*/}
          {/*</div>*/}

          <div
            id={"CatalogSpace_mobile_modal"}
            className={`${styles.catalogContent_wrapper} ${
              modalComponent.getState ? styles.modal : ""
            }`}
          >
            <div
              className={`row ${styles.catalogContent} ${
                modalComponent.getState ? styles.hidden : ""
              }`}
            >
              {children}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default CatalogWrapperModal;
