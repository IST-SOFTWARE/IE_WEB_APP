import React, {FC, ReactNode, useEffect} from 'react';
import {useRouter} from "next/router";
import useBaseModal from "../ISTModals/useBaseModal";
import {useCatalog} from "../../Hooks/useCatalog/useCatalog";
import {ICatalogQueries} from "../../Hooks/useCatalog/ICatalogQueries";
import {ICatalogFiltersType} from "../../store/slices/catalogSlice/catalogFiltersType";
import {toc_catalog_search} from "../DefaultModals/table_of_contents/Catalog/toc_catalog_search";
import {toc_catalog_full_prod_list} from "../DefaultModals/table_of_contents/Catalog/toc_catalog_full_prod_list";
import CatalogWrapper_modal from "../DefaultModals/Catalog/catalogWrapper_modal";
import CatalogSearchModal from "../DefaultModals/Catalog/Pages/catalogSearch_modal";
import CatalogFullProductsListModal from "../DefaultModals/Catalog/Pages/catalogFullProductsList_modal";
import CatalogTestFiltersModal from "../DefaultModals/Catalog/Pages/catalogTestFilters_modal";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {useAppSelector} from "../../Hooks/reduxSettings";
import {useDispatch} from "react-redux";
import {setCatalogState, updateCatalog} from "../../store/slices/catalogSlice/catalogSlice";
import Catalog from "../Catalog/Catalog";

interface ILandingLayout{
    children?: ReactNode
}

export const LandingLayout:FC<ILandingLayout> = ({
    children
}) => {
    const router = useRouter();
    const { modalComponent, ModalView } = useBaseModal("APP_BODY_WRAPPER");
    const dispatch = useDispatch()

    useEffect(() => {
        if (modalComponent) {
            modalComponent.editModals(
                [
                    toc_catalog_search,
                    toc_catalog_full_prod_list,
                    {typeName: "test", _header: "", _paragraph: ""}
                ],
                2
            );
        }
    }, [modalComponent]);



    return(
        <>
            <Catalog
                modal={modalComponent}
            >
                <ModalView>
                    <CatalogWrapper_modal>

                        {modalComponent.isCurrentModal(toc_catalog_search.typeName) ? (
                            <CatalogSearchModal />
                        ) : null}

                        {modalComponent.isCurrentModal(
                            toc_catalog_full_prod_list.typeName
                        ) ? (
                            <CatalogFullProductsListModal />
                        ) : null}

                        {modalComponent.isCurrentModal("test") ? (
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

            {/**/}



        </>
    )

}

export default LandingLayout;