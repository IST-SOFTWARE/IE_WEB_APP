import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import styles from "../../../../styles/Modals/catalog/catalogWrapper.module.scss";
import { useDispatch } from "react-redux";
import { incOffset } from "../../../../store/slices/catalogSlices/catalogPaginationSlice";
import useBaseModal from "../../../../Hooks/useBaseModal/useBaseModal";
import CatalogWrapperMobileModal from "./catalogWrapperMobile_modal";
import ModalMobilePage from "../Pages/mobile/modalMobilePage";
import { toc_filter_page_mobile } from "../../table_of_contents/Catalog/mobile/toc_filter_page_mobile";
import { ICatalogFiltersType } from "../../../../store/slices/common/catalogFiltersType";
import CatalogFiltersListPageMobileModal from "../Pages/mobile/Pages/catalogFiltersListPageMobile_modal";
import { toc_filtersList_page_mobile } from "../../table_of_contents/Catalog/mobile/toc_filtersList_page_mobile";
import { CatalogFilterPageMobileModal } from "../Pages/mobile/Pages/catalogFilterPageMobile_modal";
import { toc_cart_page_mobile } from "../../table_of_contents/Catalog/mobile/toc_cart_page_mobile";
import CatalogCartPageMobileModal, {
  ICatalogCartPageMobileModal_translation,
} from "../Pages/mobile/Pages/catalogCartPageMobile_modal";
import { useRouter } from "next/router";
import ru from "../../../../locales/ru";
import en from "../../../../locales/en";
import { ICatalogWrapper } from "./common";
import CatalogWrapperModal_mobileBar from "./components/CatalogWrapperModal_mobileBar";
import CatalogWrapperModal_headerWrapper from "./components/CatalogWrapperModal_headerWrapper";
import { useTransition } from "../../../../locales/hook/useTranslation";
import { EN_LOCALE, RU_LOCALE } from "../../../../locales/locales";
import en_upd from "../../../../locales/filters/en";
import ru_upd from "../../../../locales/filters/ru";
import { IFiltersLocale } from "../../../../locales/filters/filtersLocale";
import { getNamedFiltersListItem_filtersHelper } from "../../../../helpers/Catalog/filters";
import { ICallBackRequest_translation } from "../../CallBack/CallBackRequest_modal";
import ru_catalogCartPageMobileModal from "../../../../locales/catalogCartPageMobileModal/ru";
import en_catalogCartPageMobileModal from "../../../../locales/catalogCartPageMobileModal/en";
import ru_catalogWrapperModal_mobileBar from "../../../../locales/istMobileBar/ru"
import en_catalogWrapperModal_mobileBar from "../../../../locales/istMobileBar/en"



const CatalogWrapperModal: FC<ICatalogWrapper> = ({
  children,
  data,
  searching,
}) => {
  const dispatch = useDispatch();
  const childrenRef = useRef<HTMLDivElement>(null);

  const { modalComponent, ModalView } = useBaseModal(
    "Catalog_Modal_wrapper",
    "CatalogSpace_mobile_modal"
  );

  const [currentFilterPage, setCurrentFilterPage] =
    useState<keyof ICatalogFiltersType>();

  const [searchingState, setSearchingState] = useState<boolean>(
    searching === undefined ? false : searching
  );

  const [catalogModalsState, setCatalogModalsState] = useState<boolean>(false);

  const router = useRouter();

  const currentTranslation = useTransition<IFiltersLocale>([
    { locale: RU_LOCALE, translation: ru_upd },
    { locale: EN_LOCALE, translation: en_upd },
  ]);

  const currentTranslationCatalogCartPageMobile =
    useTransition<ICatalogCartPageMobileModal_translation>([
      { locale: RU_LOCALE, translation: ru_catalogCartPageMobileModal },
      { locale: EN_LOCALE, translation: en_catalogCartPageMobileModal },
    ]);

  const currentTranslationIstMobileBar = useTransition([
    { locale: RU_LOCALE, translation: ru_catalogWrapperModal_mobileBar },
    { locale: EN_LOCALE, translation: en_catalogWrapperModal_mobileBar },
  ])


  const t = router.locale === "ru-RU" ? ru : en;

  useEffect(() => {
    if (!modalComponent || !t) return;

    modalComponent.editModals(
      [
        {
          typeName: toc_filtersList_page_mobile.typeName,
          _header: t.modalComponent.filters,
          _paragraph: "",
        },
        toc_filter_page_mobile,
        {
          typeName: toc_cart_page_mobile.typeName,
          _header: t.modalComponent.myCart,
          _paragraph: "",
        },
      ],
      0
    );
  }, [modalComponent, t]);

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

  // MOBILE MENU ACTIONS:

  const handleHideMobileModal = useCallback(() => {
    modalComponent.switch(false);
    setCatalogModalsState(false);
    setSearchingState(false);
  }, [setCatalogModalsState, setSearchingState, modalComponent]);

  const handleRouteBackMobileModal = useCallback(() => {
    modalComponent
      .applyModalByName(toc_filtersList_page_mobile.typeName)
      .then(() => {
        setCurrentFilterPage(undefined);
      });
  }, [modalComponent]);

  const setCatalogFilterMobileModal = useCallback(
    (designation: keyof ICatalogFiltersType) => {
      modalComponent.getModalByName(
        toc_filter_page_mobile.typeName
      ).modal._header = currentTranslation
        ? getNamedFiltersListItem_filtersHelper(designation, currentTranslation)
        : "FILTER";
      modalComponent
        .applyModalByName(toc_filter_page_mobile.typeName)
        .then(() => {
          setCurrentFilterPage(designation);
        });
    },
    [modalComponent, currentTranslation]
  );

  const handleOpenMobileModal_filtersList = useCallback(() => {
    modalComponent
      .applyModalByName(toc_filtersList_page_mobile.typeName)
      .then(() => modalComponent.switch(true));
  }, [modalComponent]);

  const handleOpenMobileModal_myCart = useCallback(() => {
    modalComponent
      .applyModalByName(toc_cart_page_mobile.typeName)
      .then(() => modalComponent.switch(true));
  }, [modalComponent]);

  const switchMobileSearching = useCallback(
    (st: boolean) => {
      modalComponent.switch(false);
      setSearchingState(st);
    },
    [modalComponent]
  );

  // DETECTING MOBILE MODAL PAGES

  const isActive_FiltersMobilePage = useCallback((): boolean => {
    if (modalComponent.getState)
      return (
        modalComponent.isCurrentModal(toc_filtersList_page_mobile.typeName) ||
        modalComponent.isCurrentModal(toc_filter_page_mobile.typeName)
      );
    return false;
  }, [modalComponent]);

  const isActive_CartMobilePage = useCallback((): boolean => {
    if (modalComponent.getState)
      return modalComponent.isCurrentModal(toc_cart_page_mobile.typeName);
    return false;
  }, [modalComponent]);

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
          {/*   HEADER  */}

          <CatalogWrapperModal_headerWrapper
            data={data}
            searching={searching}
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

          <div
            className={`${styles.mobileCatalogBar} ${
              searchingState ? styles.searching : ""
            }`}
          >
            {/*    MOBILE BAR    */}

            <CatalogWrapperModal_mobileBar
              search={{
                action: switchMobileSearching,
              }}
              filters={{
                action: handleOpenMobileModal_filtersList,
                state: isActive_FiltersMobilePage(),
              }}
              cart={{
                action: handleOpenMobileModal_myCart,
                state: isActive_CartMobilePage(),
              }}
              inputOptions={{
                state: searchingState,
                onBlur: switchMobileSearching,
              }}
              translation={currentTranslationIstMobileBar?.translation}
            />
          </div>
        </div>
      </div>

      {/*     Modals       */}

      <ModalView
        alignStyle={{
          horizontal: "center",
          vertical: "start",
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
          <ModalMobilePage
            header={{
              type:
                modalComponent.isCurrentModal(
                  toc_filtersList_page_mobile.typeName
                ) ||
                modalComponent.isCurrentModal(toc_cart_page_mobile.typeName)
                  ? "hiding_MMHeader_type"
                  : "routingBack_MMHeaderType",
              title: modalComponent.getHeader,
              arrowHandler: () => {
                modalComponent.isCurrentModal(
                  toc_filtersList_page_mobile.typeName
                ) ||
                modalComponent.isCurrentModal(toc_cart_page_mobile.typeName)
                  ? handleHideMobileModal()
                  : handleRouteBackMobileModal();
              },
            }}
          >
            {modalComponent.isCurrentModal(
              toc_filtersList_page_mobile.typeName
            ) ? (
              <CatalogFiltersListPageMobileModal
                onTransfer={setCatalogFilterMobileModal}
              />
            ) : null}

            {modalComponent.isCurrentModal(toc_filter_page_mobile.typeName) ? (
              <CatalogFilterPageMobileModal
                pageDesignation={currentFilterPage ? currentFilterPage : "mfg"}
              />
            ) : null}

            {modalComponent.isCurrentModal(toc_cart_page_mobile.typeName) ? (
              <CatalogCartPageMobileModal
                translation={
                  currentTranslationCatalogCartPageMobile?.translation
                }
              />
            ) : null}
          </ModalMobilePage>
        </CatalogWrapperMobileModal>
      </ModalView>
    </>
  );
};

export default CatalogWrapperModal;
