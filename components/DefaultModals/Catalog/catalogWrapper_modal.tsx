import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
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
  const { currentState } = useCatalog<ICatalogQueries<ICatalogFiltersType>>();

  const [searching, setSearching] = useState<string>("");

  useEffect(() => {
    dispatch(setSearch(searching));
  }, [searching]);

  useEffect(()=>{

  },[reduxCatalogState.catalog])

  return (
    <>
      <div className={styles.catalog_wrapper}>
        <div
          className={"container-fluid h-100"}
          style={{
            maxWidth: "1430px",
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
            mobileTriggerSize={"XL_1200"}
          />
          <div
            style={{
              color: "#fff",
              position: "absolute",
              top: "70px",
              left: "5px",
              background: "black",
            }}
          >
            REDUX:
            {JSON.stringify(reduxCatalogState)}
            <br />
            OUT FROM LINK:
            {/*{JSON.stringify(currentState)}*/}
          </div>
          <div className={`row ${styles.catalogContent}`}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default CatalogWrapperModal;
