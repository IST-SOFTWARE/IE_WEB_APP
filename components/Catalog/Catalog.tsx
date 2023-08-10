import React, {
  Dispatch,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ICatalogFiltersType } from "../../store/slices/common/catalogFiltersType";
import { useAppSelector } from "../../Hooks/reduxSettings";
import {modalStater} from "../../Hooks/useBaseModal/modalSetter";
import {catalogHasFilters_modalsHelper} from "../../helpers/Catalog/modals";
import {toc_catalog_full_prod_list} from "../DefaultModals/table_of_contents/Catalog/toc_catalog_full_prod_list";
import {toc_catalog_search} from "../DefaultModals/table_of_contents/Catalog/toc_catalog_search";
import {useRouter} from "next/router";

interface ICatalog {
  children: ReactNode;
  modal: modalStater;
}

const Catalog: FC<ICatalog> = ({ children, modal}) => {

  const router = useRouter();
  const reduxCatalogState = useAppSelector((state) => state.catalog);


  useEffect(() => {
    if (modal && reduxCatalogState.catalog !== undefined)
      modal.switch(reduxCatalogState.catalog);
  }, [modal, reduxCatalogState.catalog]);

  useEffect(()=>{
    if(catalogHasFilters_modalsHelper(reduxCatalogState.filters) &&
        modal.isCurrentModal(toc_catalog_search.typeName)
    ){
      modal.applyModalByName(toc_catalog_full_prod_list.typeName)
          .then(()=>router.push(`.${router.asPath}`, undefined, {shallow: true}))
          
    }

  },[modal, reduxCatalogState?.filters, router])


  return <>{children}</>;
};

export default Catalog;
