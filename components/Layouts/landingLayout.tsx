import React, {FC, ReactNode, useCallback, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import useBaseModal from "../ISTModals/useBaseModal";
import {useCatalog} from "../../Hooks/useCatalog/useCatalog";
import {ICatalogQueries} from "../../Hooks/useCatalog/ICatalogQueries";
import {ICatalogFiltersType} from "../../store/slices/common/catalogFiltersType";
import {toc_catalog_search} from "../DefaultModals/table_of_contents/Catalog/toc_catalog_search";
import {toc_catalog_full_prod_list} from "../DefaultModals/table_of_contents/Catalog/toc_catalog_full_prod_list";
import CatalogWrapper_modal from "../DefaultModals/Catalog/catalogWrapper_modal";
import CatalogSearchModal from "../DefaultModals/Catalog/Pages/catalogSearch_modal";
import CatalogFullProductsListModal from "../DefaultModals/Catalog/Pages/fullProductList/catalogFullProductsList_modal";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {useAppSelector} from "../../Hooks/reduxSettings";
import {useDispatch} from "react-redux";
import {setCatalogState, updateCatalog} from "../../store/slices/catalogSlices/catalogSlice";
import Catalog from "../Catalog/Catalog";
import CatalogTestProdsModal from "../DefaultModals/Catalog/Pages/catalogTestProds_modal";
import CatalogTestFiltersModal from "../DefaultModals/Catalog/Pages/catalogTestFilters_modal";
import {useQuery} from "@apollo/client";
import {GENERAL_CATEGORY_QUERY, IGeneralCategoryQuery} from "../../queries/categories/generalCategoryQuery";
import filtersListSlice, {filtersList_update} from "../../store/slices/filtersListSlice/filtersListSlice";
import {getFiltersItemsAsArray_filtersHelper} from "../../helpers/Catalog/filters";
import {ICategoryMFG_Q} from "../../queries/categories/MFG/mfgCategoryQuery";


interface ILandingLayout{
    children?: ReactNode
}

export const LandingLayout:FC<ILandingLayout> = ({
    children
}) => {
    const router = useRouter();
    const dispatch = useDispatch()

    const { modalComponent, ModalView } = useBaseModal("APP_BODY_WRAPPER");

    const [st, sSt] = useState<boolean>(false)

    const {data, loading, error} = useQuery<IGeneralCategoryQuery>(GENERAL_CATEGORY_QUERY)

    useEffect(()=>{
        if(!data) return

        dispatch(filtersList_update({
            mfg: getFiltersItemsAsArray_filtersHelper(
                data,
                "manufacturer_category",
                "manufacturer_name"
            ),
            unit: getFiltersItemsAsArray_filtersHelper(
                data,
                "Unit_category",
                "unit_name"
            ),
            type: getFiltersItemsAsArray_filtersHelper(
                data,
                "Type_category",
                "type_name"
            ),

            available: ["-1", "0", "1"]
        }))

    },[data])

    useEffect(() => {
        if (modalComponent) {
            modalComponent.editModals(
                [
                    toc_catalog_search,
                    toc_catalog_full_prod_list,
                    {typeName: "testProd", _header: "", _paragraph: ""},
                    {typeName: "testFilters", _header: "", _paragraph: ""}
                ],
                0
            );
        }
    }, [modalComponent]);


    return(
        <>
            <Catalog
                modal={modalComponent}
            >
                <ModalView>

                    <div style={{
                        position: "absolute",
                        bottom: "20px",
                        right: "20px",
                        display: "flex",
                        zIndex: "1000"
                    }}>

                        <button onClick={()=> {
                            modalComponent.applyModalByName(toc_catalog_full_prod_list.typeName)
                                .then(()=>sSt(!st))
                        }}>
                            Full prod list
                        </button>

                        <button onClick={()=> {
                            modalComponent.applyModalByName(toc_catalog_search.typeName)
                                .then(()=>sSt(!st))
                        }}>
                            Search
                        </button>

                        <button onClick={()=> {
                            modalComponent.applyModalByName("testFilters")
                                .then(()=>sSt(!st))
                        }}>
                            Test filters
                        </button>

                        <button onClick={()=> {
                            modalComponent.applyModalByName("testProd")
                                .then(()=>sSt(!st))
                        }}>
                            Test prods
                        </button>

                    </div>

                    <CatalogWrapper_modal>

                        {modalComponent.isCurrentModal(toc_catalog_search.typeName) ? (
                            <CatalogSearchModal />
                        ) : null}

                        {modalComponent.isCurrentModal(
                            toc_catalog_full_prod_list.typeName
                        ) ? (
                            <CatalogFullProductsListModal />
                        ) : null}

                        {modalComponent.isCurrentModal("testProd") ? (
                            <CatalogTestProdsModal/>
                        ) : null}

                        {modalComponent.isCurrentModal("testFilters") ? (
                            <CatalogTestFiltersModal/>
                        ) : null}

                    </CatalogWrapper_modal>
                </ModalView>
            </Catalog>

            <Header
              catalogOpener={()=>{
                dispatch(setCatalogState(true));
              }}
              searchOpener={()=>{
                  modalComponent.applyModalByName(toc_catalog_search.typeName)
                  dispatch(setCatalogState(true));
              }}
            />
                {children}
            <Footer route={router.locale} />

        </>
    )

}

export default LandingLayout;