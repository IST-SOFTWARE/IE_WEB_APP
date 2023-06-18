import React, {FC, ReactNode, useCallback, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import useBaseModal from "../ISTModals/useBaseModal";
import {toc_catalog_search} from "../DefaultModals/table_of_contents/Catalog/toc_catalog_search";
import {toc_catalog_full_prod_list} from "../DefaultModals/table_of_contents/Catalog/toc_catalog_full_prod_list";
import CatalogWrapper_modal from "../DefaultModals/Catalog/catalogWrapper_modal";
import CatalogSearchModal from "../DefaultModals/Catalog/Pages/catalogSearch_modal";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {useDispatch} from "react-redux";
import {setCatalogState, updateCatalog} from "../../store/slices/catalogSlices/catalogSlice";
import Catalog from "../Catalog/Catalog";
import {useQuery} from "@apollo/client";
import {GENERAL_CATEGORY_QUERY, IGeneralCategoryQuery} from "../../queries/categories/generalCategoryQuery";
import {filtersList_update} from "../../store/slices/filtersListSlice/filtersListSlice";
import {getFiltersItemsAsArray_filtersHelper} from "../../helpers/Catalog/filters";
import CatalogFullProductsListModal from "../DefaultModals/Catalog/Pages/catalogFullProductsList_modal";


interface ILandingLayout{
    children?: ReactNode
}

export const LandingLayout:FC<ILandingLayout> = ({
    children
}) => {

    const router = useRouter();

    const { modalComponent, ModalView } = useBaseModal("APP_BODY_WRAPPER", "CatalogSpace");

    const dispatch = useDispatch()
    const {data, error} = useQuery<IGeneralCategoryQuery>(GENERAL_CATEGORY_QUERY)

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
                    toc_catalog_full_prod_list
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

                    </div>

                    <CatalogWrapper_modal
                        data={modalComponent}
                    >

                        {modalComponent.isCurrentModal(toc_catalog_search.typeName) ? (
                            <CatalogSearchModal />
                        ) : null}

                        {modalComponent.isCurrentModal(
                            toc_catalog_full_prod_list.typeName
                        ) ? (
                            <CatalogFullProductsListModal />
                        ) : null}

                    </CatalogWrapper_modal>
                </ModalView>
            </Catalog>

            <Header
              catalogOpener={()=>{
                    modalComponent.applyModalByName(toc_catalog_full_prod_list.typeName);
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