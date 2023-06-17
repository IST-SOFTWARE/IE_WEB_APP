import React, {
    FC,
    ReactNode,
    useCallback,
    useEffect,
    useMemo, useRef,
    useState,
} from "react";
import {modalStater} from "../../ISTModals/modalSetter";
import styles from "../../../styles/Modals/catalog/catalogWrapper.module.scss";

import {
    setCatalogState,
    switchCatalog,
} from "../../../store/slices/catalogSlices/catalogSlice";

import {useDispatch} from "react-redux";
import HeaderCatalog from "../../Catalog/HeaderCatalog/HeaderCatalog";
import {setSearch} from "../../../store/slices/catalogSlices/catalogSlice";
import {incOffset} from "../../../store/slices/catalogSlices/catalogPaginationSlice";
import useBaseModal from "../../ISTModals/useBaseModal";
import {toc_filtersList_page_mobile} from "../table_of_contents/Catalog/mobile/toc_filtersList_page_mobile";
import {toc_catalog_search} from "../table_of_contents/Catalog/toc_catalog_search";
import {CatalogFilterPageMobileModal} from "./Pages/mobile/Pages/catalogFilterPageMobile_modal";
import CatalogWrapperMobileModal from "./catalogWrapperMobile_modal";
import ModalMobilePage from "./Pages/mobile/modalMobilePage";
import {toc_filter_page_mobile} from "../table_of_contents/Catalog/mobile/toc_filter_page_mobile";
import {ICatalogFiltersType} from "../../../store/slices/common/catalogFiltersType";
import CatalogFiltersListPageMobileModal from "./Pages/mobile/Pages/catalogFiltersListPageMobile_modal";

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
    const childrenRef = useRef<HTMLDivElement>(null);

    const {modalComponent, ModalView} = useBaseModal(
        "Catalog_Modal_wrapper",
        "CatalogSpace_mobile_modal"
    );

    const [currentFilterPage, setCurrentFilterPage] = useState<keyof ICatalogFiltersType>();

    useEffect(() => {
        if (modalComponent) {
            modalComponent.editModals([
                toc_filtersList_page_mobile,
                toc_filter_page_mobile
            ], 0);
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

            win.addEventListener("scroll", onReviewsWrapperScroll)
            return () => {
                win.removeEventListener("scroll", onReviewsWrapperScroll)
            }
        }
    }, [onReviewsWrapperScroll, childrenRef])

    const handleHideMobileModal = useCallback(() => {
        modalComponent.switch(false);
    }, [modalComponent])

    const handleRouteBackMobileModal = useCallback(() => {
        modalComponent.applyModalByName(toc_filtersList_page_mobile.typeName).then(() => {
            setCurrentFilterPage(undefined)
        })
    }, [modalComponent])

    const setCatalogFilterMobileModal = useCallback((designation: keyof ICatalogFiltersType) => {
        modalComponent.getModalByName(toc_filter_page_mobile.typeName).modal._header = designation.toString();
        modalComponent.applyModalByName(toc_filter_page_mobile.typeName).then(() => {
            setCurrentFilterPage(designation)
        })
    }, [modalComponent])

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
                        logo={{logoSrc: "/Logo/w_logo_svg.svg", forwardingPath: "Logo"}}
                        onClose={() => {
                            dispatch(setCatalogState(false));
                        }}
                        // mobileTriggerSize={"XL_1200"}
                        searchingElement={{
                            searchField: !data?.isCurrentModal(toc_catalog_search.typeName),

                            searchSetter: setSearching,
                            searchValue: searching,
                        }}
                    />

                    <button
                        onClick={() => {
                            modalComponent
                                .applyModalByName(toc_filtersList_page_mobile.typeName)
                                .then(() => modalComponent.switch(!modalComponent.getState));
                        }}
                        style={{
                            position: "absolute",
                            left: "20px",
                            bottom: "20px",
                            zIndex: "1000",
                        }}
                    >
                        switch modal
                    </button>

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

            {/*     Modals       */}

            <ModalView
                alignStyle={{
                    horizontal:"center",
                    vertical: "start"
                }}
                style={{
                    minWidth: "unset",
                    minHeight: "unset",

                    height: "100%",

                    width: "100%",
                    position: "absolute",

                    top: 0,
                    left: 0,
                }}
            >
                <CatalogWrapperMobileModal>

                    <ModalMobilePage header={{
                        type: modalComponent.isCurrentModal(toc_filtersList_page_mobile.typeName) ? "hiding_MMHeader_type" : "routingBack_MMHeaderType",
                        title: modalComponent.getHeader,
                        arrowHandler: () => {
                            modalComponent.isCurrentModal(toc_filtersList_page_mobile.typeName) ?
                                handleHideMobileModal() :
                                handleRouteBackMobileModal();
                        }
                    }}>

                        {modalComponent.isCurrentModal(toc_filtersList_page_mobile.typeName) ? (
                            <CatalogFiltersListPageMobileModal onTransfer={setCatalogFilterMobileModal}/>
                        ) : null}

                        {modalComponent.isCurrentModal(toc_filter_page_mobile.typeName) ? (
                            <CatalogFilterPageMobileModal
                                pageDesignation={currentFilterPage ? currentFilterPage : "mfg"}/>
                        ) : null}

                    </ModalMobilePage>

                </CatalogWrapperMobileModal>
            </ModalView>

        </>
    );
};

export default CatalogWrapperModal;
