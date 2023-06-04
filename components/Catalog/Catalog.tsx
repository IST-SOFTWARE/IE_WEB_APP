import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCatalog } from "../../Hooks/useCatalog/useCatalog";
import { ICatalogQueries } from "../../Hooks/useCatalog/ICatalogQueries";
import { ICatalogFiltersType } from "../../store/slices/common/catalogFiltersType";
import { useAppSelector } from "../../Hooks/reduxSettings";
import {modalStater} from "../ISTModals/modalSetter";

interface ICatalog {
  children: ReactNode;
  modal: modalStater;
}

const Catalog: FC<ICatalog> = ({ children, modal }) => {
  const { pushQuery } = useCatalog<ICatalogQueries<ICatalogFiltersType>>(
    {
      arrayFormat: "bracket-separator",
      arrayFormatSeparator: "|",
    },
    {
      option: "filters",
      params: ["mfg", "unit", "available", "type"],
    }
  );

  const reduxCatalogState = useAppSelector((state) => state.catalog);

  // useEffect(() => {
  //     // if (modal && reduxCatalogState.catalog !== undefined)
  //         modal.switch(true);
  // }, [modal]);

  //update REDUX (first load if query)
  // useEffect(()=>{
  //     if(currentState && reduxCatalogState.catalog === undefined)
  //         dispatch(updateCatalog(currentState));
  // },[currentState, reduxCatalogState])

  useEffect(() => {
    if (modal && reduxCatalogState.catalog !== undefined)
      modal.switch(reduxCatalogState.catalog);
  }, [modal, reduxCatalogState.catalog]);

  // Update query from REDUX
  // useEffect(()=>{
  //     if(reduxCatalogState){
  //         console.log("REDUX: ", reduxCatalogState)
  //         pushQuery(reduxCatalogState);
  //     }
  // },[reduxCatalogState])

  return <>{children}</>;
};

export default Catalog;
