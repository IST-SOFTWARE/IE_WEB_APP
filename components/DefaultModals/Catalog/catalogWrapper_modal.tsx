import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
    useRef,
  useState,
} from "react";
import { modalStater } from "../../ISTModals/modalSetter";
import styles from "../../../styles/Modals/catalog/catalogWrapper.module.scss";
import {setCatalogState} from "../../../store/slices/catalogSlices/catalogSlice";
import { useDispatch } from "react-redux";
import HeaderCatalog from "../../Catalog/HeaderCatalog/HeaderCatalog";
import { setSearch } from "../../../store/slices/catalogSlices/catalogSlice";
import {incOffset} from "../../../store/slices/catalogSlices/catalogPaginationSlice";
import useBaseModal from "../../ISTModals/useBaseModal";
import {toc_catalog_search} from "../table_of_contents/Catalog/toc_catalog_search";
import CatalogWrapperMobileModal from "./catalogWrapperMobile_modal";
import ModalMobilePage from "./Pages/mobile/modalMobilePage";
import {toc_filter_page_mobile} from "../table_of_contents/Catalog/mobile/toc_filter_page_mobile";
import {ICatalogFiltersType} from "../../../store/slices/common/catalogFiltersType";
import CatalogFiltersListPageMobileModal from "./Pages/mobile/Pages/catalogFiltersListPageMobile_modal";
import {toc_filtersList_page_mobile} from "../table_of_contents/Catalog/mobile/toc_filtersList_page_mobile";
import {CatalogFilterPageMobileModal} from "./Pages/mobile/Pages/catalogFilterPageMobile_modal";
import ISTMobileBar from "../../UI/ISTMobileBar/ISTMobileBar";
import search_ico from "../../../public/MobileHelperIcons/search_icon.svg";
import filters_ico from "../../../public/MobileHelperIcons/filter_icon.svg";
import cart_ico from "../../../public/MobileHelperIcons/cart_icon.svg";
import currency_ico from "../../../public/MobileHelperIcons/currency_icon.svg";
import {useAppSelector} from "../../../Hooks/reduxSettings";



interface catalogWrapper {
  data?: modalStater;
  children: ReactNode;
}

const CatalogWrapperModal: FC<catalogWrapper> = ({
    children,
    data
}) => {

    const dispatch = useDispatch();
    const catalog = useAppSelector(selector => selector.catalog);
    const childrenRef = useRef<HTMLDivElement>(null);

    const {modalComponent, ModalView} = useBaseModal(
        "Catalog_Modal_wrapper",
        "CatalogSpace_mobile_modal"
    );

    const [currentFilterPage, setCurrentFilterPage] = useState<keyof ICatalogFiltersType>();
    const [mobileSearchingState, setMobileSearchingState] = useState<boolean>(false);

    useEffect(() => {
        if (modalComponent) {
            modalComponent.editModals([
                toc_filtersList_page_mobile,
                toc_filter_page_mobile
            ], 0);
        }
    }, [modalComponent]);

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

    const setSearch_helper = (val: string) => {
        dispatch(setSearch(val));
    }

    // MOBILE MENU ACTIONS:

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

        const handleOpenMobileModal = useCallback(()=>{
            modalComponent
                .applyModalByName(toc_filtersList_page_mobile.typeName)
                .then(() => modalComponent.switch(true));
        },[modalComponent])


        const switchMobileSearching = useCallback((st: boolean)=>{
            modalComponent.switch(false);
            setMobileSearchingState(st);
        },[modalComponent])

        // DETECTING MOBILE MODAL PAGES

            const isActive_FiltersMobilePage = useCallback(():boolean => {
                if(modalComponent.getState)
                   return modalComponent.isCurrentModal(toc_filtersList_page_mobile.typeName) ||
                    modalComponent.isCurrentModal(toc_filter_page_mobile.typeName)
                return false
            },[modalComponent])


    return (
        <>
            <div
                className={styles.catalog_wrapper}
                ref={childrenRef}
                id={"Catalog_Modal_wrapper"}
            >
                <div
                    className={"container-fluid h-100"}
                    style={{
                        maxWidth: "1480px",
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

                              searchSetter: setSearch_helper,
                              searchValue: catalog?.search,
                        }}
                    />

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

            <div className={`${styles.mobileCatalogBar} ${mobileSearchingState ? styles.searching : ""}`}>
                <ISTMobileBar
                    buttons={[
                        {
                            title: "Поиск",
                            image: search_ico,
                            action: ()=>{switchMobileSearching(true)},
                            isActive: false
                        },
                        {
                            title: "Фильтры",
                            image: filters_ico,
                            action: handleOpenMobileModal,
                            isActive: isActive_FiltersMobilePage()
                        },
                        {
                            title: "Корзина",
                            image: cart_ico,
                            action: ()=>{},
                            isActive: false
                        },
                        {
                            title: "USD",
                            image: currency_ico,
                            action: ()=>{},
                            isActive: false
                        }
                    ]}
                    style={{
                        height: "100%",
                        borderRadius: "10px"
                    }}

                    inputOptions={{
                        placeholder: "Search...",
                        state: mobileSearchingState,
                        onBlur: ()=>{switchMobileSearching(false)},

                        currentDataSetter: setSearch_helper,
                        currentData: catalog?.search,
                    }}

                    mobileTriggerSize={"LG_992"}
                />
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
